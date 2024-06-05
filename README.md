# KRYPTON SECURE

## You can also view this documentation in here [docs](#features)

KRYPTON SECURE is a backend system for the Krypton app. This app handles user registration with email confirmation, two-factor authentication (2FA) for login, secure image uploads, and access control using API keys.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
   - [File Uploads](#file-uploads)
6. [Usage](#usage)
7. [Coding Style and Design](#coding-style-and-design)
8. [License](#license)

## Features

- **Kryptonian Authentication:**
  - User registration with email confirmation.
  - Login with two-factor authentication (2FA) using OTP sent to email.
- **File Uploads:**
  - API key generation for secure file uploads.
  - Image file uploads without logging in, using an API key.
  - Image validation and storage as Base64 encoded strings in the database.
- **Access Control:**
  - API key required for uploading images.
- **RESTful API:**
  - Structured API endpoints following REST principles.
  - Use of classes for services and controllers.

## Technologies Used

- **Backend Framework:** Node.js with Express
- **Database:** MongoDB
- **Email Service:** SendGrid
- **Caching:** Database
- **File Handling:** Multer (for file uploads)

## Setup and Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Dhalintin/standardization_test.git
   cd standardization_test
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the required environment variables (see [Environment Variables](#environment-variables)).

4. **Run the application:**

   ```sh
   npm run start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379
EMAILPASSWORD=elastic_email_password
EMAILUSERNAME=elastic_emal_username
MAILUSERNAME=sendgrid username
MAILPASSWORD= send grid password
```

## API Endpoints

### Authentication

#### Register

- **URL:** `/api/v1/user/register`
- **Method:** `POST`
- **Description:** Register a new user and send a confirmation email.
- **Body Parameters:**
  - `email` (string): User's email address.
  - `username` (string): Username that should contain a string of at least 3 characters.
  - `password` (string): Password of 8 at least 8 characters which will include uppercase, lowercase and a special character.

#### Login (Step 1)

- **URL:** `/api/v1/user/login`
- **Method:** `POST`
- **Description:** Start the login process by sending an OTP to the user's email.
- **Body Parameters:**
  - `email` (string): User's email address.
  - `password` (string): User's password used at registeration.

#### Verify Email (Step 2)

- **URL:** `/api/v1/user/verify-email`
- **Method:** `POST`
- **Description:** Verify the OTP.
- **Body Parameters:**
  - `email` (string): User's email address.
  - `otp` (string): One-time password sent to the user's email.

### File Uploads

#### Generate API Key

An API key is automatically generated for the user when the mail is verified and sent to email but if user needs another API key but if the user needs another API key, users can generate API key

- **URL:** `/api/v1/user/apikey-gen`
- **Method:** `POST`
- **Description:** Generate a new API key for file uploads.
- **Headers:** `Authorization: Bearer <token>`
- **Body Parameters:**
  - `email` (string): User's email address.

#### Upload Image

- **URL:** `/api/upload`
- **Method:** `POST`
- **Description:** Upload an image file using the API key.
- **Headers:** `Authorization: Bearer <token>`
- **Body Parameters:**
  - `image` (file): Image file to be uploaded.

## Usage

1. **User Registration and Confirmation:**

   - Register a new user by sending a `POST` request to `/user/register`.
   - A confirmation email will be sent to the user's email address.

2. **Login with 2FA:**

   - Start the login process by sending a `POST` request to `/user/login` with the user's email.
   - An OTP will be sent to the user's email.
   - Verify the OTP by sending a `POST` request to `/user/verify-email`.
   - An API key is automatically generated for file upload

3. **File Uploads:**
   - Use API key Generated during Email verification to send a `POST` request to `/upload/image` or generate an API key by sending a `POST` request to `/user/apikey-gen` with the JWT token in the `Authorization` header
   - Upload an image by sending a `POST` request to `/upload/image` with the API key in the `x-api-key` header.

## Coding Style and Design

- Followed RESTful API principles for structuring endpoints.
- Used classes for services and controllers.
- Ensured clear separation of concerns and modular design.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For further information, feel free to contact:

**Uchenna Darlington Dirichi**  
Email: [uchexdhalitin@gmail.com](mailto:uchexdhalitin@gmail.com)  
LinkedIn: [linkedin.com/in/dhalintin](https://www.linkedin.com/in/dhalintin)
