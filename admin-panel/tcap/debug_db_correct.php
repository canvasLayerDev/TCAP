<?php
\$conn = new mysqli('localhost', 'u555641943_tcap', 'Kw4kN#uqnW.#KJw', 'u555641943_tcap');
if (\$conn->connect_error) {
    die("Conn failed: " . \$conn->connect_error);
}
\$res = \$conn->query("SHOW COLUMNS FROM tbl_pages_seo");
if (\$res) {
    while(\$row = \$res->fetch_assoc()) echo \$row['Field'] . "\n";
} else {
    echo "ERROR: " . \$conn->error;
}
\$conn->close();
?>
