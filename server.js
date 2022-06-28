const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
require('./services/scheduler')

// ----------------- import Routes -------------------------------
const weatherRoute = require('./routes/weatherRecord');

//********************** Middleares *********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//provides Express middleware to enable cross-origin with various options.
app.use(cors({origin: HOST + ":" + PORT}));
////////////////////////////////////////////////////////////////

app.use('/api', weatherRoute);

// Static Files
app.use(express.static('public'));
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
  console.log(`You are listening at http://localhost:${PORT}`);
});