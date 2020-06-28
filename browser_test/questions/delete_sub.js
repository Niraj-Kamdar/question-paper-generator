const {
  register,
  login,
  add_course,
  add_unit,
  add_sub,
  delete_sub,
} = require("../utils/utils");

web.init();
web.open("http://localhost:5000/");

register();
login();
add_course();
add_unit();
add_sub();

delete_sub(true);
