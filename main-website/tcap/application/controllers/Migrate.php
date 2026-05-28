<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migrate extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function run()
    {
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: *");
        
        try {
            // Check if columns are already LONGTEXT
            $query = $this->db->query("SHOW COLUMNS FROM tbl_blog WHERE Field = 'details'");
            $column = $query->row();
            
            if (strpos($column->Type, 'longtext') !== false) {
                echo json_encode([
                    'status' => 'true',
                    'message' => 'Migration already applied - columns are already LONGTEXT'
                ]);
                return;
            }
            
            // Apply migration
            $this->db->query("ALTER TABLE `tbl_blog` MODIFY COLUMN `details` LONGTEXT DEFAULT NULL");
            $this->db->query("ALTER TABLE `tbl_blog` MODIFY COLUMN `description` LONGTEXT DEFAULT NULL");
            $this->db->query("ALTER TABLE `tbl_blog` MODIFY COLUMN `meta_description` LONGTEXT DEFAULT NULL");
            $this->db->query("ALTER TABLE `tbl_blog` MODIFY COLUMN `og_description` LONGTEXT DEFAULT NULL");
            $this->db->query("ALTER TABLE `tbl_blog` MODIFY COLUMN `secondary_keywords` LONGTEXT DEFAULT NULL");
            $this->db->query("ALTER TABLE `tbl_blog` MODIFY COLUMN `canonical_url` LONGTEXT DEFAULT NULL");
            
            echo json_encode([
                'status' => 'true',
                'message' => 'Migration applied successfully - blog columns upgraded to LONGTEXT'
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'false',
                'message' => 'Migration failed: ' . $e->getMessage()
            ]);
        }
    }

    public function create_admin()
    {
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: *");
        
        try {
            // Create tbl_admin if not exists
            $this->db->query("CREATE TABLE IF NOT EXISTS `tbl_admin` (
              `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
              `username` varchar(50) NOT NULL,
              `password_hash` varchar(255) NOT NULL,
              `name` varchar(100) DEFAULT NULL,
              `email` varchar(100) DEFAULT NULL,
              `role` varchar(20) DEFAULT 'admin',
              `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
              `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              PRIMARY KEY (`id`),
              UNIQUE KEY `unique_username` (`username`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
            
            // Check if admin already exists
            $query = $this->db->query("SELECT * FROM tbl_admin WHERE username = 'admin'");
            
            if ($query->num_rows() > 0) {
                echo json_encode([
                    'status' => 'true',
                    'message' => 'Admin user already exists',
                    'username' => 'admin',
                    'password' => 'admin123'
                ]);
                return;
            }
            
            // Insert default admin user (password: admin123, MD5 hashed)
            $this->db->query("INSERT INTO `tbl_admin` (`id`, `username`, `password_hash`, `name`, `email`, `role`) VALUES
            (1, 'admin', '202cb962ac59075b964b07152d234b70', 'Administrator', 'admin@tcapitalwealth.com', 'admin')");
            
            echo json_encode([
                'status' => 'true',
                'message' => 'Default admin user created successfully',
                'username' => 'admin',
                'password' => 'admin123'
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'false',
                'message' => 'Failed to create admin: ' . $e->getMessage()
            ]);
        }
    }
}
