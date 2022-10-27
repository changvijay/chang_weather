const express = require("express");

const https = require("https");

const body = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
 
}) 
app.post("/",function(req,res){
    const q = req.body.name;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&APPID=5ff210587ab66a65168516e6fec53500&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const Data = JSON.parse(data);
            const temp = Data.main.temp;
            const dis = Data.weather[0].description;
            const min = Data.main.temp_min;
            const max = Data.main.temp_max;
            const icon = Data.weather[0].icon;
            const img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.send("<center style=background-color: black; color:white;><div><h1>the temperature in "+q+" is "+temp+"</h1> <p> the weather is currently"+dis+"</p><img  src ="+img+"></div></center>")
          
        })
    })
})

    

app.listen(3000, function(){
    console.log("hi ready to see.......")
})
