var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", (req, res) => {
  res.json({
    "unix" : new Date().getTime(),
    "utc" : new Date().toUTCString()
  });
});

// app.get("/api/timestamp/:date", (req, res) => {
//   let input = req.params.date;
//   let jsonObject = {};

//   if(/\d{13,}/.test(input)){
//     input = new Date(parseInt(input));
//     jsonObject["unix"] =  new Date(input).getTime();
//     jsonObject["utc"] = new Date(input).toUTCString();
//   } else if(/\d{4}\-\d{2}\-\d{2}/.test(input)){
//     input = new Date(input);
//     console.log(input);
//     jsonObject["unix"] =  new Date(input).getTime();
//     jsonObject["utc"] = new Date(input).toUTCString();
//   } else {
//     jsonObject["error"] = "Invalid Date";
//   }

//   res.send(jsonObject);
// });

app.get('/api/timestamp/:date_string', (req, res) => {
  let responObj = {}
  let dateString = req.params.date_string
  let timeStamp
  let timeStampUnix
  let timeStampUTC
  let isNum = /^\d+$/.test(dateString)
  console.log(isNum);

  if (isNum){
    timeStamp = new Date(parseInt(dateString))
    timeStampUnix = timeStamp.valueOf()
    timeStampUTC = timeStamp.toUTCString()
    console.log(timeStampUnix)
    console.log(timeStampUTC)
    
  } else {
    timeStamp = new Date(dateString)
    timeStampUnix = timeStamp.valueOf()
    timeStampUTC = timeStamp.toUTCString()
    console.log(timeStampUnix)
    console.log(timeStampUTC)
  }

  console.log(timeStampUTC)
  if (timeStampUTC == "Invalid Date") {
    console.log("if true run")
    responObj["error"] = "Invalid Date"  
    res.json(responObj);

  } else {
    console.log("else run")
    responObj["unix"] = timeStampUnix
    responObj["utc"] = timeStampUTC
    res.json(responObj);

  }

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
