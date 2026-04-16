-- ============================================================
-- TCAP Database Setup - Phase 1: Existing Schema
-- ============================================================
-- This script sets up the current database schema with existing data
-- SAFE: Preserves all existing data if run on existing database
-- 
-- Run this first: mysql -u username -p database_name < migration_001_setup_existing.sql
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table: tbl_blog (Blog Posts)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_blog` (
  `blog_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `details` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`blog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reset auto increment if table is empty
-- Note: This won't affect existing data
-- --------------------------------------------------------
-- Table: tbl_consultation (Consultation Forms)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_consultation` (
  `consultation_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`consultation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data only if table is empty (to avoid duplicates)
INSERT INTO `tbl_consultation` (`consultation_id`, `name`, `phone`, `email`, `city`, `created_at`)
SELECT * FROM (SELECT 1, 'Nikita Borkar', '9876543210', 'niku@gmail.com', 'Warud', '2026-03-25 06:25:51') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `tbl_consultation` WHERE `consultation_id` = 1) LIMIT 1;

INSERT INTO `tbl_consultation` (`consultation_id`, `name`, `phone`, `email`, `city`, `created_at`)
SELECT * FROM (SELECT 2, 'Sai Ram', '9876543211', 'Saai@gmail.com', 'Nagpur', '2026-03-25 06:26:59') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `tbl_consultation` WHERE `consultation_id` = 2) LIMIT 1;

-- Reset auto increment to next available value
-- --------------------------------------------------------
-- Table: tbl_pages_seo (SEO Metadata)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_pages_seo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_name` varchar(50) DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `canonical_url` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_page_name` (`page_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Insert SEO data only if not exists (uses INSERT IGNORE for duplicates)
INSERT IGNORE INTO `tbl_pages_seo` (`id`, `page_name`, `meta_title`, `meta_description`, `meta_keywords`, `canonical_url`) VALUES
(1, 'about', 'Best Wealth Advisor in India - T Capital Wealth', 'T Capital Wealth is India\'s trusted wealth management company offering expert financial planning, mutual fund advisory, and portfolio management services.', 'wealth advisor India, best wealth management company India, financial planning India, mutual fund advisor India', 'https://tcapitalwealth.com/about'),
(3, 'blog', 'T Capital Wealth', 'Read T Capital Wealth blog for expert insights on wealth management, investment strategies, financial planning, mutual funds, portfolio management, retirement planning, and smart investment tips in India.', 'wealth management blog India, investment blog India, financial planning tips India, how to invest money in India, wealth creation strategies India, best investment options in India, mutual fund investment India, portfolio management services India, investment advisory services India, retirement planning India, financial investment planning India, smart investment strategies India, long term wealth building India, best mutual funds for long term India, how to build investment portfolio India', 'https://tcapitalwealth.com/blog'),
(4, 'product', 'T Capital Wealth', 'Explore T Capital Wealth investment and wealth management services in India including portfolio management, mutual fund investment, financial planning, retirement planning, SIP investment, and professional wealth advisory solutions.', 'wealth management services India, investment advisory services India, portfolio management services India, financial planning services India, mutual fund investment advisor India, SIP investment advisor India, portfolio management advisor India, investment portfolio management India, financial investment planning India, wealth management solutions India, investment planning consultant India, mutual fund financial planning India, professional wealth management services India, PMS investment advisor India, best investment options in India, wealth management for professionals India, investment advisory company in India', 'https://tcapitalwealth.com/product'),
(5, 'partner', 'T Capital Wealth', 'Partner with T Capital Wealth to grow your business with expert financial advisory, investment solutions, and wealth management services in India.', 'financial partnership India, investment partnership, wealth management partnership, T Capital partnership', 'https://tcapitalwealth.com/partner'),
(6, 'contact', 'Contact Us | T Capital Wealth', 'Get in touch with T Capital Wealth for portfolio analysis, investment advisory, and wealth management services.', 'contact T Capital Wealth, investment advisor contact, wealth management consultation', 'https://tcapitalwealth.com/contact'),
(7, 'career', 'Careers | T Capital Wealth', 'Explore career opportunities at T Capital Wealth. Apply for Finance and Marketing Intern positions and start your career in wealth management.', 'T Capital Wealth careers, finance internship, marketing internship, jobs in finance', 'https://tcapitalwealth.com/career'),
(8, 'home', 'Wealth Management  & Investment Advisors India | T Capital Wealth', 'T Capital Wealth offers professional wealth management services, investment advisory, portfolio management, SIP planning and mutual fund investment solutions in India.', 'wealth planning services India, best investment advisor India', 'https://tcapitalwealth.com/');

-- Reset auto increment values based on existing data
-- Note: This runs only if the table exists and has the expected structure
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Migration Complete
-- ============================================================
