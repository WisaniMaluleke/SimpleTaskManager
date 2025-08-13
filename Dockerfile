FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libicu-dev libonig-dev libxml2-dev curl \
    && docker-php-ext-install zip intl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP MongoDB extension
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js & npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Working directory
WORKDIR /var/www/html

# Safe directory for git
RUN git config --global --add safe.directory /var/www/html

# Install Laravel if not already present
RUN if [ ! -f composer.json ]; then composer create-project laravel/laravel . ; fi

# Install PHP dependencies (including MongoDB package)
RUN composer install \
    && composer require jenssegers/mongodb

# Install Breeze & frontend scaffolding
RUN composer require laravel/breeze --dev \
    && php artisan breeze:install vue

# Install Node modules & build assets
RUN npm install --legacy-peer-deps \
    && npm run build

# Generate Laravel app key
RUN php artisan key:generate

# Permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 8000

# Start Laravel dev server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
