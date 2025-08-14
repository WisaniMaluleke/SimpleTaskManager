FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libicu-dev libonig-dev libxml2-dev curl pkg-config libssl-dev \
    && docker-php-ext-install zip intl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP MongoDB extension (with SSL enabled)
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Node.js & npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /var/www/html

# Configure Git safe directory
RUN git config --global --add safe.directory /var/www/html

# Copy Laravel project files
COPY . .

# Install Laravel dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && composer require jenssegers/mongodb

# Install Breeze & frontend scaffolding
RUN composer require laravel/breeze --dev \
    && php artisan breeze:install vue

# Install Node modules & build assets
RUN npm install --legacy-peer-deps \
    && npm run build

# Generate Laravel app key
RUN php artisan key:generate

# Drop sessions index if exists (ignore error if not present)
RUN php artisan db:drop-sessions-index || true

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose Laravel dev server port
EXPOSE 8000

# Start Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
