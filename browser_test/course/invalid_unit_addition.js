const {register, login, add_course} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();

web.click('//a[contains(text(),\'WEB\')]');
web.selectWindow('title=Units');
// xpath:idRelative: //a[@id=\'add_unit\']/div
//   xpath:position: //div[3]/a[1]/div
//              css: css=#add_unit > div
web.click('//a[@id=\'add_unit\']/div');
web.selectWindow('title=Add Units');
//               id: id=submit_btn
//             name: name=submit
// xpath:attributes: //input[@id=\'submit_btn\']
// xpath:idRelative: //div[@id=\'submit_reset_container\']/input
//   xpath:position: //div[3]/input
//              css: css=#submit_btn
web.click('id=submit_btn');
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div
//   xpath:position: //form/div/div[1]/div
//              css: css=#form_content > div:nth-child(1) > div
web.assertText('//div[@id=\'form_content\']/div[1]/div',
               'chapter number is required!!');
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/div
//   xpath:position: //form/div/div[2]/div
//              css: css=#form_content > div:nth-child(2) > div
web.assertText('//div[@id=\'form_content\']/div[2]/div',
               'Chapter name is required!!');
