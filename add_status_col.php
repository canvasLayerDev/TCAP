<?php
$host = 'localhost';
$user = 'u555641943_tcap';
$pass = 'Kw4kN#uqnW.#KJw';
$db   = 'u555641943_tcap';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$sql = "ALTER TABLE tbl_blog 
        ADD COLUMN IF NOT EXISTS status ENUM('draft', 'published') NOT NULL DEFAULT 'published' AFTER image";

if ($conn->query($sql)) {
    echo "Status column added successfuly.\n";
    $r = $conn->query("DESCRIBE tbl_blog");
    while ($row = $r->fetch_assoc()) echo $row['Field'] . " (" . $row['Type'] . ") — default: " . $row['Default'] . "\n";
} else {
    echo "Error: " . $conn->error . "\n";
}
$conn->close();
?>
