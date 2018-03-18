// require npm packages
var express = require("express");
var bodyParser = require("body-parser");

// create express server and port
var app = express();
var PORT = process.env.PORT || 8080;

// allow data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// points the server to the routing files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});