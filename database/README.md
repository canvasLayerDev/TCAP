# TCAP Database Setup & Migration Guide

## Overview

This directory contains safe migration scripts to setup and extend the TCAP database without affecting existing data.

## Current Database State (from SQL dump)

### Existing Tables
1. **`tbl_blog`** - Blog posts (empty)
2. **`tbl_consultation`** - Consultation form submissions (2 records)
3. **`tbl_pages_seo`** - SEO metadata for pages (8 pages)

### Existing Data
- 2 consultation records (Nikita Borkar, Sai Ram)
- 8 SEO page configurations (home, about, blog, product, partner, contact, career)

## Migration Files

### Phase 1: `migration_001_setup_existing.sql`
Sets up the existing database schema with all current data preserved.
- Uses `CREATE TABLE IF NOT EXISTS` (safe for existing data)
- Uses conditional inserts to avoid duplicates
- Maintains all existing consultation and SEO records

### Phase 2: `migration_002_new_tables.sql`
Adds new tables for features needing database support:

| New Table | Purpose | Records |
|-----------|---------|---------|
| `tbl_career_applications` | Job/internship applications | 0 |
| `tbl_partner_applications` | Partnership inquiries | 0 |
| `tbl_products` | Investment products catalog | 3 (default) |
| `tbl_contact_messages` | Contact form submissions | 0 |
| `tbl_users` | Admin authentication (future) | 0 |
| `tbl_activity_log` | Audit trail (future) | 0 |

## How to Run Migrations

### Option 1: Using PHP Script (Recommended)
```bash
cd /Volumes/Seagate/AdGrowTech/Tcap/database
php run_migrations.php [host] [username] [password] [database]

# Example:
php run_migrations.php localhost root mypassword u555641943_tcap
```

### Option 2: Manual SQL Import
```bash
# Step 1: Setup existing tables
mysql -u username -p database_name < migration_001_setup_existing.sql

# Step 2: Add new tables
mysql -u username -p database_name < migration_002_new_tables.sql
```

### Option 3: Using phpMyAdmin
1. Select your database
2. Go to "Import" tab
3. Choose `migration_001_setup_existing.sql` first
4. Then import `migration_002_new_tables.sql`

## Safety Features

All migration scripts use:
- ✅ `CREATE TABLE IF NOT EXISTS` - Won't overwrite existing tables
- ✅ `INSERT IGNORE` or conditional inserts - Won't duplicate data
- ✅ No `DROP TABLE` statements - Won't delete existing data
- ✅ No `ALTER TABLE DROP COLUMN` - Won't remove existing columns

## After Migration

### Verify Tables
```sql
SHOW TABLES;
```

Expected result: 9 tables total
```
tbl_activity_log
tbl_blog
tbl_career_applications
tbl_consultation
tbl_contact_messages
tbl_pages_seo
tbl_partner_applications
tbl_products
tbl_users
```

### Verify Data
```sql
-- Check existing data preserved
SELECT COUNT(*) FROM tbl_consultation;  -- Should show 2
SELECT COUNT(*) FROM tbl_pages_seo;     -- Should show 8

-- Check new tables
SELECT COUNT(*) FROM tbl_products;      -- Should show 3
```

## Backend API Integration

The PHP backend in `TCAP Admin/Backend/` currently uses:
- `tbl_blog` - Blog CRUD operations
- `tbl_consultation` - Consultation form management
- `tbl_pages_seo` - SEO metadata (read-only via frontend)

### New API Endpoints Needed
For new tables, add these controller methods to `Welcome.php`:

1. **Career Applications**
   - `add_career_application()`
   - `list_career_applications()`
   - `update_career_status()`

2. **Partner Applications**
   - `add_partner_application()`
   - `list_partner_applications()`
   - `update_partner_status()`

3. **Products**
   - `add_product()`
   - `list_products()`
   - `update_product()`
   - `delete_product()`

4. **Contact Messages**
   - `add_contact_message()`
   - `list_contact_messages()`
   - `mark_message_read()`

## Rollback (If Needed)

To rollback new tables only (keeping existing data):
```sql
DROP TABLE IF EXISTS tbl_career_applications;
DROP TABLE IF EXISTS tbl_partner_applications;
DROP TABLE IF EXISTS tbl_products;
DROP TABLE IF EXISTS tbl_contact_messages;
DROP TABLE IF EXISTS tbl_users;
DROP TABLE IF EXISTS tbl_activity_log;
```

**Note:** Do NOT drop `tbl_blog`, `tbl_consultation`, or `tbl_pages_seo` as they contain production data.
