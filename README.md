# Blog API

## Description

A simple RESTful API for managing blog posts. This API allows users to create, read, update, and delete blogs. It also supports user authentication, comment management, and categorizing blogs.

---

## Table of Contents

1. [Project Setup Instructions](#project-setup-instructions)
2. [API Endpoints](#api-endpoints)
3. [Team Member Contributions](#team-member-contributions)

---

## Project Setup Instructions

### Prerequisites

- Node.js (version 18.x or above)
- MongoDB
- Postman or Thunder Client for API testing

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/blog-api.git
    ```
    
2. Install dependencies:
    ```bash
    cd blog-api
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory with the following content:
    ```bash
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

4. Start the server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

---

## API Endpoints

### **Authentication**

- **POST /api/auth/register**  
  - Register a new user.
  - Request body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /api/auth/login**  
  - Login an existing user and receive a JWT token.
  - Request body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### **Users (Admin)**

- **GET /api/users**  
  - Get all users (admin only).

- **GET /api/users/:id**  
  - Get specific user by ID.

- **PUT /api/users/:id**  
  - Update a user's information (own account or admin only).

- **DELETE /api/users/:id**  
  - Delete a user (admin only).

### **Categories**

- **GET /api/categories**  
  - Get all categories.

- **POST /api/categories**  
  - Create a new category (admin only).
  - Request body:
    ```json
    {
      "name": "Category Name"
    }
    ```

- **GET /api/categories/:id**  
  - Get a specific category by ID.

- **PUT /api/categories/:id**  
  - Update a category (admin only).
  - Request body:
    ```json
    {
      "name": "Updated Category Name"
    }
    ```

- **DELETE /api/categories/:id**  
  - Delete a category (admin only).

### **Blogs**

- **GET /api/blogs**  
  - Get all blogs.

- **GET /api/blogs/:id**  
  - Get a specific blog by ID.

- **POST /api/blogs**  
  - Create a new blog (authenticated authors only).
  - Request body:
    ```json
    {
      "title": "Blog Title",
      "content": "Blog Content",
      "category": "Category ID",
      
    }
    ```

- **PUT /api/blogs/:id**  
  - Update a blog (author or admin only).
  - Request body:
    ```json
    {
      "title": "Updated Title",
      "content": "Updated Content",
      "category": "Category ID",
      
    }
    ```

- **DELETE /api/blogs/:id**  
  - Delete a blog (author or admin only).

- **GET /api/blogs/category/:categoryId**  
  - Get blogs by a specific category.

- **POST /api/blogs/:id/comments**  
  - Add a comment to a blog.
  - Request body:
    ```json
    {
      "text": "Your comment here"
    }
    ```

---

## Team Member Contributions

- **Micheal Angelo**  
  - Authenticated routes and user management.
  - Blog creation and deletion logic.
 
  - **Ngenzi Cian**
  - commenting section
  - documenting API
  - Modulating Routes and middlewares



