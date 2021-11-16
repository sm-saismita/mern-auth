const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db,{ 
    useNewUrlParser: true 
}).then(() => {
    console.log("MongoDB successfully connected")
    })
    .catch(err => {
        console.log(err)
  });

  var allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

  app.use(allowCrossDomain);
  // Routes
  app.use("/api/users", users);


app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`)
});