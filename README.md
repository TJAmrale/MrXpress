# MrXpress Project
## Overview

MrXpress is a web application designed to streamline the phone repair process. We connect users with damaged phones to certified technicians who can carry out the repairs. Whether it's a cracked screen or software issues, we've got you covered!

This project is part of the Western Sydney University's *Professional Experience* course and aims to not just be an academic exercise but a viable market solution.

## Prerequisites

- **PHP**: Ensure you have PHP (>=7.4) installed. Check with `php -v`.
- **Composer**: Dependency Manager for PHP. [Download here](https://getcomposer.org/).
- **Node.js and NPM**: [Download here](https://nodejs.org/).
- **MySQL**: Ensure MySQL is installed and running. Check with `mysql --version`.
- **AWS CLI**: If you're planning to integrate with AWS services. [Installation guide](https://aws.amazon.com/cli/).

## Installation & Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/andrewnguyen-nsw/mrxpress.git
    cd mrxpress
    ```

2. **Backend Setup (Laravel)**:
    ```bash
    composer install
    cp .env.example .env
    php artisan key:generate
    ```

3. **Frontend Setup (React)**:
    ```bash
    cd react
    npm install
    ```
    - Create the `.env` file inside `react` folder, update it:
      ```env
      VITE_API_BASE_URL=http://localhost:8000
      ```

4. **Database Setup**:
    - Create a new MySQL database named `laravel`.
    - Update the `.env` file in your project root with appropriate database connection details:
      ```env
      DB_CONNECTION=mysql
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_DATABASE=laravel
      DB_USERNAME=root
      DB_PASSWORD=your_password_here
      ```

5. **Run Migrations**:
    ```bash
    php artisan migrate
    ```

## Running the Application

1. **Start the Backend Server**:
    ```bash
    php artisan serve
    ```

2. **Start the Frontend Development Server**:
    ```bash
    cd react
    npm run dev
    ```

## Uploading to Github via Terminal
   ```bash
    # Move to your main directory
    cd {root_directory}
    
    # Inatialise Git (if it hasn't been done before)
    git init

    #Link to the repository
    git remote add origin https://github.com/andrewnguyen-nsw/mrxpress

    # Create and switch to a new branch
    git checkout -b {your-branch-name}
    # If Branch is already created then
    git branch -M {your-branch-name}

    # Add all the files in your project to the staging area
    git add .

    # Commit the changes
    git commit -m "type a message here about the changes you made"
    
    # Push to your branch
    git push -u origin {your-branch-name}
   ```

## Features

- **User Authentication**: Secure login and registration.
- **Repair Booking**: Users can book repair services, complete with timeslot selection, just like you would book a food delivery.
- **Technician Register**: Technicians can register, submit credentials for verification, and become part of our trusted network.
- **Admin Panel**: For easy management of users, technicians, and jobs.
- **Payment Gateway Integration**: For secure and easy transactions
- **Ratings and Reviews**: To ensure quality service.
- **Service History**: Users and Technicians can review their past bookings and services rendered.

## Technologies

- Front-end: ReactJS, React-Bootstrap
- Back-end: Laravel
- Database: MySQL

## Roles

- **Users**: Can request phone repairs and track the status of their requests.
- **Technicians**: Can accept repair requests and update status of repairs.
- **Admins**: Can manage all users and technicians and oversee all repair jobs.
- **1 SuperAdmin**: Can manage admins.


## Contributors
- Andrew
- Tejas
- Caitlin
- Faiyaz
- Kevin
