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

// 	public function index()
// 	{
// 		$this->load->view('welcome_message');
// 	}
	
	 
    public function send()
    {
                
        // ini_set('display_errors', 1);
        // error_reporting(E_ALL);
        
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
    // ini_set('display_errors',1);
    // error_reporting(E_ALL);
    
        // Enable CORS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

    // Get POST data
    $name = $this->input->post('name');
    $description = $this->input->post('description');
    $date = $this->input->post('date');
    $details = $this->input->post('details');

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
        // $config['allowed_types'] = 'jpg|jpeg|png|gif|webp';
        $config['allowed_types'] = '*';
        $config['file_name']     = $file_name;
        $config['max_size']      = 10240; // 10MB max

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
        "image" => $image_name
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
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

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
        // $config['allowed_types'] = 'jpg|jpeg|png|gif|webp';
        $config['allowed_types'] = '*';
        $config['file_name']     = $file_name;

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
    if ($name !== null)        $updateData['name'] = $name;
    if ($description !== null) $updateData['description'] = $description;
    if ($date !== null)        $updateData['date'] = $date;
    if ($details !== null)     $updateData['details'] = $details;
    $updateData['image'] = $image_name;

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
    // ---------- CORS ----------
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    // Handle OPTIONS preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        echo json_encode([]);
        return;
    }

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
    // ---------- CORS ----------
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Content-Type: application/json");

    // Handle OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        echo json_encode([]);
        return;
    }

    // ---------- Fetch all private FAQs ----------
    $this->db->select('*');
    $this->db->from('tbl_consultation');
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
            "message" => "Failed to update Consultation",
            "db_error" => $this->db->error()
        ]);
    }
}  

// public function insert_seo()
// {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type, Authorization");
//     header("Access-Control-Allow-Methods: POST, OPTIONS");
//     header("Content-Type: application/json");

//     // Handle preflight request
//     if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//         http_response_code(200);
//         exit();
//     }

//     // Get raw input
//     $input = json_decode(file_get_contents("php://input"), true);

//     // Validate input
//     if (
//         empty($input['page_name']) ||
//         empty($input['meta_title']) ||
//         empty($input['meta_description'])
//     ) {
//         echo json_encode([
//             "status" => false,
//             "message" => "Required fields are missing"
//         ]);
//         return;
//     }

//     // Prepare data
//     $data = [
//         "page_name" => $input['page_name'],
//         "meta_title" => $input['meta_title'],
//         "meta_description" => $input['meta_description'],
//         "meta_keywords" => $input['meta_keywords'] ?? null,
//         "canonical_url" => $input['canonical_url'] ?? null
//     ];

//     // Insert into DB
//     $insert = $this->db->insert('tbl_pages_seo', $data);

//     if ($insert) {
//         echo json_encode([
//             "status" => "true",
//             "success" => "1",
//             "message" => "SEO data inserted successfully",
//             "id" => $this->db->insert_id()
//         ]);
//     } else {
//         echo json_encode([
//             "status" => "false",
//             "success" => "0",
//             "message" => "Failed to insert data"
//         ]);
//     }
// } 

// public function insert_seo()
// {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type, Authorization");
//     header("Access-Control-Allow-Methods: POST, OPTIONS");
//     header("Content-Type: application/json");

//     if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//         http_response_code(200);
//         exit();
//     }

//     // Try JSON input
//     $input = json_decode(file_get_contents("php://input"), true);

//     // If JSON empty, try POST
//     if (!$input) {
//         $input = $this->input->post();
//     }

//     if (
//         empty($input['page_name']) ||
//         empty($input['meta_title']) ||
//         empty($input['meta_description'])
//     ) {
//         echo json_encode([
//             "status" => "false",
//             "message" => "Required fields missing"
//         ]);
//         return;
//     }

//     $data = [
//         "page_name" => $input['page_name'],
//         "meta_title" => $input['meta_title'],
//         "meta_description" => $input['meta_description'],
//         "meta_keywords" => $input['meta_keywords'],
//         "canonical_url" => $input['canonical_url']
//     ];

//     $insert = $this->db->insert("tbl_pages_seo", $data);

//     if ($insert) {
//         echo json_encode([
//             "status" => "true",
//             "success" => "1",
//             "message" => "SEO inserted successfully",
//             "id" => $this->db->insert_id()
//         ]);
//     } else {
//         echo json_encode([
//             "status" => "false",
//             "success" => "0",
//             "message" => "Insert failed"
//         ]);
//     }
// } 

public function insert_seo()
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
