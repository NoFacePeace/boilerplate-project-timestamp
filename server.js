// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?', function(req, res) {
  var date = null;
  if (req.params.date !== undefined) {
    var unixTimestamp = parseInt(req,params.date * 1);
    if (isNaN(unixTimestamp)) {
      date = new Date(req,params.date);
    } else {
      date = new Date(unixTimestamp);
    }
  } else {
    date = new Date(Date.now());
  }
  var response = date == "Invalid Date" ? { error: "Invalid Date" } :
  {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
  res.json(response);
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use(function(req, res, next) {
  res.status(404).type('text').send('Not Found');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});