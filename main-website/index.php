<?php
declare(strict_types=1);

$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$html = file_get_contents(__DIR__ . '/index.html');

try {
    $host = getenv('DB_HOST') ?: 'localhost';
    $user = getenv('DB_USER') ?: 'u555641943_tcap';
    $pass = getenv('DB_PASS') ?: 'Kw4kN#uqnW.#KJw';
    $dbname = getenv('DB_NAME') ?: 'u555641943_tcap';

    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $seoTags = '';

    // Handle Blog Pages
    if (preg_match('#^/blog/([^/?]+)#', $requestUri, $matches)) {
        $slug = $matches[1];
        $stmt = $pdo->prepare("SELECT name, meta_title, meta_description, og_title, og_description, image FROM tbl_blog WHERE slug = :slug AND blog_status = 'published'");
        $stmt->execute(['slug' => $slug]);
        $blog = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($blog) {
            $title = htmlspecialchars($blog['meta_title'] ?: $blog['name'], ENT_QUOTES, 'UTF-8');
            $desc = htmlspecialchars($blog['meta_description'] ?: '', ENT_QUOTES, 'UTF-8');
            $og_title = htmlspecialchars($blog['og_title'] ?: $title, ENT_QUOTES, 'UTF-8');
            $og_desc = htmlspecialchars($blog['og_description'] ?: $desc, ENT_QUOTES, 'UTF-8');
            
            $imageUrl = '';
            if ($blog['image']) {
                $hostName = $_SERVER['HTTP_HOST'] ?? 'tcapitalwealth.com';
                $imageUrl = 'http://' . $hostName . '/tcap/uploads/blog_image/' . htmlspecialchars($blog['image'], ENT_QUOTES, 'UTF-8');
            }

            $seoTags .= "    <title>{$title}</title>\n";
            $seoTags .= "    <meta name=\"description\" content=\"{$desc}\">\n";
            $seoTags .= "    <meta property=\"og:title\" content=\"{$og_title}\">\n";
            $seoTags .= "    <meta property=\"og:description\" content=\"{$og_desc}\">\n";
            $seoTags .= "    <meta property=\"og:type\" content=\"article\">\n";
            if ($imageUrl) {
                $seoTags .= "    <meta property=\"og:image\" content=\"{$imageUrl}\">\n";
            }
        }
    } 
    // Handle Standard Pages (e.g. /, /about, /services)
    else {
        // Remove trailing/leading slashes, ignore query string
        $path = trim(parse_url($requestUri, PHP_URL_PATH), '/');
        $page_name = $path === '' ? 'home' : $path;

        $stmt = $pdo->prepare("SELECT meta_title, meta_description, meta_keywords, focus_keyword, canonical_url, og_title, og_description FROM tbl_pages_seo WHERE page_name = :page_name");
        $stmt->execute(['page_name' => $page_name]);
        $seo = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($seo) {
            $title = htmlspecialchars($seo['meta_title'] ?: '', ENT_QUOTES, 'UTF-8');
            $desc = htmlspecialchars($seo['meta_description'] ?: '', ENT_QUOTES, 'UTF-8');
            $keywords = htmlspecialchars($seo['meta_keywords'] ?: $seo['focus_keyword'] ?: '', ENT_QUOTES, 'UTF-8');
            $og_title = htmlspecialchars($seo['og_title'] ?: $title, ENT_QUOTES, 'UTF-8');
            $og_desc = htmlspecialchars($seo['og_description'] ?: $desc, ENT_QUOTES, 'UTF-8');
            $canonical = htmlspecialchars($seo['canonical_url'] ?: '', ENT_QUOTES, 'UTF-8');

            if ($title) $seoTags .= "    <title>{$title}</title>\n";
            if ($desc) $seoTags .= "    <meta name=\"description\" content=\"{$desc}\">\n";
            if ($keywords) $seoTags .= "    <meta name=\"keywords\" content=\"{$keywords}\">\n";
            if ($og_title) $seoTags .= "    <meta property=\"og:title\" content=\"{$og_title}\">\n";
            if ($og_desc) $seoTags .= "    <meta property=\"og:description\" content=\"{$og_desc}\">\n";
            $seoTags .= "    <meta property=\"og:type\" content=\"website\">\n";
            if ($canonical) {
                $seoTags .= "    <link rel=\"canonical\" href=\"{$canonical}\">\n";
                $seoTags .= "    <meta property=\"og:url\" content=\"{$canonical}\">\n";
            }
        }
    }

    if ($seoTags !== '') {
        // Strip the existing <title> from index.html to avoid duplicates
        $html = preg_replace('/<title>.*?<\/title>/is', '', $html);
        $html = str_replace('</head>', $seoTags . "</head>", $html);
    }
} catch (Exception $e) {
    // Silently fallback to raw index.html on DB error
}

echo $html;
