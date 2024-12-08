
## PROJECT NAME: HUProjectFinal.JS ##

# Description:
-   This project is a backend service built with Node.js,
    Express, and MongoDB. It provides authentication and authorization features, user management, and movie card management.

# Features
-   User registration and login with JWT-based authentication.
-   Role-based access control (Admin,  User).
-   CRUD operations
-   Data validation using Joi.

# Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Joi
- Bootstrap
- react
- css

# Setup and Installation
- Prerequisites
    - Node.js
    - MongoDB
- Installation
    1. Install dependencies:
        - npm install
    2. Seed the database:
        If you want to seed the database with initial 'data', you can run the script provided in the data folder:
            node data/data.js
    3. Start the server:
         npm start
         - The server will start on the port defined in the '.env' file (default is 3000).
# API Endpoints
1. Authentication
    - Register: 'POST/api/auth/register'
    - Login: 'POST/api/auth/login'
    - My Profile: 'GET/api/auth/my-profile'
2. Users
    - Get All Users: 'GET /api/users'
    - Get User By ID: 'GET /api/users/:id'
    - Create New User: 'POST /api/users'
    - Update User By ID: 'PUT /api/users/:id'
    - Delete User By ID: 'DELETE /api/users/:id'
3. Movies
    - Get All Movies: 'GET /api/movies'
    - Get Movie By ID: 'GET /api/movies/:id'
    - Create New Movie: 'POST /api/movies'
    - Update Movie By ID: 'PUT /api/movies/:id'
    - Delete Movie By ID: 'DELETE /api/movies/:id'
4. Reviews
    - Create New Reviewe: 'POST /api/reviewes'
    - Update Reviewe By ID: 'PUT /api/reviewes/:id'
    - Delete Reviewe By ID: 'DELETE /api/reviewes/:id'


# Folder Structure

    ├── controllers
    │   ├── authControllers.js
    │   ├── userControllers.js
    │   └── cardsControllers.js
    ├── data
    │   └── data.js
    ├── models
    │   ├── User.js
    │   └── Movie.js
    │   └── Review.js
    ├── routes
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   └── movieRoutes.js
    │   └── reviewRoutes.js
    ├── schemas
    │   ├── usersSchema.js
    │   └── moviessSchema.js
    │   └── reviewssSchema.js
    ├── .env
    ├── app.js
    ├── server.js
    ├── package.json
    └── README.md

# Usage
- Register a New User
    - To register a new user, send a POST request to /api/auth/register with the following JSON body:
    {
  "name": {
    "first": "John",
    "middle": "Doe",
    "last": "Smith"
  },
  "email": "john@example.com",
  "password": "Password123!",

}

- Login
    To log in, send a POST request to '/api/auth/login' with the following JSON body:
    {
    "email": "john@example.com",
    "password": "Password123!"
    }

- View Profile
    To view the logged-in user's profile, send a GET request to '/api/auth/my-profile' with the JWT token in the 
    x-auth-token header.

- edit profile
    user can edit its own profile

- Add Movie
    register user cad add a new movie and delete it

- edit movie
    a user can edit only its own movies (from the movie page)

- delete movie
    user + admin
    user can delete only movies created by him

- Add new review

- Edit reviw
    user can edit only ts own reviews

user can view its Favorites/Movies created by him / all movies