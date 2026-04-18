<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {


    public function __construct()
    {
         parent::__construct();
        $this->load->database(); // load db
        // $this->load->model('User_model');
           $this->load->helper('url');
           $this->load->library('email');
      

    }

    private function _init_cors($methods = "POST, GET, OPTIONS") {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowed_origins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:8080',
            'https://tcapitalwealth.com',
            'https://www.tcapitalwealth.com',
            'https://admin.tcapitalwealth.com'
        ];

        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
        } else {
            // For safety, echo origin if it's not credentials-bound, but better to enforce whitelist.
            // Even if not in whitelist, we must return valid CORS during preflight for the browser to show correct errors.
            header("Access-Control-Allow-Origin: " . ($origin ? $origin : '*')); 
        }

        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token");
        header("Access-Control-Allow-Methods: $methods");
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }

    private function _validate_admin() {
        $authHeader = $this->input->get_request_header('Authorization');
        if (!$authHeader && isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        }

        if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            $secret = getenv('JWT_SECRET') ?: 'tcap_secure_admin_2024';
            $decoded = $this->_jwt_decode($token, $secret);
            if ($decoded) {
                return true;
            }
        }

        http_response_code(401);
        echo json_encode([
            "status" => "false",
            "message" => "Unauthorized: Invalid or missing JWT Token."
        ]);
        exit;
    }

    private function _jwt_encode($payload, $secret) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    private function _jwt_decode($jwt, $secret) {
        $tokenParts = explode('.', $jwt);
        if (count($tokenParts) != 3) return false;
        $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[0]));
        $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
        $signature_provided = $tokenParts[2];
        $base64UrlHeader = $tokenParts[0];
        $base64UrlPayload = $tokenParts[1];
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        if ($base64UrlSignature === $signature_provided) {
            $data = json_decode($payload, true);
            if (isset($data['exp']) && $data['exp'] < time()) return false;
            return $data;
        }
        return false;
    }

    public function login() {
        $this->_init_cors();
        $input = json_decode(file_get_contents("php://input"), true);
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';

        if (!$username || !$password) {
            echo json_encode(["status" => "false", "message" => "Username and password required"]);
            return;
        }

        $user = $this->db->get_where('tbl_admin', ['username' => $username])->row();

        if ($user && password_verify($password, $user->password_hash)) {
            $payload = [
                'id' => $user->id,
                'username' => $user->username,
                'exp' => time() + (60 * 60 * 24 * 7) // 7 days
            ];
            $secret = getenv('JWT_SECRET') ?: 'tcap_secure_admin_2024';
            $token = $this->_jwt_encode($payload, $secret);
            echo json_encode(["status" => "true", "token" => $token]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => "false", "message" => "Invalid credentials"]);
        }
    }


