const express = require("express");
const app = express();
// Require files
const apiRoutes = require("./app/routes/api.js");
/**
 * use bodyParser for body parameters & 
 * use express,urlencoded() for body parameters
 */
const bodyParser = require('body-parser');

// dot import
const dotenv =  require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route
app.use("/api/user", apiRoutes);

/**
 * for use env file we call process.env
 * after dotenc package intall
 * here we call the port
 */
const PORT = process.env.PORT;
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
}); 