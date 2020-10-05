//jshint esversion:6

const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){

 res.sendFile(__dirname+"/index.html");
 
});


app.post("/",function(req,res){
    var cityname=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=06e86451b16a162a1ebac996b27d698b"
   
    https.get(url,function(response){
      response.on("data",function(data){
          const weatherData=JSON.parse(data);
          const temp=weatherData.main.temp;
          const desc=weatherData.weather[0].description;
          const img=weatherData.weather[0].icon;
          res.write("<h1>The weather in "+cityname+" is "+temp+"C</h1>");
          res.write("<h2>It's "+desc+" today</h2>");
          res.send();
       });
  });

});
app.listen(3000, function(){
    console.log("This port, 3000  is working!");
});