// 	public function index()
// 	{
// 		$this->load->view('welcome_message');
// 	}
	
	 
    public function send()
    {
        $this->_init_cors();

        // Get POST data (JSON or form-data)
        $input = json_decode(file_get_contents("php://input"), true);

        $first_name = $input['first_name'] ?? $this->input->post('first_name');
        $last_name  = $input['last_name']  ?? $this->input->post('last_name');
        $email      = $input['email']      ?? $this->input->post('email');
        $mobile_no  = $input['mobile_no']  ?? $this->input->post('mobile_no');
        $city  = $input['city']  ?? $this->input->post('city');
        $message    = $input['message']    ?? $this->input->post('message');

        // Validation
        
            
        if (empty($first_name)) {
            echo json_encode([
                'status'  => false,
                'message' => 'first_name Required'
            ]);
            return;
        }

        // Email body
        $mail_body = "
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> {$first_name} {$last_name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Mobile:</strong> {$mobile_no}</p>
            <p><strong>City:</strong> {$city}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        ";

        // SMTP config (Gmail)
        $config = [
            'protocol'  => 'smtp',
            'smtp_host' => 'ssl://smtp.gmail.com',
            'smtp_port' => 465,
            'smtp_user' => 'Enquiry.website1122@gmail.com',
            'smtp_pass' => 'pxlv tsuf ehdi kxth',
            'mailtype'  => 'html',
            'charset'   => 'utf-8',
            'newline'   => "\r\n"
        ];

        $this->email->initialize($config);

        // Mail setup
        $this->email->from('Enquiry.website1122@gmail.com', 'Tcapital Wealth');
        $this->email->reply_to($email); // user email
        $this->email->to('Enquiry.website1122@gmail.com');
        $this->email->subject('Contact Mail');
        $this->email->message($mail_body);

        if ($this->email->send()) {
            echo json_encode([
                'status'  => "true",
                'message' => 'Mail sent successfully'
            ]);
        } else {
            echo json_encode([
                'status'  => "false",
                'message' => 'Mail sending failed',
                'error'   => $this->email->print_debugger()
            ]);
        }
    }
    	
   
    public function partners_mail()
    {
        // Set JSON response
                // Set JSON response
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        // Get POST data (JSON or form-data)
        $input = json_decode(file_get_contents("php://input"), true);

        $name = $input['name'] ?? $this->input->post('name');
        $mobile_no  = $input['mobile_no']  ?? $this->input->post('mobile_no');
        $city    = $input['city']    ?? $this->input->post('message');
        
        $email="Enquiry.website1122@gmail.com";

        // Validation
        if (!$name || !$mobile_no || !$city) {
            echo json_encode([
                'status'  => false,
                'message' => 'Required fields missing'
            ]);
            return;
        }

        // Email body
        $mail_body = "
            <h3> <b> New Partner Message  </b> </h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Mobile:</strong> {$mobile_no}</p>
            <p><strong>City:</strong><br>{$city}</p>
        ";

        // SMTP config (Gmail)
        $config = [
            'protocol'  => 'smtp',
            'smtp_host' => 'ssl://smtp.gmail.com',
            'smtp_port' => 465,
            'smtp_user' => 'Enquiry.website1122@gmail.com',
            'smtp_pass' => 'pxlv tsuf ehdi kxth',
            'mailtype'  => 'html',
            'charset'   => 'utf-8',
            'newline'   => "\r\n"
        ];

        $this->email->initialize($config);

        // Mail setup
        $this->email->from('Enquiry.website1122@gmail.com', 'Tcapital Wealth');
        $this->email->reply_to($email); // user email
        $this->email->to('Enquiry.website1122@gmail.com');
        $this->email->subject('Contact Mail');
        $this->email->message($mail_body);

        if ($this->email->send()) {
            echo json_encode([
                'status'  => "true",
                'message' => 'Mail sent successfully'
            ]);
        } else {
            echo json_encode([
                'status'  => "false",
                'message' => 'Mail sending failed',
                'error'   => $this->email->print_debugger()
            ]);
        }
    }
    	
  
    public function add_blog() 
   {
       $this->_init_cors();
       $this->_validate_admin();

       // Get POST data
       $name = $this->input->post('name');
       $description = $this->input->post('description');
       $date = $this->input->post('date');
       $details = $this->input->post('details');
       $slug = $this->input->post('slug') ?: '';
       $meta_description = $this->input->post('meta_description') ?: '';
       $focus_keyword = $this->input->post('focus_keyword') ?: '';
       $og_title = $this->input->post('og_title') ?: '';
       $og_description = $this->input->post('og_description') ?: '';
       $secondary_keywords = $this->input->post('secondary_keywords') ?: '';
       $canonical_url = $this->input->post('canonical_url') ?: '';
       $status = $this->input->post('status') ?: ($this->input->post('blog_status') ?: 'published');

       // Check required fields
       if (!$name || !$description || !$date || !$details) {
           echo json_encode([
               "status" => "false",
               "success" => "0",
               "message" => "All fields (name, description, date, details) are required."
           ]);
           return;
       }

       // Upload path inside 'uploads/blog_image/'
       $upload_path = './uploads/blog_image/';

       if (!is_dir($upload_path)) {
           if (!mkdir($upload_path, 0777, true)) {
               echo json_encode([
                   "status" => "false",
                   "success" => "0",
                   "message" => "Failed to create upload directory."
               ]);
               return;
           }
       }

       $image_name = null;

       // Handle file upload if exists
       if (!empty($_FILES['image']['name'])) {
           $file_name = time() . '_' . basename($_FILES['image']['name']);

           $config['upload_path']   = $upload_path;
           $config['allowed_types'] = 'jpg|jpeg|png|webp|gif';
           $config['file_name']     = $file_name;
           $config['max_size']      = 5120; // 5MB max
           $config['is_image']      = 1;

           $this->load->library('upload', $config);

           if (!$this->upload->do_upload('image')) {
               echo json_encode([
                   "status" => "false",
                   "success" => "0",
                   "message" => "Image upload failed: " . $this->upload->display_errors()
               ]);
               return;
           }

           $uploadData = $this->upload->data();
           $image_name = $uploadData['file_name'];
       }

    // Prepare data for DB
    $insertData = [
        "name" => $name,
        "description" => $description,
        "date" => $date,
        "details" => $details,
        "image" => $image_name,
        "slug" => $slug,
        "meta_description" => $meta_description,
        "focus_keyword" => $focus_keyword,
        "og_title" => $og_title,
        "og_description" => $og_description,
        "secondary_keywords" => $secondary_keywords,
        "canonical_url" => $canonical_url,
        "blog_status" => $status
    ];

    // Insert into DB with error handling
    if (!$this->db->insert('tbl_blog', $insertData)) {
        $db_error = $this->db->error();
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Database insert failed: " . $db_error['message']
        ]);
        return;
    }

    // Success response
    echo json_encode([
        "status" => "true",
        "success" => "1",
        "message" => "Blog added successfully",
        "data" => [
            "name" => $name,
            "description" => $description,
            "date" => $date,
            "details" => $details,
            "image" => $image_name ? 'uploads/blog_image/' . $image_name : null
        ]
    ]);
} 

