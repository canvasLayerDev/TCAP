<?php
$host = 'localhost';
$user = 'u555641943_tcap';
$pass = 'Kw4kN#uqnW.#KJw';
$db   = 'u555641943_tcap';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$sql = "ALTER TABLE tbl_blog
  ADD COLUMN IF NOT EXISTS og_title VARCHAR(255) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_description TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS secondary_keywords VARCHAR(500) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(500) DEFAULT NULL;";

if ($conn->query($sql)) {
    echo "Columns added.\n";
    $r = $conn->query("DESCRIBE tbl_blog");
    while ($row = $r->fetch_assoc()) echo $row['Field'] . " — " . $row['Type'] . "\n";
} else {
    echo "Error: " . $conn->error . "\n";
}
$conn->close();
?>
