<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
echo "PHP_OK\n";
\$conn = new mysqli('localhost', 'u555641943_tcap', 'Kw4kN#uqnW.#KJw', 'u555641943_tcap');
if (\$conn->connect_error) echo "FAIL: " . \$conn->connect_error;
else echo "SUCCESS";
?>
