CREATE DATABASE mrxpress;
USE mrxpress;
-- DROP DATABASE MRXPRESS;

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone NUMERIC(10) NOT NULL,
    address VARCHAR(150) NOT NULL,
    access_level TINYINT NOT NULL CHECK (access_level >= 1 AND access_level <= 3),
    dob DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE administrators (
    administrator_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (administrator_id) REFERENCES users (user_id)
);

CREATE TABLE customers (
    customer_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES users (user_id)
);

CREATE TABLE technician_form (
    request_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    resume_cv VARCHAR(1000) NOT NULL,
    profile_image MEDIUMBLOB NOT NULL,
    start_timestamp DATETIME NOT NULL,
    end_timestamp DATETIME NULL,
    technician_status ENUM('PENDING', 'APPROVED', 'DECLINED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE technicians (
    technician_id BIGINT NOT NULL,
    profile_image MEDIUMBLOB NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (technician_id) REFERENCES users (user_id)
);

CREATE TABLE brands (
    brand_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE series (
    series_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    series_name VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE devices (
    device_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    brand_id BIGINT NOT NULL,
    series_id BIGINT NOT NULL,
    model VARCHAR(50) NOT NULL,
    colours VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (brand_id) REFERENCES brands (brand_id),
    FOREIGN KEY (series_id) REFERENCES series (series_id)
);

CREATE TABLE parts (
    part_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    part_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE accessories (
    accessory_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    accessory_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE stock (
    stock_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    device_id BIGINT NOT NULL,
    part_id BIGINT NOT NULL,
    buy_price DECIMAL NOT NULL,
    wholesale_price DECIMAL NOT NULL,
    retail_price DECIMAL NOT NULL,
    quantity NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (device_id) REFERENCES devices (device_id),
    FOREIGN KEY (part_id) REFERENCES parts (part_id)
);

CREATE TABLE technician_inventory (
    inventory_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    technician_id BIGINT NOT NULL,
    stock_id BIGINT NOT NULL,
    inventory NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (technician_id) REFERENCES technicians (technician_id),
    FOREIGN KEY (stock_id) REFERENCES stock (stock_id)
);

CREATE TABLE jobs (
    job_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    technician_id BIGINT NULL,
    stock_id BIGINT NOT NULL,
    accessory_id BIGINT,
    job_status ENUM('NEW', 'IN PROGRESS', 'COMPLETED') NOT NULL,
    start_date_time DATETIME NOT NULL,
    update_date_time DATETIME NULL,
    end_date_time DATETIME NULL,
    callout_fee DECIMAL NOT NULL DEFAULT 0,
    total_cost DECIMAL NOT NULL,
    technician_fee DECIMAL NOT NULL,
    admin_fee DECIMAL NOT NULL,
    parts_used NUMERIC NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (technician_id) REFERENCES technicians (technician_id),
    FOREIGN KEY (stock_id) REFERENCES stock (stock_id),
    FOREIGN KEY (accessory_id) REFERENCES accessories (accessory_id)
);

CREATE TABLE technician_ratings (
    rating_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    technician_id BIGINT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (technician_id) REFERENCES technicians (technician_id),
    FOREIGN KEY (job_id) REFERENCES jobs (job_id)
);

CREATE TABLE customer_ratings (
    rating_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    technician_id BIGINT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (technician_id) REFERENCES technicians (technician_id),
    FOREIGN KEY (job_id) REFERENCES jobs (job_id)
);
