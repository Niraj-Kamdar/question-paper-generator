

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

paper_info();

web.click('id=pdf_mail');
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div
//   xpath:position: //form/div/div[1]/div
//              css: css=#form_content > div.form__fields > div
web.assertText('//div[@id=\'form_content\']/div[1]/div', 'Invalid email Address!!');
//               id: id=abort
// xpath:attributes: //button[@id=\'abort\']
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/button[1]
//   xpath:position: //button[1]
//              css: css=#abort

web.click('//div[@id=\'header\']/div[4]/div/a[2]/h4');
web.click('//a[contains(text(),\'WEB\')]');
web.click('//div[@id=\'unit_container\']/div[2]/div/a');
delete_sub();
web.click('//div[@id=\'sideNav\']/div[2]/div[2]/div[1]/a');
delete_mcq();
