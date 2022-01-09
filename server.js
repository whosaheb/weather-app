const express = require('express');
const app = express();
const request = require('native-request');
const cron = require('node-cron');
const cors = require("cors");
const path = require('path');
require('dotenv').config()
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
const APIkey = process.env.WEATHER_API;
const fs = require('fs');


// ----------------------------- import Routes -------------------------------------------------------------
const weatherRoute = require('./routes/weatherRecord');

// cors provides Express middleware to enable CORS with various options.
var corsOptions = {
  origin: HOST + ":" + PORT
};
app.use(cors(corsOptions));
////////////////////////////////////////////////////////////////

const stateslatitude = fs.readFileSync('./data/statelatitude.json', 'utf8', (err, data) => {
  if (err) throw err;
  return data;
});

app.get('/',(req,res)=>{
  res.send(JSON.stringify({"message":"Ok, I am working.."}))
});

app.use('/weather-report', weatherRoute);

cron.schedule('* 30 * * * *', function () {

  let latitudedata = JSON.parse(stateslatitude);
  latitudedata.forEach((item) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${item.latitude}&lon=${item.longitude}&appid=${APIkey}&units=metric`;
    // console.log(url);
    let headers = { "Content-Type": "application/json; charset=utf-8" }
    request.get(url,headers, function (err, data, status, headers) {
      if (err)  throw err;
      if (status == 200) {
        data = JSON.parse(data);
        // console.log(data.main.temp);
        let weatherData = {
          location: item.stateName,
          temp: data.main.temp,
          pressure: data.main.pressure,
          humidity: data.main.humidity
        }
        // console.log(weatherData);
        request.post(`http://localhost:${PORT}/weather/record`, weatherData, function (err, data, status, headers) {
          if (err) throw err;
        });
      }
    });
  })
  console.log('Insert data at every 30minutes');
});

// // Static Files
// app.use(express.static('public'));
// // sendFile will go here
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });


app.listen(PORT, () => {
  console.log(`You are listening at http://localhost:${PORT}`);
});