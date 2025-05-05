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
It should be your "inet" address on mac for the "en0" interface. Same for the most common Linux distributions.
If you are using windows, open CMD or Powrshell and write "ipconfig", look for your "IPv4 Address" on your "Wireless LAN adapter Wi-Fi". This is your address.

Use that same address for **REACT_APP_BACKEND_ADDRESS**, **REMOTE_ORIGIN** and **MONGOOSE_CONNECTION_STRING**.

Make sure to access the application in your browser on the address specified in **ORIGIN** in the .env file, otherwise CORS issues would arise.

In case you have an issue with the some of the ports, try changing them.

Please note that **ORIGIN** and **REMOTE_ORIGIN** exist because during the testing, virtual machines as well as other physical devices owned entirely by the author of the project were utilized. 

## Running the application

Make sure that you have docker and docker compose installed before running that command. Also make sure that the docker daemon is running before executing the command!


Open terminal in the directory you wish to cloen the project in and run:

`git clone https://github.com/MartinYordanov374/SecureProgrammingProject.git`

Then in the folder that was created after executing the above command, run this command:


`docker-compose up --build`

Navigate to the IPv4 address you specified for the **ORIGIN** or **REMOTE_ORIGIN** variable in the .env file on your browser with the port you specified for the frontend and explore the application. 
