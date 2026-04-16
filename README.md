# TCAP Project Documentation & Index

This repository contains the architecture for the **TCAP** Platform. It is divided into three primary components:

## Project Structure

1. **TCAP Main** (`/TCAP Main/`)
   - The primary Frontend web application for visitors.
   - Built with **React + Vite**.
   - Accessible via port **5173** (in Docker).

2. **TCAP Admin** (`/TCAP Admin/`)
   - The internal Administration panel frontend.
   - Built with **React + Vite**.
   - Accessible via port **5174** (in Docker).
   
3. **TCAP Backend API** (`/TCAP Admin/Backend/`)
   - The backend API powering the application.
   - Built with **CodeIgniter 3 (PHP)**.
   - Accessible via port **8080** (in Docker).

4. **Database** (`/database/`)
   - Initialization and migration files for the MySQL database.
   - Includes data schemas and content seeding.
   - The DB container runs on standard port **3306**.

## How to Run (Docker Setup)

This project has been fully containerized. A `docker-compose.yml` file is provided at the root of the project to orchestrate the entire development environment.

### Prerequisites
- Docker Engine / Docker Desktop
- Docker Compose

### Starting the Environment
From the root directory containing the `docker-compose.yml`, start all services by running:

```bash
docker-compose up -d --build
```

### Accessing the Services
Once running, you can access the various services at:
- **Main Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:8080/
- **MySQL DB**: `localhost:3306` (Credentials: `root` / `root` or Local: `u555641943_tcap` / `|n1fPt@jF`)

### Migrations
The database container is set up to automatically run the `migration_001_setup_existing.sql` and `migration_002_new_tables.sql` scripts found in the `database/` folder during its first boot. You may need to run `php run_migrations.php` inside the `database` folder manually if updates are made.
