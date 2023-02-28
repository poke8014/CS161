# Audiovision Backend Setup Documentation

This document provides step-by-step instructions for setting up the Audiovision web app.

## Prerequisites

    node.js
    npm
    API keys for backend testing (optional)

# Installation

1. Clone the Audiovision repository from Github using the following command:

        `git clone https://github.com/poke8014/CS161.git`

2. Change your working directory to `dev` in the project root:

3. Change your working directory to `config`

4. Create a config.json file using the template config.example.json file.

4. Fill in the required API keys in the config.json file.

5. Return to the `dev` folder

6. Install dependencies by running the following command:

        `npm i`

# Running the app

Start the app with the following command:

    `npm run start`

The server should now be running on http://localhost:8000 and the front-end will be running on http://localhost:3000.
___
# Testing MongoDB API calls

## Prerequisites
    
    REST Client extension (Visual Studio Code)
    
Although there are other ways to test API calls, we will demo how to test API Calls using VS Code's REST Client extension.

## API Testing Setup

1. Create a file called route.rest in the dev folder

2. Setup the file as shown below

3. Click send request shown above API call in rest file 

```
# getting all users in database
GET http://localhost:8000/users

###

# getting user by ID
GET http://localhost:8000/users/[userID]

###

# adding new user
# email must be unique!
POST http://localhost:8000/users/signup
Content-Type: application/json

{
    "email": "example@example.com",
    "password": "password"
}

###

# deleting user by ID
DELETE http://localhost:8000/users/[userID]

###

# updating user information
PATCH http://localhost:8000/users/[userID]
Content-Type: application/json

{
    "email": "example@yahoo.com"
}
```
## API Testing Notes
- Each API call must be separated with three hashtags
- Insert user ID in database in place of [userID]
___
You have now successfully set up the Audiovision. To test server API calls, please contact @poke8014 or @MiguelVazB for the API key. If you encounter any issues during the setup process, please create an issue in the repository.
