web.init();
web.open('http://localhost:5000/');

const {register, login, add_course, remove_course} = require("../utils/utils");

register();
login();
add_course();
remove_course(true);
