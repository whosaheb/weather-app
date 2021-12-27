const express = require('express');
const app = express();
const request = require('native-request');
const cron = require('node-cron');
const cors = require("cors");
const path = require('path');
const PORT = process.env.PORT || 8000;
const APIkey = 'f049afd17da672387e94dde2da51ccb1';


// cors provides Express middleware to enable CORS with various options.
var corsOptions = {
  origin: "http://localhost:" + PORT
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

require("./routes/weatherRecord")(app);


cron.schedule('* 30 * * * *', function () {
  locationid = [1261029, 1252881, 1261481];
  for (let i = 0; i < locationid.length; i++) {
    request.get(`https://api.openweathermap.org/data/2.5/weather?id=${locationid[i]}&units=metric&appid=${APIkey}`, function (err, data, status, headers) {
      if (err) {
        throw err;
      }
      if (status == 200) {
        data = JSON.parse(data);
        // console.log(data.main.temp);
        let weatherData = {
          location: data.name,
          temp: data.main.temp,
          pressure: data.main.pressure,
          humidity: data.main.humidity
        }
        // console.log(weatherData);
        request.post(`http://localhost:${PORT}/weather/record`, weatherData, function (err, data, status, headers) {
          if (err) {
            throw err;
          }
          console.log(status); //200
        });
      }
    });
  }

  console.log('Insert data in every 30minutes');
});

// Static Files
app.use(express.static('public'));
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});