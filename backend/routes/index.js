const express = require("express");
const app = express.Router();

require("./endpoints/product")(app);
require("./endpoints/user")(app);
require("./endpoints/category")(app);


module.exports = app; 