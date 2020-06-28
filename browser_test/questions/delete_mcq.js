const {
  register,
  login,
  add_course,
  add_unit,
  add_mcq,
  delete_mcq,
} = require("../utils/utils");

web.init();
web.open("http://localhost:5000/");

register();
login();
add_course();
add_unit();
add_mcq();
delete_mcq();
