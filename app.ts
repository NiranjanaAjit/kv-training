// importing packages
// const http = require('http');

// //create server
// const server = http.createServer((request, response) => {
//     console.log("request url", request.url);
//     response
//     .writeHead(200)
//     .end("Hello world ! ");
// });



// import express from "express";
import express, {Request, Response} from "express";

const server = express();

server.get("/", (request : Request, response : Response) => {
  console.log("request url: ", request.url);
  response.status(200).send("Hello World !");
});

server.get("/employee", (request : Request, response : Response) => {
  console.log("request url: ", request.url);
  response.status(200).send("Hello Niranjana !");
});

interface Data {
  profile : Profile
}

interface Profile {
    name : string,
    age : number
}

server.get("/getData", (request : Request, response : Response) => {
    let data : Data = {
      profile: {
        name: "niranjana",
        age: 22
      }
    };
    console.log( request.url);
    console.log("name is: ",data.profile.name);
    response.status(200).send(data);
});

//binding server to port 3000
server.listen(3000, () => {
  console.log("server is running on port 3000");
});

