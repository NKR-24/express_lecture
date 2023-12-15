const express = require("express"); //import express module
const bodyParser = require("body-parser"); //import body-parser module

const SERVER_PORT = 3000; //set use port number(default number is 3000)
const BINDING_PORT = "0.0.0.0"; //set this server visible range(0.0.0.0 is local ruter)
const APP = express(); //initialise express server object
APP.use(bodyParser.json()); // add middle ware to receive json data

/* 
## flow
1. define each http method
    APP.get() -> get method
    APP.post() -> post method
2, defuine endpoint
    the first argument of APP.get() and APP.post() means endpoint.
    if endpoint is "/", you can access this function with "https://xxxxxxxxx/"
    if endpoint is "/hello", you can access this function with "https://xxxxxxxxx/hello"
3. define some process
    you can set process into APP function scope { }
    handler argument: req has request info (e.g. ip, body, param, http-header, ...)
    handler argument: res is response object. You have to set request data into it.(e.g. status code, json, error message, ...)
*/

// Define a GET route. endpoint is "/"
APP.get("/", (req, res) => {
  res.status(200).send("Hello, this is the root route!"); //make a simple text response with status code 200(success)
});

// Define a POST route that expects JSON data. endpoint is "/"
APP.post("/", (req, res) => {
  const data = req.body; //exstract the data which is stored in request body
  if (!data) {
    //body is undefined. return 400 error with error text
    res.status(400).send("Bad Request: JSON data is required");
  } else {
    // Process the JSON data (you can customize this part)
    console.log("Received data:", data);
    res
      .status(200)
      .json({ message: "Data received successfully", receivedData: data });
  }
  return;
});

//server begins to listen port
APP.listen(SERVER_PORT, BINDING_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
