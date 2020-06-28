const {
  register,
  login,
  add_course,
  add_unit,
  add_sub,
  add_mcq,
  paper_request,
  mark_distribution,
} = require("../utils/utils");

web.init();
web.open("http://localhost:5000/");

register();
login();
add_course();
add_unit();
add_sub();
add_mcq();

paper_request();
mark_distribution(true);
