ALTER TABLE tbl_pages_seo 
ADD COLUMN focus_keyword VARCHAR(255) AFTER meta_description,
ADD COLUMN og_title VARCHAR(255) AFTER meta_keywords,
ADD COLUMN og_description TEXT AFTER og_title;

INSERT IGNORE INTO tbl_pages_seo (page_name, meta_title, meta_description, canonical_url) VALUES 
('home', 'T Capital Wealth | Financial Planning & Investment', 'Investment and financial planning services.', 'https://tcapitalwealth.com/'),
('about', 'About Us | T Capital Wealth', 'Learn about our team and mission.', 'https://tcapitalwealth.com/about'),
('product', 'Our Products | T Capital Wealth', 'Competitive financial products for your future.', 'https://tcapitalwealth.com/product'),
('partner', 'Partner with Us | T Capital Wealth', 'Join our network of financial partners.', 'https://tcapitalwealth.com/partner'),
('contact', 'Contact Us | T Capital Wealth', 'Get in touch with our team.', 'https://tcapitalwealth.com/contact'),
('career', 'Careers | T Capital Wealth', 'Join our growing team of financial experts.', 'https://tcapitalwealth.com/career'),
('blog', 'Blog | Financial Insights', 'Latest news and insights from T Capital Wealth.', 'https://tcapitalwealth.com/blog');
