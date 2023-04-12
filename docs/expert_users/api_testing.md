# Testing API calls

## Prerequisites
    
    Postman

Although there are other ways to test API calls, we will demo how to test API Calls using Postman.

## User API testing

1. Start the Postman desktop or web app and create a workspace.
2. Create a new HTTP request by clicking the plus near the workspace sidebar menu or the [GET] button if you have no tabs open
![http_request](https://github.com/poke8014/CS161/blob/main/docs/app_users/images_docs/http_request.png)

See below for request template

3. Select request type and enter request URL
4. Send request
5. View changes by retrieving all users or by user ID
![postman_request](https://github.com/poke8014/CS161/blob/main/docs/app_users/images_docs/postman_request.png)

```
# Retrieve all users
GET http://localhost:8000/users 

# Retrieve single user
GET http://localhost:8000/users/[userID]

# Create one user
POST http://localhost:8000/users/signup
Content-Type: application/json

{
    "email": "user@email.com",
    "password": "password"
}

# remove user
DELETE http://localhost:8000/users/[userID]

# update user information
PATCH http://localhost:8000/users/[userID]
Content-Type: application/json

{
    "email": "update@email.com"
}

```

### User API Testing Notes
- If information is required, select Body and replace the text body
- Replace [userID] with an existing user's ID in the URL

## Audio file API testing

1. Start the Postman desktop or web app and create a workspace.
2. Create a new HTTP request by clicking the plus near the workspace
3. Select POST and paste this request URL into the text box: http://localhost:8000/audioFiles/uploadAudio
4. Select Body and click the form-data radio button
5. Enter 'audiofile' for the KEY
6. Change the value type to File
![audio_upload](https://github.com/poke8014/CS161/blob/main/docs/app_users/images_docs/audio_upload.png)
7. Select an mp3 file to upload
8. Send request
9. Click on link returned in response with the key 'Location'
___
To run tests, please contact @poke8014 or @MiguelVazB for the API keys. 
