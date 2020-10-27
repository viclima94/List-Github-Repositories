# List-Github-Repositories
Here is a nodeJS microsservice that we can pass a github user and list all the users repositories.

# Techs:
  > NodeJS
  
# Dependencies:
  > axios: 0.21.0,
  > body-parser: 1.19.0,
  > cookie-parser": 1.4.5,
  > cors: 2.8.5,
  > dotenv: 8.2.0,
  > dotenv-safe: 8.2.0,
  > express: 4.17.1,
  > jsonwebtoken: 8.5.1,
  > nodemon: 2.0.6
  
# We can Run with Docker 
 1. docker pull viclima94/nodeapi:1.0
 2. docker run -p 8080:8080 viclima94/nodeapi:1.0
 3. Now we have our Microsservice running at: localhost:8080

# We can clone and run with Git
 1. Clone the Project
 2. cd List-Github-Repositories
 3. yarn install || npm install
 4. yarn server.js
 5. Now we have our microsservice running at: localhost:8080

# Testing our application

   Endpoint:  /Login
    For this we have to pass the following fields
      {
        "user": "admin"
        "password": "12345"
      }
    This endpoint will pass a JWT password for we use on second endpoit 
  
   Endpoint: /?user=${user} 
    Here we have to pass the JWT Token that the frist end point generate to us 
      Content-type: application.json 
      x-access-token: $token-here

    OBS: Everytime you send a login request the JWT token changes! 

