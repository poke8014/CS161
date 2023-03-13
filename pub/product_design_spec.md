**Team:** Codescapes<br/>
**Members:** Luc Tang and Miguel Vazquez<br/>
**Project:** Audiovision<br/>

## Market Space:
This project is a web app designed for users looking to get into audiovisual design or users looking for visuals for music. Since the project is focused on user customization, the general use of the app will be to explore different visual patterns for an audio file that a user chooses.

## Features:
- Login / Signup
- Upload audio
- Select audio
- Create visualization from audio
- Select from variety of visualization patterns
- Customize visualization
- Download visualization with audio

## Functional specifications:
1. User Registration
    Entry conditions:
    - User opens registration page
    - User doesn’t have another account logged in
	Exit conditions:
    - User successfully registers OR
    - User cancels registration
	Flow:
    - User enters email address
    - User chooses a password
    - User clicks submit button

2. User Login
    Entry conditions:
    - User opens login page
    - User doesn’t have another account logged in
	Exit conditions:
    - User successfully logs in OR
    - User cancels login
	Flow:
    - User enters login information
    - User clicks submit button

3. User uploads audio
    Entry conditions:
    - User opens main page
    - User has an mp3 file
	Exit conditions:
    - User successfully uploads file
	Flow:
    - User drags mp3 file to designated area
    - User drops the file
    - User clicks upload button
        *OR*
    - User clicks select a file button
    - User chooses mp3 file from their system
    - User clicks upload button

4. User creates visualization
    Entry conditions:
    - User has an mp3 file selected or uploaded
	Exit conditions:
    - User exits page
	Flow:
    - User selects uploaded mp3 file
    - User selects visual pattern
    - User clicks visualize button
    - User customizes parameters in side menu (optional)

5. User downloads visualization
    Entry conditions:
    - User is logged in
    - User has a created a visualization
	Exit conditions:
    - User successfully downloads video file
	Flow:
    - User clicks download button
    - File appears in user’s downloaded directory


## Database ER Diagram:



## Testing plans:
1. User registration
    - Enter information into registration page
    - Check to see if user information is in database
2. User login
    - Enter information into login page
    - Check if password encryption and decryption match
    - Check if user information is displayed 
3. Audio upload
    - Upload audio file
    - Check to see if file is in S3
    - Check to see if S3 link can play the uploaded audio
4. Visualization creation
    - Test visualization with local audio file
    - Check to see if selecting audio file changes audio file in code
    - Check to see if customizing parameters on the front-end changes parameters in code
5. Visualization download
    - Verify video file download onto local system
    - Check if visual and audio are synchronized

## Milestones:
M1: Set up front-end
- Login page
- Upload page
- Visualization page

M2: Set up back-end
- MongoDB Connection
- Amazon S3 Connection

M3: Connect front and back-end
- Login / Register page
    - Creates and gets user
- Upload page
    - Uploaded file is stored

M4: Implement visuals
- Create multiple audio visual sketches

M5: Complete main functionality
- Implement front-end customization of parameters for visuals
- Download visual
