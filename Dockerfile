FROM php:8.1-fpm

# Met à jour les paquets et installe les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    git \
    unzip

# Configure et installe les extensions PHP nécessaires
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo pdo_mysql \
    && docker-php-ext-install pdo_pgsql

# Définit le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Copie le projet dans le conteneur
COPY my_ecommerce_project/ /var/www/html/
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installe les dépendances avec Composer si composer.json existe
RUN test -f /var/www/html/composer.json && composer install || echo "composer.json not found"

# Expose le port 9000 et lance php-fpm
EXPOSE 9000
CMD ["php-fpm"]