public function list_blog()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header('Content-Type: application/json');

    // Smart Filtering: If authenticated, show all. If public, only published.
    // We check for the Authorization header.
    $authHeader = $this->input->get_request_header('Authorization');
    if (!$authHeader || empty($authHeader)) {
        $this->db->where('status', 'published');
    }

    $query = $this->db->get('tbl_blog');

    if ($query->num_rows() > 0) {

        $result = [];

        foreach ($query->result() as $row) {

            $result[] = [
                "blog_id" => $row->blog_id,
                "name" => $row->name,
                "description" => $row->description,
                "date" => $row->date,
                "details" => $row->details,
                "blog_status" => $row->status ?? 'published',
                "slug" => $row->slug ?? '',
                "meta_description" => $row->meta_description ?? '',
                "focus_keyword" => $row->focus_keyword ?? '',
                "og_title" => $row->og_title ?? '',
                "og_description" => $row->og_description ?? '',
                "secondary_keywords" => $row->secondary_keywords ?? '',
                "canonical_url" => $row->canonical_url ?? '',
                "image" => $row->image ? 'uploads/blog_image/' . $row->image : null
            ];
        }

        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "Blog list fetched",
            "data" => $result
        ]);

    } else {

        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "No blogs found",
            "data" => []
        ]);
    }
} 

