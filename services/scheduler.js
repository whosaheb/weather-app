const schedule = require('node-schedule');
const axios = require('axios').default;
const { promises: fs } = require("fs");
const Weather = require('../models/weatherRecord');
const APIkey = process.env.WEATHER_API;



const OneHourejob = schedule.scheduleJob('*/1 * * *', async () => {
  // console.log('5 second schudular');
  try {
    const stateslatitude = await fs.readFile('./data/statelatitude.json', encoding = "utf-8")
    let latitudedata = JSON.parse(stateslatitude);
    latitudedata.forEach(async (item) => {
      // console.log(item);
      let options = {
        method: 'get',
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${item.latitude}&lon=${item.longitude}&appid=${APIkey}&units=metric`,
        responseType: 'json',
      };
      // console.log(options);
      let weatherResult = await axios(options);
      // console.log(weatherResult.data.main);
      let weatherRecord = {
        "state": item.stateName,
        "temp": weatherResult.data.main.temp,
        "pressure": weatherResult.data.main.pressure,
        "humidity": weatherResult.data.main.humidity
      }

      await Weather.create(weatherRecord);
    });
  } catch (err) {
    console.log(err);
  }
});
