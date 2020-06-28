const {register,login,add_course} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();

add_course(true);