public function get_by_id_blog()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

    // Read JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    $blog_id = isset($input['blog_id']) ? $input['blog_id'] : null;

    if (!$blog_id) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "blog_id is required"
        ]);
        return;
    }

    $this->db->where('blog_id', $blog_id);
    $query = $this->db->get('tbl_blog');

    if ($query->num_rows() > 0) {

        $row = $query->row();

        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "Blog found",
            "blog_id" => $row->blog_id,
            "name" => $row->name,
            "description" => $row->description,
            "date" => $row->date,
            "details" => $row->details,
            "slug" => $row->slug ?? '',
            "meta_description" => $row->meta_description ?? '',
            "focus_keyword" => $row->focus_keyword ?? '',
            "og_title" => $row->og_title ?? '',
            "og_description" => $row->og_description ?? '',
            "secondary_keywords" => $row->secondary_keywords ?? '',
            "canonical_url" => $row->canonical_url ?? '',
            "blog_status" => $row->status ?? 'published',
            "image" => $row->image ? 'uploads/blog_image/' . $row->image : null
        ]);

    } else {

        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Blog not found"
        ]);
    }
} 

   public function delete_blog()
   {
       $this->_init_cors();
       $this->_validate_admin();

       // Read JSON input
       $input = json_decode(file_get_contents("php://input"), true);
       $blog_id = isset($input['blog_id']) ? $input['blog_id'] : null;

    if (!$blog_id) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "blog_id is required"
        ]);
        return;
    }

    // Get blog data first (for image delete)
    $this->db->where('blog_id', $blog_id);
    $query = $this->db->get('tbl_blog');

    if ($query->num_rows() == 0) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Blog not found"
        ]);
        return;
    }

    $row = $query->row();

    // Delete image file if exists
    if (!empty($row->image)) {
        $file_path = './uploads/blog_image/' . $row->image;

        if (file_exists($file_path)) {
            unlink($file_path);
        }
    }

    // Delete from DB
    $this->db->where('blog_id', $blog_id);
    if ($this->db->delete('tbl_blog')) {

        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "Blog deleted successfully"
        ]);

    } else {

        $db_error = $this->db->error();

        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Delete failed: " . $db_error['message']
        ]);
    }
} 

    public function update_blog()
    {
        $this->_init_cors();
        $this->_validate_admin();

    // Get POST data (form-data)
    $blog_id    = $this->input->post('blog_id');
    $name       = $this->input->post('name');
    $description= $this->input->post('description');
    $date       = $this->input->post('date');
    $details    = $this->input->post('details');

    if (!$blog_id) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "blog_id is required"
        ]);
        return;
    }

    // Check if blog exists
    $this->db->where('blog_id', $blog_id);
    $query = $this->db->get('tbl_blog');

    if ($query->num_rows() == 0) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Blog not found"
        ]);
        return;
    }

    $row = $query->row();
    $old_image = $row->image;

    // Upload path
    $upload_path = './uploads/blog_image/';
    if (!is_dir($upload_path)) {
        mkdir($upload_path, 0777, true);
    }

    $image_name = $old_image;

    // Handle image upload
    if (!empty($_FILES['image']['name'])) {
        $file_name = time() . '_' . basename($_FILES['image']['name']);

        $config['upload_path']   = $upload_path;
        $config['allowed_types'] = 'jpg|jpeg|png|webp|gif';
        $config['file_name']     = $file_name;
        $config['max_size']      = 5120;
        $config['is_image']      = 1;

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('image')) {
            echo json_encode([
                "status" => "false",
                "success" => "0",
                "message" => $this->upload->display_errors()
            ]);
            return;
        }

        $uploadData = $this->upload->data();
        $image_name = $uploadData['file_name'];

        // Delete old image
        if (!empty($old_image)) {
            $old_path = './uploads/blog_image/' . $old_image;
            if (file_exists($old_path)) unlink($old_path);
        }
    }

    // Prepare update data
    $updateData = [];
    if ($name !== null)               $updateData['name'] = $name;
    if ($description !== null)         $updateData['description'] = $description;
    if ($date !== null)                $updateData['date'] = $date;
    if ($details !== null)             $updateData['details'] = $details;
    $updateData['image']               = $image_name;
    $updateData['slug']                = $this->input->post('slug') ?: '';
    $updateData['meta_description']    = $this->input->post('meta_description') ?: '';
    $updateData['focus_keyword']       = $this->input->post('focus_keyword') ?: '';
    $updateData['og_title']            = $this->input->post('og_title') ?: '';
    $updateData['og_description']      = $this->input->post('og_description') ?: '';
    $updateData['secondary_keywords']  = $this->input->post('secondary_keywords') ?: '';
    $updateData['canonical_url']       = $this->input->post('canonical_url') ?: '';
    
    $status = $this->input->post('status') ?: $this->input->post('blog_status');
    if ($status !== null) $updateData['status'] = $status;

    // Update DB
    $this->db->where('blog_id', $blog_id);
    if ($this->db->update('tbl_blog', $updateData)) {
        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "Blog updated successfully",
            "image" => $image_name ? 'uploads/blog_image/' . $image_name : null
        ]);
    } else {
        $db_error = $this->db->error();
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Update failed: " . $db_error['message']
        ]);
    }
} 

    public function add_consultation()
    {
        $this->_init_cors();

    // ---------- Read input ----------
    $input = json_decode(file_get_contents('php://input'), true);

    $name     = trim($input['name'] ?? '');
    $email    = trim($input['email'] ?? '');
    $phone    = trim($input['phone'] ?? '');
    $city     = trim($input['city'] ?? '');
    
   
    // ---------- Validation ----------
    if (!$name ||  !$email) {
        echo json_encode([
            "status"  => "false",
            "success" => "0",
            "message" => "Name, are required"
        ]);
        return;
    }

    // ---------- Prepare Data ----------
    $data = [
        'name'     => $name,
        'email'    => $email,
        'phone'    => $phone,
        'city'     => $city,
        'created_at' => date('Y-m-d H:i:s')
      
    ];

    // ---------- Insert into DB ----------
    if ($this->db->insert('tbl_consultation', $data)) {
        echo json_encode([
            "status"  => "true",
            "success" => "1",
            "message" => "consultation successfully"
        ]);
    } else {
        echo json_encode([
            "status"  => "false",
            "success" => "0",
            "message" => "Failed to consultation",
            "db_error" => $this->db->error()
        ]);
    }
} 

    public function list_consultation()
    {
        $this->_init_cors("GET, OPTIONS");
        $this->_validate_admin();

    $limit = $this->input->post('limit') ?: 50;
    $offset = $this->input->post('offset') ?: 0;

    // ---------- Fetch all private FAQs ----------
    $this->db->select('*');
    $this->db->from('tbl_consultation');
    $this->db->limit($limit, $offset);
    $this->db->order_by('consultation_id', 'DESC');

    $data = $this->db->get()->result();

    echo json_encode([
        "status" => "true",
        "success" => "1",
        "data"   => $data
    ]);
}

