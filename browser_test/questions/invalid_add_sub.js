const {register, login, add_course, add_unit} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();
add_unit();

web.click('//div[@id=\'unit_container\']/div[2]/div/a');

web.click('//div[@id=\'sideNav\']/div[3]/div[2]/div[2]/a');

web.click('id=submit_btn');
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[2]
//   xpath:position: //form/div/div[1]/div[2]
//              css: css=#form_content > div.form_field_question_label >
//              div.form__client_error
web.assertText('//div[@id=\'form_content\']/div[1]/div[2]', 'empty question!!');
// xpath:idRelative: //div[@id=\'marks_label\']/div[2]
//   xpath:position: //form/div/div[2]/div[1]/div[2]
//              css: css=#marks_label > div.form__client_error
web.assertText('//div[@id=\'marks_label\']/div[2]',
               'enter marks between 1 and 100');
