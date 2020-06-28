const {
  register,
  login,
  add_course,
  add_unit,
  add_sub,
} = require("../utils/utils");

web.init();
web.open("http://localhost:5000/");

register();
login();
add_course();
add_unit();
add_sub();

web.click("//img[@alt='edit']");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.click("id=form_field_question_value");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.click("id=form_field_question_value");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.type("id=form_field_question_value", "who is baby yoda?");
//               id: id=submit_btn
//             name: name=submit
// xpath:attributes: //input[@id=\'submit_btn\']
// xpath:idRelative: //div[@id=\'submit_reset_container\']/input
//   xpath:position: //div[5]/input
//              css: css=#submit_btn
web.click("id=submit_btn");
web.selectWindow("title=Subjective Questions");
// xpath:idRelative: //div[@id=\'questions\']/div[2]/div/div[2]/div[5]/div
//   xpath:position: //div[5]/div
//              css: css=#questions > div:nth-child(2) > div > div.question_info
//              > div.fifth_row > div
web.assertText(
  "//div[@id='questions']/div[2]/div/div[2]/div[5]/div",
  "who is baby yoda?"
);
//        xpath:img: //img[@alt=\'edit\']
// xpath:idRelative: //div[@id=\'questions\']/div[2]/div/div[3]/div/img
//   xpath:position: //div[2]/div[1]/div/div[2]/div/div[3]/div/img
//              css: css=#questions > div:nth-child(2) > div >
//              div.update_question > div > img
