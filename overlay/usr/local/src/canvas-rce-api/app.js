const path = require('path');


require("dotenv").config({
        path: path.join(__dirname, '.env')
});


const container = require("./app/container");
const _application = require("./app/application");

module.exports = container.make(_application).listen();
