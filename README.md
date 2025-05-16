# General information

This is my project for the COMP.SEC.300(Secure programming) course at Tampere University. It represents a minimalistic web application with the basic CRUD functionality of a social media platform.

Users can: 

    Create & delete posts

    like/remove like from posts

    Write comments under specific posts
    
    Delete their own profiles

## Technologies used

The project is built with ReactJS for the front end and Node+Express for the backend with a mongo database. It is a classic MERN stack application. 

For the design part, bootstrap was utilized to speed up the process and ensure a somewhat mobile-friendly responsive UI.

Since the application is not hosted publicly anywhere, docker has been utilized to ensure cross-system comaptibility for the application.

## Running the application

Make sure that you have docker and docker compose installed before running that command. Also make sure that the docker daemon is running before executing the command!


Open terminal in the directory you wish to cloen the project in and run:

`git clone https://github.com/MartinYordanov374/SecureProgrammingProject.git`

Then in the folder that was created after executing the above command, run this command:


`docker-compose up --build`

Navigate to the IPv4 address you specified for the **ORIGIN** or **REMOTE_ORIGIN** variable in the .env file on your browser with the port you specified for the frontend and explore the application. 

## Instructions on how to run the application
Note that your root folder is the folder which was created after you executed `git clone https://github.com/MartinYordanov374/SecureProgrammingProject.git` successfully.

The structure should look like so:
```
├── COMP.SEC.300-Presentation.pdf
├── README.md
├── Secure-Programming-Report-Official.pdf
├── docker-compose.yml
├── package-lock.json
├── package.json
├── .env
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── Backend
    │   ├── Dockerfile
    │   ├── Express
    │   │   └── server.js
    │   ├── Mongo
    │   │   ├── Mongoose
    │   │   │   └── mongoose.js
    │   │   └── Schemas
    │   │       ├── Post.js
    │   │       └── User.js
    │   ├── Services
    │   │   ├── PostService.js
    │   │   └── UserService.js
    │   └── Utilities
    │       └── Messages.js
    ├── Frontend
    │   ├── Components
    │   │   ├── CreatePostField
    │   │   │   ├── CreatePost.jsx
    │   │   │   ├── CreatePostStyles.css
    │   │   │   ├── CreatePostStyles.css.map
    │   │   │   └── CreatePostStyles.scss
    │   │   ├── Error
    │   │   │   └── Error.jsx
    │   │   ├── HOCs
    │   │   │   ├── withAuth.js
    │   │   │   └── withGuest.js
    │   │   ├── Home
    │   │   │   └── Home.jsx
    │   │   ├── Login
    │   │   │   ├── Login.jsx
    │   │   │   ├── LoginStyles.css
    │   │   │   ├── LoginStyles.css.map
    │   │   │   └── LoginStyles.scss
    │   │   ├── Navbar
    │   │   │   └── Navbar.jsx
    │   │   ├── Post
    │   │   │   ├── Post.jsx
    │   │   │   ├── PostStyles.css
    │   │   │   ├── PostStyles.css.map
    │   │   │   └── PostStyles.scss
    │   │   ├── Profile
    │   │   │   └── Profile.jsx
    │   │   └── Register
    │   │       └── Register.jsx
    │   ├── Dockerfile
    │   └── Hooks
    │       └── useAuth.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js
```


Create a .env file in the root folder with the following variables.

Nore that the values below are only exemplary and for instruction's sake. 

They are not meant to be copy-pasted.


```
**SESSION_SECRET**={your secret}

**SERVER_PORT**=5001

**FRONTEND_PORT**=3000

**REACT_APP_BACKEND_ADDRESS**=http://192.168.50.213:5001

**ORIGIN**=http://127.0.0.1:3000

**REMOTE_ORIGIN**=http://192.168.50.213:3000

**MONGO_AUTH_ADMIN_USERNAME**=admin

**MONGO_AUTH_ADMIN_PASSWORD**=samplepassword

**MONGOOSE_CONNECTION_STRING**=mongodb://admin:samplepassword@192.168.50.213:27017/seprodb?authSource=admin
```


You can obtain your REMOTE_ORIGIN address by executing `ipconfig` in CMD if you are using **windows** or `ifconfig` if you are using a common **LINUX** distribution or **OSX**.
It should be your "inet" address on mac for the "en0" interface. Same for the most common Linux distributions.
If you are using windows, open CMD or Powershell and write "ipconfig", look for your "IPv4 Address" on your "Wireless LAN adapter Wi-Fi". This is your address.

Use that same address for **REACT_APP_BACKEND_ADDRESS**, **REMOTE_ORIGIN** and **MONGOOSE_CONNECTION_STRING**.

Make sure to access the application in your browser on the address specified in **ORIGIN** in the .env file, otherwise CORS issues would arise.

In case you have an issue with the some of the ports, try changing them.

Please note that **ORIGIN** and **REMOTE_ORIGIN** exist because during the testing, virtual machines as well as other physical devices owned entirely by the author of the project were utilized as to mimic a real-world scenario as best as I could, hence the **origin** and **remote origin** variables. 

Sample .env file with example values and how I accessed the web applicaiton based on them:

```
**SESSION_SECRET**=1010010101010

**SERVER_PORT**=5001

**FRONTEND_PORT**=3000

**REACT_APP_BACKEND_ADDRESS**=http://192.168.50.213:5001

**ORIGIN**=http://127.0.0.1:3000

**REMOTE_ORIGIN**=http://192.168.50.213:3000

**MONGO_AUTH_ADMIN_USERNAME**=admin

**MONGO_AUTH_ADMIN_PASSWORD**=samplepassword

**MONGOOSE_CONNECTION_STRING**=mongodb://admin:samplepassword@192.168.50.213:27017/seprodb?authSource=admin
```

Based on that .env file, you should navigate to ```http://127.0.0.1:3000``` on your browser. This is where the application should be hosted if the specified port(3000) is not taken by another process on your machine.

Please note that the **MONGO_AUTH_ADMIN_USERNAME**, **MONGO_AUTH_ADMIN_PASSWORD**, **REMOTE_ORIGIN**(excluding the port) are all a part of the **MONGOOSE_CONNECTION_STRING**.
Please also note that in case of changing the port values in the **REACT_APP_BACKEND_ADDRESS**, **REMOTE_ORIGIN** and **ORIGIN** variables in the .env, you have to also be changing the port variables in **REACT_APP_BACKEND_ADDRESS**, **ORIGIN**, and **REMOTE_ORIGIN**. 
Use the **SERVER_PORT** for **REACT_APP_BACKEND_ADDRESS** and **FRONTEND_PORT** for the **ORIGIN**, and **REMOTE_ORIGIN** variables respoectfull.
For instance, if your **SERVER_PORT** is 5001, the port in your **REACT_APP_BACKEND_ADDRESS** should also be 5001, e.g.

```
**SERVER_PORT**=5001
**REACT_APP_BACKEND_ADDRESS**=http://192.168.50.213:**5001**
```

```
**FRONTEND_PORT**=3000
**ORIGIN**=http://127.0.0.1:**3000**
**REMOTE_ORIGIN**=http://192.168.50.213:**3000**
```

I hope that this is clear enough. 

If the course staff runs into any issues while attempting to run the project, contact me at martin.yordanov@tuni.fi 





