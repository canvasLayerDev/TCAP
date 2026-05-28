<?php
\$host = '127.0.0.1';
\$user = 'u555641943';
\$pass = 'm*f_Z6\$I&L2[';
\$db   = 'u555641943_tcap';
\$mysqli = new mysqli(\$host, \$user, \$pass, \$db);
if (\$mysqli->connect_error) die(\$mysqli->connect_error);
\$res = \$mysqli->query("SHOW COLUMNS FROM tbl_pages_seo");
while(\$row = \$res->fetch_assoc()) echo \$row['Field'] . "\n";
\$mysqli->close();
?>
