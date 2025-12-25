# Welcome to our Orbit App 👋
Orbit is a mobile application that allows users to create an account, log in, and view user information on the home screen.

# Requirement

* Node 20+
* Xcode - latest version
* Cocoapods
* JDK
* Android

# Build

To test on an simlulator you can run the following commands.

1. npm install
2. cd ios && pod install
3. Execute npm run ios in your terminal to open iOS simulator or npm run android to open Android.

# Implemented features

1. Sign up Screen

This is screen where user can create account in order to login into this application. User must enter the required fields such as Name, Email and Password before clicking on "Sign up" button. Once the account is successfully created, user will be redirected to the login screen.

2. Login Screen

In this screen, user is required to enter their registered email and password. The entered credentials are validated based on the user information created during the sign-up process. If the credentials is valid, user will be redirected to home screen. If the credentials are invalid, an appropriate error message is displayed.

3. Home Screen

User will be able to view his/her account details such as name and email. User should be able to logout by clicking the Logout button.

# Design Decisions

The app uses AsyncStorage to persist the authentication state locally.This ensures that users remain logged in even after closing and reopening the app. I have also used useMemo hooks at some places to minimize the rendering when the function is being compute. I have created reusable components such as Button, Header, Text Field, Loader to maintain consistency across the application and reduce code duplication. This approach also makes it easier to implement future design or functional changes, as updates can be made in one place and reflected throughout the app.

# Reference

Video Link - https://youtu.be/ONnaPKomzcU