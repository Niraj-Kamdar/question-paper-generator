const {register,login,add_course,add_unit,add_sub,add_mcq,paper_request,mark_distribution,paper_info,delete_mcq,delete_sub} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();
add_unit();
add_sub();
web.click('//a[contains(text(),\'WEB\')]');
add_mcq();

paper_request();
mark_distribution();

paper_info(true);
web.click('//div[@id=\'header\']/div[4]/div/a[2]/h4');
web.click('//a[contains(text(),\'WEB\')]');
web.click('//div[@id=\'unit_container\']/div[2]/div/a');
delete_sub();
web.click('//div[@id=\'sideNav\']/div[2]/div[2]/div[1]/a');
delete_mcq();