public function delete_consultation()
{
    // ---------- CORS ----------
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    // Handle OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        echo json_encode([]);
        return;
    }

    // ---------- Read JSON input ----------
    $input = json_decode(file_get_contents('php://input'), true);

    $consultation_id = isset($input['consultation_id']) ? (int)$input['consultation_id'] : null;

    if (!$consultation_id) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Consultation ID is required"
        ]);
        return;
    }

    // ---------- Check if FAQ exists ----------
    $faq = $this->db->get_where('tbl_consultation', ['consultation_id' => $consultation_id])->row();

    if (!$faq) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Consultation not found"
        ]);
        return;
    }

    // ---------- Delete FAQ ----------
    $deleted = $this->db->delete('tbl_consultation', ['consultation_id' => $consultation_id]);

    if ($deleted) {
        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "Consultation deleted successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Failed to delete Consultation"
        ]);
    }
}

public function get_by_id_consultation()
{
    // ---------- CORS ----------
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    // Handle OPTIONS preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // ---------- Read input ----------
    $input = json_decode(file_get_contents('php://input'), true);
    $consultation_id = isset($input['consultation_id']) ? (int)$input['consultation_id'] : null;

    // Validate id
    if (!$consultation_id) {
        echo json_encode([
            "status" => "false",
            "message" => "consultation id is required"
        ]);
        return;
    }

    // Fetch FAQ from DB
    $this->db->where('consultation_id', $consultation_id);
    $query = $this->db->get('tbl_consultation');

    if (!$query) {
        echo json_encode([
            "status" => "false",
            "message" => "Database query failed",
            "error" => $this->db->error()
        ]);
        return;
    }

    $data = $query->row_array();

    if (!$data) {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Consultation not found"
        ]);
        return;
    }

    // Return FAQ data
    echo json_encode([
        "status" => "true",
        "success" => "1",
        "message" => "Consultation fetched successfully",
        "data" => $data
    ]);
} 

