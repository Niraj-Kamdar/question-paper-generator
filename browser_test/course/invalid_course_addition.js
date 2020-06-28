const {register,login} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();

web.click('//a[@id=\'manage_courses_btn\']/h1');
web.selectWindow('title=Courses');
// xpath:idRelative: //div[@id=\'add_course_container\']/a
//       xpath:href: (//a[contains(@href, \'/course/new/\')])[2]
//   xpath:position: //div[2]/div/div/div[2]/a
//              css: css=#add_course_container > a
web.click('//div[@id=\'add_course_container\']/a');
web.selectWindow('title=Add Courses');
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
web.assertText('//div[@id=\'form_content\']/div[1]/div', 'required field');
