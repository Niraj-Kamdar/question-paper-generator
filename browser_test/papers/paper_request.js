
const {register, login, add_course, add_unit, paper_request} =
    require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();
add_unit();

paper_request(true);