public function update_consultation()
{
    // ---------- CORS ----------
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        echo json_encode([]);
        return;
    }

    // ---------- Read JSON ----------
    $input = json_decode(file_get_contents('php://input'), true);

    $consultation_id = $input['consultation_id'] ?? null;
    $name            = trim($input['name'] ?? '');
    $email           = trim($input['email'] ?? '');
    $phone           = trim($input['phone'] ?? '');
    $city            = trim($input['city'] ?? '');

    if (!$consultation_id) {
        echo json_encode([
            "status"  => "false",
            "success" => "0",
            "message" => "Consultation id is required"
        ]);
        return;
    }

    // Prepare update data
    $data = [];
    if ($name !== '') $data['name'] = $name;
    if ($email !== '') $data['email'] = $email;
    if ($phone !== '') $data['phone'] = $phone;
    if ($city !== '') $data['city'] = $city;
    

    if (empty($data)) {
        echo json_encode([
            "status"  => "false",
            "message" => "Nothing to update"
        ]);
        return;
    }

    // Update DB
    $this->db->where('consultation_id', $consultation_id);
    $updated = $this->db->update('tbl_consultation', $data);

    if ($updated) {
        echo json_encode([
            "status"  => "true",
            "success" => "1",
            "message" => "Consultation updated successfully"
        ]);
    } else {
        echo json_encode([
            "status"  => "false",
            "success" => "0",
            "message" => "Failed to update record"
        ]);
    }
} 

    public function insert_seo()
    {
        $this->_init_cors();
        $this->_validate_admin();

    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        $input = $this->input->post();
    }

    if (
        empty($input['page_name']) ||
        empty($input['meta_title']) ||
        empty($input['meta_description'])
    ) {
        echo json_encode([
            "status" => "false",
            "message" => "Required fields missing"
        ]);
        return;
    }

    // ✅ SIRF YE NAYA CODE ADD KARO
    $existing = $this->db->get_where(
        'tbl_pages_seo',
        ['page_name' => $input['page_name']]
    )->row();

    if ($existing) {
        echo json_encode([
            "status" => "false",
            "message" => "This page SEO already exists. Edit the existing one."
        ]);
        return;
    }
    // ✅ NAYA CODE KHATAM

    $data = [
        "page_name"        => $input['page_name'],
        "meta_title"       => $input['meta_title'],
        "meta_description" => $input['meta_description'],
        "meta_keywords"    => $input['meta_keywords'],
        "canonical_url"    => $input['canonical_url']
    ];

    $insert = $this->db->insert("tbl_pages_seo", $data);

    if ($insert) {
        echo json_encode([
            "status"  => "true",
            "message" => "SEO inserted successfully",
            "id"      => $this->db->insert_id()
        ]);
    } else {
        echo json_encode([
            "status"  => "false",
            "message" => "Insert failed"
        ]);
    }
}

public function list_seo()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Content-Type: application/json");

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Fetch data
    $query = $this->db->get('tbl_pages_seo');
    $result = $query->result();

    if (!empty($result)) {
        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "SEO list fetched successfully",
            "data" => $result
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "No records found",
            "data" => []
        ]);
    }
}


