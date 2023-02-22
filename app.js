const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");





app.get("/", function(req,res){
    res.send("This server  is up and running");
});







app.listen(3000, function(){
    console.log("This server is running on port 3000");
});