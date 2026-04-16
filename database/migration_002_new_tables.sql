-- ============================================================
-- TCAP Database Migration - Phase 2: New Tables
-- ============================================================
-- This script adds new tables for features that need database support
-- SAFE: Uses IF NOT EXISTS - will not affect existing data
--
-- Run after Phase 1: mysql -u username -p database_name < migration_002_new_tables.sql
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table: tbl_career_applications (Job Applications)
-- For the Career page - stores internship/job applications
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_career_applications` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(100) NOT NULL COMMENT 'e.g., Finance Intern, Marketing Intern',
  `experience` varchar(50) DEFAULT NULL COMMENT 'Fresher, 1-2 years, etc.',
  `qualification` varchar(100) DEFAULT NULL,
  `resume_url` varchar(500) DEFAULT NULL COMMENT 'Path to uploaded resume',
  `cover_letter` text DEFAULT NULL,
  `status` enum('pending','reviewed','shortlisted','rejected','hired') DEFAULT 'pending',
  `applied_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`application_id`),
  KEY `idx_status` (`status`),
  KEY `idx_position` (`position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: tbl_partner_applications (Partner Inquiries)
-- For the Partner page - stores partnership requests
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_partner_applications` (
  `partner_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(150) NOT NULL,
  `contact_person` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `partnership_type` varchar(100) DEFAULT NULL COMMENT 'Referral, Strategic, etc.',
  `message` text DEFAULT NULL,
  `status` enum('new','contacted','negotiating','approved','rejected') DEFAULT 'new',
  `submitted_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`partner_id`),
  KEY `idx_status` (`status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: tbl_products (Investment Products)
-- For the Product page - stores product catalog
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL COMMENT 'Direct Equity, Managed Solutions, Fixed Income',
  `short_description` varchar(500) DEFAULT NULL,
  `full_description` text DEFAULT NULL,
  `features` json DEFAULT NULL COMMENT 'Array of features',
  `min_investment` decimal(15,2) DEFAULT NULL,
  `risk_level` enum('low','moderate','high','very_high') DEFAULT NULL,
  `icon_class` varchar(50) DEFAULT NULL COMMENT 'Bootstrap icon class',
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`product_id`),
  KEY `idx_category` (`category`),
  KEY `idx_active` (`is_active`),
  KEY `idx_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default products if table is empty
INSERT INTO `tbl_products` (`product_name`, `category`, `short_description`, `features`, `risk_level`, `icon_class`, `display_order`)
SELECT * FROM (SELECT 
  'Direct Equity', 
  'Direct Equity',
  'Institutional-grade execution and advisory powered by Motilal Oswal research.',
  '["Expert Research", "Real-time Execution", "Portfolio Tracking"]',
  'high',
  'bi-shield-check',
  1
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `tbl_products` WHERE `product_name` = 'Direct Equity') LIMIT 1;

INSERT INTO `tbl_products` (`product_name`, `category`, `short_description`, `features`, `risk_level`, `icon_class`, `display_order`)
SELECT * FROM (SELECT 
  'Managed Solutions', 
  'Managed Solutions',
  'Curated Mutual Funds, Portfolio Management Services (PMS), and Alternative Investment Funds (AIF).',
  '["PMS Advisory", "AIF Access", "MF Research"]',
  'moderate',
  'bi-lock',
  2
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `tbl_products` WHERE `product_name` = 'Managed Solutions') LIMIT 1;

INSERT INTO `tbl_products` (`product_name`, `category`, `short_description`, `features`, `risk_level`, `icon_class`, `display_order`)
SELECT * FROM (SELECT 
  'Fixed Income & Niche', 
  'Fixed Income',
  'Bonds and structured products for capital preservation and sophisticated yield.',
  '["Government Bonds", "Corporate Bonds", "Structured Products"]',
  'low',
  'bi-chat-dots',
  3
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `tbl_products` WHERE `product_name` = 'Fixed Income & Niche') LIMIT 1;

-- --------------------------------------------------------
-- Table: tbl_contact_messages (Contact Form Submissions)
-- Separate from consultations for the Contact page
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_contact_messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `submitted_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`message_id`),
  KEY `idx_read` (`is_read`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: tbl_users (Admin Authentication)
-- For admin panel login (if needed in future)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `role` enum('admin','editor','viewer') DEFAULT 'editor',
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_username` (`username`),
  UNIQUE KEY `unique_email` (`email`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: tbl_activity_log (Audit Trail)
-- For tracking admin actions
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_activity_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL COMMENT 'create, update, delete, login, etc.',
  `entity_type` varchar(50) NOT NULL COMMENT 'blog, consultation, product, etc.',
  `entity_id` int(11) DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_entity` (`entity_type`, `entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Migration Complete
-- ============================================================
