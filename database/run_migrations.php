<?php
/**
 * TCAP Database Migration Runner
 * 
 * This script safely runs database migrations without affecting existing data.
 * It checks if tables/columns exist before creating them.
 * 
 * Usage: php run_migrations.php [host] [username] [password] [database]
 * Example: php run_migrations.php localhost root password u555641943_tcap
 */

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get database credentials from command line or use defaults
$host = $argv[1] ?? 'localhost';
$username = $argv[2] ?? 'root';
$password = $argv[3] ?? '';
$database = $argv[4] ?? 'u555641943_tcap';

echo "==============================================\n";
echo "TCAP Database Migration Runner\n";
echo "==============================================\n\n";

// Connect to database
try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✓ Connected to MySQL server\n";
} catch (PDOException $e) {
    die("✗ Connection failed: " . $e->getMessage() . "\n");
}

// Create database if not exists
try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✓ Database '$database' ready\n";
} catch (PDOException $e) {
    die("✗ Database creation failed: " . $e->getMessage() . "\n");
}

// Select database
$pdo->exec("USE `$database`");
echo "✓ Using database '$database'\n\n";

// Function to run SQL file
function runSqlFile($pdo, $filePath, $description) {
    echo "Running: $description\n";
    echo str_repeat("-", 50) . "\n";
    
    if (!file_exists($filePath)) {
        echo "✗ File not found: $filePath\n\n";
        return false;
    }
    
    $sql = file_get_contents($filePath);
    
    // Split SQL by semicolons but be careful with triggers/procedures
    $statements = array_filter(array_map('trim', explode(';', $sql)));
    
    $success = 0;
    $skipped = 0;
    $failed = 0;
    
    foreach ($statements as $statement) {
        if (empty($statement)) continue;
        
        try {
            $pdo->exec($statement);
            $success++;
        } catch (PDOException $e) {
            $errorMsg = $e->getMessage();
            
            // Check for common "already exists" errors
            if (strpos($errorMsg, 'already exists') !== false ||
                strpos($errorMsg, 'Duplicate entry') !== false) {
                echo "  ⚠ Skipped (already exists): " . substr($statement, 0, 50) . "...\n";
                $skipped++;
            } else {
                echo "  ✗ Failed: " . $errorMsg . "\n";
                $failed++;
            }
        }
    }
    
    echo "  ✓ Success: $success | ⚠ Skipped: $skipped | ✗ Failed: $failed\n\n";
    return $failed === 0;
}

// Run Phase 1: Setup existing tables
echo "PHASE 1: Setting up existing tables\n";
echo str_repeat("=", 50) . "\n";
$phase1 = runSqlFile($pdo, __DIR__ . '/migration_001_setup_existing.sql', 'Existing Schema Setup');

// Run Phase 2: Add new tables
echo "PHASE 2: Adding new tables\n";
echo str_repeat("=", 50) . "\n";
$phase2 = runSqlFile($pdo, __DIR__ . '/migration_002_new_tables.sql', 'New Tables Migration');

// Summary
echo "\n==============================================\n";
echo "Migration Summary\n";
echo "==============================================\n";

if ($phase1 && $phase2) {
    echo "✓ All migrations completed successfully!\n";
    
    // Show current table status
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "\nCurrent tables in database:\n";
    foreach ($tables as $table) {
        $count = $pdo->query("SELECT COUNT(*) FROM `$table`")->fetchColumn();
        echo "  • $table ($count records)\n";
    }
    
    exit(0);
} else {
    echo "⚠ Some migrations had issues. Check the logs above.\n";
    exit(1);
}
