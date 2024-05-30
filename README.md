# KRYPTON SECURE

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
- **Email Service:** ElasticEmail
- **Authentication:** JSON Web Tokens (JWT), OTP
- **Caching:** Redis or in-memory storage for OTP
- **File Handling:** Multer (for file uploads)

## Setup and Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/kryptoniteapp.git
   cd kryptoniteapp
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the required environment variables (see [Environment Variables](#environment-variables)).

4. **Run the application:**

   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/kryptoniteapp
JWT_SECRET=your_jwt_secret
EMAIL_API_KEY=your_elasticemail_api_key
EMAIL_FROM=your_email@example.com
REDIS_URL=redis://localhost:6379
```

## API Endpoints

### Authentication

#### Register

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user and send a confirmation email.
- **Body Parameters:**
  - `email` (string): User's email address.
  - `password` (string): User's password.

#### Login (Step 1)

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Start the login process by sending an OTP to the user's email.
- **Body Parameters:**
  - `email` (string): User's email address.

#### Verify OTP (Step 2)

- **URL:** `/auth/verify-otp`
- **Method:** `POST`
- **Description:** Verify the OTP and issue a JWT token.
- **Body Parameters:**
  - `email` (string): User's email address.
  - `otp` (string): One-time password sent to the user's email.

### File Uploads

#### Generate API Key

- **URL:** `/api/key`
- **Method:** `POST`
- **Description:** Generate a new API key for file uploads.
- **Headers:** `Authorization: Bearer <token>`

#### Upload Image

- **URL:** `/api/upload`
- **Method:** `POST`
- **Description:** Upload an image file using the API key.
- **Headers:** `x-api-key: <API_KEY>`
- **Body Parameters:**
  - `image` (file): Image file to be uploaded.

## Usage

1. **User Registration and Confirmation:**

   - Register a new user by sending a `POST` request to `/auth/register`.
   - A confirmation email will be sent to the user's email address.

2. **Login with 2FA:**

   - Start the login process by sending a `POST` request to `/auth/login` with the user's email.
   - An OTP will be sent to the user's email.
   - Verify the OTP by sending a `POST` request to `/auth/verify-otp`.

3. **File Uploads:**
   - Generate an API key by sending a `POST` request to `/api/key` with the JWT token in the `Authorization` header.
   - Upload an image by sending a `POST` request to `/api/upload` with the API key in the `x-api-key` header.

## Coding Style and Design

- Follow RESTful API principles for structuring endpoints.
- Use classes for services and controllers.
- Ensure clear separation of concerns and modular design.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For further information, feel free to contact:

**Uchenna Darlington Dirichi**  
Email: [uchexdhalitin@gmail.com](mailto:uchexdhalitin@gmail.com)  
LinkedIn: [linkedin.com/in/dhalintin](https://www.linkedin.com/in/dhalintin)
