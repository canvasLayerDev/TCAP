<?php
\$conn = new mysqli('127.0.0.1', 'u555641943', 'm*f_Z6\$I&L2[', 'u555641943_tcap');
\$res = \$conn->query("SHOW CREATE TABLE tbl_pages_seo");
if (\$res) {
    echo "TABLE_EXISTS\n";
    \$row = \$res->fetch_row();
    echo \$row[1];
} else {
    echo "TABLE_MISSING: " . \$conn->error;
}
?>
