const { register } = require("../utils/utils");

web.init();
web.open("http://localhost:5000/");
register(true);
