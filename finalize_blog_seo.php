<?php
$host = 'localhost';
$user = 'u555641943_tcap';
$pass = 'Kw4kN#uqnW.#KJw';
$db   = 'u555641943_tcap';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$blog_id = 16;
$og_title = "Retirement Planning with Smart Investment | Build a Secure Future";
$og_description = "Discover why early retirement planning is critical and how smart investment strategies like equity, mutual funds, and fixed income can secure your financial independence.";
$secondary_keywords = "retirement corpus, compounding returns, pension plans, financial freedom, wealth management, asset allocation";
$canonical_url = "https://tcapitalwealth.com/blog/retirement-planning-smart-investment";

$stmt = $conn->prepare("UPDATE tbl_blog SET og_title=?, og_description=?, secondary_keywords=?, canonical_url=? WHERE blog_id=?");
$stmt->bind_param("ssssi", $og_title, $og_description, $secondary_keywords, $canonical_url, $blog_id);

if ($stmt->execute()) {
    echo "Blog 16 SEO fields updated.\n";
} else {
    echo "Error: " . $stmt->error . "\n";
}
$stmt->close();
$conn->close();
?>
