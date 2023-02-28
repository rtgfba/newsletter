const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
require('dotenv').config();
const dotenv = require("dotenv");
const apiKey = process.env.API_KEY;
const audienceKey = process.env.AUDIENCE_KEY


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){ 
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email; 
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jSonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/" + audienceKey +"";

    const options = {
        method: "POST",
        auth: apiKey
    }



    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
           if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
           } else {
            res.sendFile(__dirname + "/failure.html");
           }
        });

    });
    
    request.write(jSonData);
    request.end();

});


app.post("/failure", function(req,res){
    res.redirect("/");
});



// process.env.port makes heroku a dynamic port, || = or
app.listen(process.env.PORT || 3000, function(){
    console.log("This server is running on port 3000");
});
