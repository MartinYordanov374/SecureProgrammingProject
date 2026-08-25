# Secure Social Media Web Application
This project delivers a full stack social media web application built with security-first design principles in mind. It implements core social media functionality, such as real-time notifications, user authentication, post creation and deletion, liking, and commenting.

The project centered on vulnerability assessment and white-box penetration testing, resulting in three vulnerabilities identified, exploited, and remediated.

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Sass](https://img.shields.io/badge/sass-%23CC6699.svg?style=for-the-badge&logo=sass&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Table of Contents

1. [The motivation behind the project](#The-motivation-behind-the-project)
2. [What I strived to achieve and learn through this project](#What-I-strived-to-achieve-and-learn-through-this-project)
3. [Project Features](#Project-Features)
4. [Project Architecture](#Project-Architecture)
5. [Project Structure](#Project-Structure)
6. [Secure Programming Solutions](#Secure-Programming-Solutions)
7. [Vulnerability Assessment](#Vulnerability-Assessment)
8. [Penetration Test](#Penetration-Test)
9. [Getting Started](#Getting-Started)

## The motivation behind the project
I invested months building a solid cybersecurity foundation leading up to this project - university courses, online certifications, and HackTheBox Academy. During the **Secure Programming (COMP.SEC.300)** course at **Tampere University**, I had the perfect opportunity to apply all of that knowledge to my own project. As a result, I earned a great grade while putting the theory into practice.

## What I strived to achieve and learn through this project
- Apply cyber security concepts from university and on-the-side courses to a production-like web application.
- Use OWASP Top 10 as a reference point in the development process.
- Gain hands-on experience with vulnerability assessment tools (Nessus, Trivy, Snyk).
- Understand penetration testing methodology in white-box scenarios.
- Solidify the gained knowledge by a hands-on approach.

## Project Features
### Application Functionality
- User registration and authentication
- Post creation, viewing, and deletion
- Comments on posts
- Likes system
- User profiles with confirmation guards
- Server-side session management

### Security Implementations
- bcrypt password hashing with strength validation
- HTTP-only, SameSite session cookies
- CORS restriction to authorized origins
- IP-based rate limiting (auth, posts, general endpoints)
- MongoDB authentication enforcement
- NoSQL injection prevention (mongo-sanitize)
- Environment variable protection (.gitignore)
- Third-party dependencies vulnerability scanning (npm audit, Dependabot, Snyk, Trivy)

## Project Architecture
The core architecture consists of a Node.js and Express server, MongoDB with schemas for both a user and a post, two services - ```user``` and
```post``` services - and a utility file, called Messages. The high-level diagram below represents the data flow of the application in a simplified manner.

<img width="718" height="725" alt="canvas" src="https://github.com/user-attachments/assets/2895d071-a58f-44dc-bb5e-922b16afdb60" />


The diagram below shows the API and Authentication flow of the application.
<img width="1700" height="989" alt="Screenshot From 2026-08-25 10-00-16" src="https://github.com/user-attachments/assets/940cde32-56ca-4d6d-87c1-4b20296ad4bb" />

### Database
#### The User Schema
The user schema is composed of only two string fields - username and password. Both of which
are required.
```
const UserSchema = new mongoose.Schema({
    username:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})
```
#### The Post Schema
The post schema is composed of five fields - ```postOwner```, ```postBody```, ```postParent```, ```likes```,
```comments```. Note that a comment is a post that has a **postParent field**, hence the reference to
the **post** model in the comment field

```
const PostModel = new mongoose.Schema({
    postOwner:  {
       type: mongoose.Types.ObjectId,
       ref: 'user',
       required: true
    },
    postBody: {
        type: String,
        required: true
    },
    postParent: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: false
    },
    likes:[{
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }],
    comments:[{
            type: mongoose.Types.ObjectId,
            ref: 'post'
        }]
})
```
### Server
The server consists of twelve user and post-related endpoints shown in the **Endpoints** subsection.
#### Endpoints

##### User Endpoints

| Endpoint | Method | Parameters | Description |
|----------|--------|------------|-------------|
| `/user/login` | POST | `username`, `password` (body) | Validates password with regex, creates server-side session if credentials match |
| `/user/register` | POST | `username`, `password` (body) | Checks username availability, hashes password with bcrypt, stores user object |
| `/user/delete/:userID` | DELETE | `userID` (param) | Compares requester's session userID with parameter; deletes profile and associated posts if authorized |
| `/user/isRegistered` | GET | None | Checks active server-side session via HTTP-Only session cookie |
| `/user/get/currentUser` | GET | None | Returns user ID if active session exists |
| `/user/logout` | POST | None | Destroys active server session corresponding to requester's session cookie |

##### Post Endpoints

| Endpoint | Method | Parameters | Description |
|----------|--------|------------|-------------|
| `/post/create` | POST | `postContentId`, `postParentId` (body) | Creates post or comment; `postOwnerId` taken from requester's session |
| `/post/delete/:postId` | DELETE | `postId` (param) | Verifies requester owns the post before deletion to prevent broken auth |
| `/post/like/:postId` | POST | `postId` (param) | Toggles like/unlike on a post using server-side session |
| `/post/getAll` | GET | None | Returns all posts (excluding comments); no authentication required |
| `/post/fetch/:postId` | GET | `postId` (query) | Fetches specific post by ID; no authentication required |
| `/post/fetch/owner/:userID` | GET | `userID` (query) | Fetches all posts by specified user ID; no authentication required |

---
**Password Validation Regex:**

```^(?=.\w)(?=.[A-Z]){1,}(?=.*\W).{8,}$```

It enforces the password to have at least one word character, at least one upper-case letter, at least one special character and have a minimum of 8 characters.

---

### Services
#### User Service

The user service is composed of five functions that the node server relies on - `CreateUser`, `LoginUser`, `DeleteUser`, `IfUserExists`, `IfUserExists_Username`.

| Function | Parameters | Description | Security Notes |
|----------|------------|-------------|----------------|
| `CreateUser` | `username`, `password` | Checks if username exists via `IfUserExists`. Upon success, hashes plaintext password with bcrypt and saves user object to database. Sends response back to API. | Password hashing prevents plaintext exposure |
| `LoginUser` | `username`, `password` | Verifies username exists via `IfUserExists_Username`. Hashes plaintext password and compares to stored hash. On match, creates server session and sends HTTP-Only session cookie to client. | Session cookies are HTTP-Only, JavaScript cannot access them |
| `DeleteUser` | `userID` | Verifies user exists. Deletes all associated posts, then deletes user. Requires requester's session `userID` to match parameter `userID`. | Prevents broken auth by validating session ownership |
| `IfUserExists` | `userID` | Queries database to check if user exists with given ID. Returns boolean and sends user data back to calling API endpoint. | Cannot be called independently; only accessible through login, register, delete endpoints |
| `IfUserExists_Username` | `username` | Works identically to `IfUserExists` but accepts `username` instead of `userID` as parameter. | Same restrictions apply as `IfUserExists` |

**Notes:**
- `IfUserExists` and `IfUserExists_Username` cannot be called independently; they are only callable by login, register, and delete user endpoints.
- The API does not return all user data to the client.
- Sensitive information (like passwords) is always hashed before being sent anywhere.
  
#### Post Service

The post service is composed of six functions - `CreatePost`, `DeletePost`, `LikePost`, `GetPostById`, `GetPostsByUser`, `GetAllPosts`.

| Function | Parameters | Description | Security Notes |
|----------|------------|-------------|----------------|
| `CreatePost` | `postContent`, `ownerId` (session), optional `parentPostId` | Creates a post or comment. Comments have a `parentPostId` field. Fetches parent post first, then adds post to parent's comments array. Regular posts are created without parent reference. | `ownerId` taken from session data |
| `DeletePost` | `requestUserId`, `targetPostId` | Verifies post owner's ID matches requester's ID before deletion. | `userId` passed from session ID; prevents unauthorized deletion |
| `LikePost` | `postId`, `likerId` | Checks if target post exists, then inserts liker ID in the likes array. MongoDB operators treat likes field as a set, so re-clicking removes the like. | Session-based like tracking |
| `GetPostById` | `postId` | Finds post with given ID and returns response with populated fields for `postOwner` and comments. | Returns actual objects instead of ObjectIds |
| `GetPostsByUser` | `userId` | Similar to `GetPostById` but fetches all posts by a user. Excludes posts with `postParent` field (user's comments are not returned). | Returns actual objects instead of ObjectIds |
| `GetAllPosts` | None | Fetches all posts with no `parentPost` field. Population same as `GetPostById`. | No authentication required; public endpoint |


### Docker
Docker has been utilized in this project to ensure cross-platform compatibility and the latest image versions of Node and MongoDB.

Docker Hub is regularly updated with the latest releases of MongoDB and Node images, which are the only images used in this project. When building the project with Docker Compose, all images utilized will be of the latest version compared to the version utilized at the time of building the project.

Docker Compose simplifies running and building the project. Additionally, all containers created with Docker Compose are automatically created on the same Docker network, making it easier to implement communication between containers without writing local IP addresses (or public IPs in the case of deploying the app). Docker Compose services' names must be used instead.

## Project Structure
The project is separated in two modules - frontend and backend.

### Frontend Module
The frontend is built with React and accompanying libraries such as react-bootstrap for responsive and mobile-first design. React-toastify was utilized to provide UI for the real-time notifications upon a websocket event.

#### Components
The frontend consists of eight React functional components: 
1. **CreatePostField** 
2. **Error** 
3. **Home** 
4. **Login**
5. **Register** 
6. **Navbar** 
7. **Post** 
8. **Profile**

#### Higher-Order Components and the Authentication System
The project also features two HOCs - ```withAuth``` and ```withGuest```. 
They are used to implement authentication guards for pages such as the profile page, which is only accessible for registered users.

#### Custom React Hook
Finally, the frontend utilizes a custom React hook called ```UseAuth```. It fetches the
```/user/isRegistered``` endpoint, whose response depends on whether the requesting user
is logged in or not. 
```UseAuth``` is used in the two higher-order components and in the
Home, Navbar, and Post components for conditional rendering

#### Dockerfile
The frontend includes a Dockerfile to build a Docker image and run a container, ensuring cross-platform operability of the project.

### Backend Module
The backend directory contains the following files and sub-directories:

1. **Dockerfile** — Defines the Docker image for deployment.
2. **Express/** — Contains the Express.js server setup.
3. **Mongo/** — Holds MongoDB connection logic, schema definitions for User and Post models.
4. **Services/** — Implements business logic for user and post operations (user service, post service).
5. **Utilities/** — Contains all server-side response messages.

The project tree structure can be seen below:
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
## Secure Programming Solutions

OWASP TOP 10 has been used as a checklist throughout the entire project.

Here are some secure programming solutions that I implemented:

- **IP-Based rate limiters** using `express-rate-limit` were implemented for all backend endpoints, preventing brute force and DoS attacks.

- **Password hashing:** The user passwords are stored as `bcrypt` hashes with a cost factor of 10.

- **Input sanitization and validation:** Applied using `mongo-sanitize` to sanitize the incoming request body and regex is utilized to validate whether a password or username is valid before it is sent to the backend.

- **Server-side sessions:** Were utilized to manage user sessions, minimizing the risk of session hijacking, compared to client-stored sessions. The session cookies are `httpOnly` and `sameSite`, minimizing the risk of CSRF attacks and cookie stealing using JavaScript.

CORS rules were implemented to prevent possible CSRF attacks.

## Vulnerability Assessment

The vulnerability assessment was performed with the following tools:

1. **Tenable Nessus** for automated vulnerability scanning of the web application
2. **Trivy** for vulnerability scanning the Dockerfile-created images
3. **Snyk** for finding vulnerabilities in the project's dependencies
4. **Metasploit** was utilized to search databases of vulnerability exploits in regards to the dependencies of the project
5. **npm audit** was executed to find vulnerabilities within the package.json dependencies

No vulnerabilities were found with Tenable Nessus except for a warning about a missing or permissive http header is a potential attack vector. Nessus also successfully enumerated the MongoDB version, allowing verification against known CVE databases. ExploitDB and Metasploit searches for known MongoDB exploits returned no matches.

However, a single tool cannot be trusted by itself to find or rule out vulnerabilities, as false positives and false negatives exist—thus, more scanning and research were needed.

GitHub's Dependabot was also set up for continuous vulnerability and secret monitoring in the repository.

More detail about the vulnerability assessment can be found in the report.

## Penetration Test
A local-network, white-box penetration test was carried out (April 18-24, 2025), using the following tools:

- **nmap** for port scanning
- **metasploit** for vulnerability exploit searching
- **wireshark** for intercepting network traffic
- **hashcat** for brute-force password attempts
- **postman** for API testing and front-end sanitization bypass attempts

The goal was to find and exploit vulnerabilities from the OWASP TOP 10 list with priority, as well as any other vulnerability discovered during the test.

### Vulnerabilities Found and Exploited

| Vulnerability | Status | Impact |
|---------------|--------|--------|
| Unauthorized database access | Exploited and Remediated | Account takeover (no password cracking needed) |
| Data transmitted over HTTP | Exploited and Remediated | Credential theft via Wireshark |
| NoSQL injection | Discovered and Mitigated | Could not extract sensitive data |

### Vulnerabilities Tested (None Found)

- **Brute-force attacks** — Blocked by rate limiters
- **XSS attacks** — Blocked by React JSX escaping
- **Broken authentication** — Blocked by session ownership validation

All found vulnerabilities were later remediated with documented fixes. More detail regarding the whole process can be found in the report.
### Remediations 


| Vulnerability | Remediation |
|---------------|-------------|
| Unauthorized database access | Docker compose environment variables for MongoDB admin credentials upon container creation |
| NoSQL injection | Input sanitization with `mongo-sanitize` - checks incoming request body values are strings. login/register endpoints fail if object type detected |
| Dependency vulnerabilities | `npm audit fix --force` - updated all vulnerable dependencies |
| CSRF attacks | Added `SameSite` attribute to session cookie configuration—cookie available only in context of the website it was sent to |


## Getting Started

### Prerequisites

Make sure that you have Docker and Docker Compose installed before running that command. Also make sure that the Docker daemon is running before executing the command!

### Installation

1. Open terminal in the directory you wish to clone the project in and run:

```bash
git clone https://github.com/MartinYordanov374/SecureProgrammingProject.git
```

Then in the folder that was created after executing the above command, run this command:

`docker-compose up --build`

Navigate to the IPv4 address you specified for the **ORIGIN** or **REMOTE_ORIGIN** variable in the .env file on your browser with the port you specified for the frontend and explore the application. 

**Note:** Your root folder is the folder which was created after you executed ```git clone https://github.com/MartinYordanov374/SecureProgrammingProject.git``` successfully.

Create a .env file in the root folder with the following variables.

**Note:** The **values** below are only exemplary and for instruction's sake. They are not meant to be copy-pasted.


```
SESSION_SECRET=supertopsecret
SERVER_PORT=5001
FRONTEND_PORT=3000
REACT_APP_BACKEND_ADDRESS=http://192.168.50.213:5001
ORIGIN=http://127.0.0.1:3000
REMOTE_ORIGIN=http://192.168.50.213:3000
MONGO_AUTH_ADMIN_USERNAME=admin
MONGO_AUTH_ADMIN_PASSWORD=samplepassword
MONGOOSE_CONNECTION_STRING=mongodb://admin:samplepassword@192.168.50.213:27017/seprodb?authSource=admin
```
#### Finding Your IP Address
You can obtain your ```REMOTE_ORIGIN``` address by executing ipconfig in CMD if you are using Windows or ifconfig if you are using a common Linux distribution or OSX.

It should be your "inet" address on Mac for the "en0" interface. Same for the most common Linux distributions.

**If you are using Windows**:
- open CMD or PowerShell and write "ipconfig",
- look for your "IPv4 Address" on your "Wireless LAN adapter Wi-Fi". This is your address.
- Use that same address for REACT_APP_BACKEND_ADDRESS, REMOTE_ORIGIN, and MONGOOSE_CONNECTION_STRING.

You can obtain your REMOTE_ORIGIN address by executing `ipconfig` in CMD if you are using **windows** or `ifconfig` if you are using a common **LINUX** distribution or **OSX**.

 - It should be your "inet" address on mac for the "en0" interface. Same for the most common Linux distributions.
 - If you are using windows, open CMD or Powershell and write "ipconfig", look for your "IPv4 Address" on your "Wireless LAN adapter Wi-Fi". This is your address.

Use that same address for ```REACT_APP_BACKEND_ADDRESS```, ```REMOTE_ORIGIN``` and ```MONGOOSE_CONNECTION_STRING``` in the .env file.

#### Important Notes
- Make sure to access the application in your browser on the address specified in ```ORIGIN``` in the .env file, otherwise CORS issues would arise.
- In case you have an issue with the some of the ports, try changing them.
- Please note that ```ORIGIN``` and ```REMOTE_ORIGIN``` exist because during the testing, virtual machines as well as other physical devices owned entirely by the author of the project were utilized as to mimic a real-world scenario as best as I could, hence the **origin** and **remote origin** variables.

#### Port Consistency
Please also note that in case of changing the port values for SERVER_PORT and FRONTEND_PORT variables in the .env, you have to also be changing the port variables for the following .env file variables:

- REACT_APP_BACKEND_ADDRESS
- ORIGIN
- REMOTE_ORIGIN

Use the ```SERVER_PORT``` for ```REACT_APP_BACKEND_ADDRESS``` and ```FRONTEND_PORT``` for the ```ORIGIN```, and ```REMOTE_ORIGIN``` variables respectfully.

For instance, if your **SERVER_PORT** is 5001, the port in your **REACT_APP_BACKEND_ADDRESS** should also be 5001:

```
SERVER_PORT=5001
REACT_APP_BACKEND_ADDRESS=http://192.168.50.213:5001
```

The same goes for the frontend part:
```
FRONTEND_PORT=3000
ORIGIN=http://127.0.0.1:3000
REMOTE_ORIGIN=http://192.168.50.213:3000
```

### Accessing the Application
Based on that .env file, you should navigate to http://127.0.0.1:3000 on your browser. This is where the application should be hosted if the specified port (3000) is not taken by another process on your machine.

#### Mongoose Connection String Components
Please note that the following are all a part of the ```MONGOOSE_CONNECTION_STRING```:

- MONGO_AUTH_ADMIN_USERNAME
- MONGO_AUTH_ADMIN_PASSWORD
- REMOTE_ORIGIN (excluding the port associated with it)

Based on these configurations, you should navigate to ```http://127.0.0.1:3000``` on your browser. This is where the application should be hosted if the specified port(3000) is not taken by another process on your machine.

