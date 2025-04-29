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

## Instructions on how to run the application

Create a .env file in the root folder with the following variables.

Nore that the values below are only exemplary and for instruction's sake. 

They are not meant to be copy-pasted.

**SESSION_SECRET**={your secret}

**SERVER_PORT**=5001

**FRONTEND_PORT**=3000

**REACT_APP_BACKEND_ADDRESS**=http://192.168.50.213:5001

**ORIGIN**=http://127.0.0.1:3000

**REMOTE_ORIGIN**=http://192.168.50.213:3000

**MONGO_AUTH_ADMIN_USERNAME**=admin

**MONGO_AUTH_ADMIN_PASSWORD**=samplepassword

**MONGOOSE_CONNECTION_STRING**=mongodb://admin:samplepassword@192.168.50.213:27017/seprodb?authSource=admin

You can obtain your REMOTE_ORIGIN address by executing `ipconfig` in CMD if you are using **windows** or `ifconfig` if you are using a common **LINUX** distribution or **OSX**.

In case you have an issue with the some of the ports, try changing them.

## Running the application

Open terminal in the root directory of the project and run:

`docker-compose up --build`

MAKE SURE THAT THE DOCKER DAEMON IS RUNNING BEFORE EXECUTING THIS COMMAND!

Navigate to the IPv4 local address of your machine on your browser(port 3000) and explore the application.