public function get_id_seo()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate ID
    if (empty($input['id']) || !is_numeric($input['id'])) {
        echo json_encode([
            "status" => "false",
            "message" => "Valid ID is required"
        ]);
        return;
    }

    $id = $input['id'];

    // Fetch data
    $query = $this->db->get_where('tbl_pages_seo', ['id' => $id]);
    $result = $query->row();

    if ($result) {
        echo json_encode([
            "status" => "true",
            "success" =>"1",
            "message" => "SEO data fetched successfully",
            "data" => $result
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Record not found",
            "data" => null
        ]);
    }
} 

    public function delete_seo()
    {
        $this->_init_cors();
        $this->_validate_admin();

    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate ID
    if (empty($input['id']) || !is_numeric($input['id'])) {
        echo json_encode([
            "status" => "false",
            "message" => "Valid ID is required"
        ]);
        return;
    }

    $id = $input['id'];

    // Check if record exists
    $exists = $this->db->get_where('tbl_pages_seo', ['id' => $id])->row();

    if (!$exists) {
        echo json_encode([
            "status" => "false",
            "success" =>"0",
            "message" => "Record not found"
        ]);
        return;
    }

    // Delete record
    $this->db->where('id', $id);
    $delete = $this->db->delete('tbl_pages_seo');

    if ($delete) {
        echo json_encode([
            "status" => "true",
            "success" =>"1",
            "message" => "SEO record deleted successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "success" =>"0",
            "message" => "Failed to delete record"
        ]);
    }
} 

    public function update_seo()
    {
        $this->_init_cors();
        $this->_validate_admin();

    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (
        empty($input['id']) ||
        empty($input['page_name']) ||
        empty($input['meta_title']) ||
        empty($input['meta_description']) ||
        empty($input['meta_keywords']) ||
        empty($input['canonical_url'])
    ) {
        echo json_encode([
            "status" => false,
            "message" => "All fields are required"
        ]);
        return;
    }

    if (!is_numeric($input['id'])) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid ID"
        ]);
        return;
    }

    $id = $input['id'];

    // Check if record exists
    $exists = $this->db->get_where('tbl_pages_seo', ['id' => $id])->row();

    if (!$exists) {
        echo json_encode([
            "status" => false,
            "message" => "Record not found"
        ]);
        return;
    }

    // Check duplicate page_name (except current ID)
    $this->db->where('page_name', $input['page_name']);
    $this->db->where('id !=', $id);
    $duplicate = $this->db->get('tbl_pages_seo')->row();

    if ($duplicate) {
        echo json_encode([
            "status" => false,
            "message" => "Page name already exists"
        ]);
        return;
    }

    // Prepare full update data
    $data = [
        "page_name" => $input['page_name'],
        "meta_title" => $input['meta_title'],
        "meta_description" => $input['meta_description'],
        "meta_keywords" => $input['meta_keywords'],
        "canonical_url" => $input['canonical_url']
    ];

    // Update
    $this->db->where('id', $id);
    $update = $this->db->update('tbl_pages_seo', $data);

    if ($update) {
        echo json_encode([
            "status" => "true",
            "success" => "1",
            "message" => "SEO record updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "success" => "0",
            "message" => "Failed to update record"
        ]);
    }
} 

public function get_seo_by_page()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $input = json_decode(file_get_contents("php://input"), true);

    if (empty($input['page_name'])) {
        echo json_encode([
            "status" => "false",
            "message" => "Page name required"
        ]);
        return;
    }

    $page = $input['page_name'];

    $query = $this->db->get_where('tbl_pages_seo', [
        'page_name' => $page
    ]);

    $result = $query->row();

    if ($result) {

        echo json_encode([
            "status" => "true",
            "success" => "1",
            "data" => $result
        ]);

    } else {

        echo json_encode([
            "status" => "false",
            "success" => "0",
            "data" => null
        ]);
    }
}

}
