FROM php:8.1-apache

# Install dependencies and mysqli/pdo_mysql extensions for CodeIgniter database operations
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-install -j$(nproc) mysqli pdo_mysql \
    && a2enmod rewrite

# Update Apache configuration to allow .htaccess overrides
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# We don't COPY here; we will rely on volumes from docker-compose.yml
EXPOSE 80
