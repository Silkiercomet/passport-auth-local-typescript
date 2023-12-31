# passport-auth-local-typescript

This API provides endpoints for user authentication and authorization.

## Prerequisites

- Node.js (version X.X.X)
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Silkiercomet/passport-auth-local-typescript
   ```

2. Install dependencies:

cd passport-auth-local-typescript
npm install

3. Set up environment variables:

create a .env and update the values with your configuration it takes the value for your mongo database access and the seet of the bcrypt token

PORT=3001
MONGO_URL={mongo URL}
JWT={seet for bcrypt and session secret}

4. Start the server: 

by running the command
   ```bash
   npm start
   ```

# API Documentation

## Endpoints

### Auth

* POST /api/auth/signup: Register a new user.
* POST /api/auth/login: Log in a user.

### Protected Routes

The following routes require authentication:

* POST /api/auth/logout: Log out the currently logged-in user.
* GET /api/auth/protected-route