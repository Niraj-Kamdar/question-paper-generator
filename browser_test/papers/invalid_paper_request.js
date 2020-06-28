
const {register,login,add_course,add_unit} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();
add_unit();

web.click('//a[@id=\'generate_paper\']/div');
web.selectWindow('title=Set Now : Home');
//               id: id=next_1
// xpath:attributes: //button[@id=\'next_1\']
// xpath:idRelative: //form[@id=\'questions\']/div/div[2]/button
//   xpath:position: //div[2]/button
//              css: css=#next_1
web.click('id=next_1');
//               id: id=questions_err
// xpath:attributes: //div[@id=\'questions_err\']
// xpath:idRelative: //form[@id=\'questions\']/div/div[1]/div
//   xpath:position: //form/div/div[1]/div
//              css: css=#questions_err
web.assertText('id=questions_err', 'Number of Questions should be Integer');

web.click('id=number_of_questions');
//               id: id=number_of_questions
// xpath:attributes: //input[@id=\'number_of_questions\']
// xpath:idRelative: //form[@id=\'questions\']/div/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#number_of_questions
web.type('id=number_of_questions', '2');
//               id: id=next_1
// xpath:attributes: //button[@id=\'next_1\']
// xpath:idRelative: //form[@id=\'questions\']/div/div[2]/button
//   xpath:position: //div[2]/button
//              css: css=#next_1
web.click('id=next_1');
//               id: id=back_1
// xpath:attributes: //button[@id=\'back_1\']
// xpath:idRelative: //form[@id=\'subquestions\']/div/div[3]/button[1]
//   xpath:position: //div[3]/button[1]
//              css: css=#back_1
let count = web.getElementCount("//input[@class='subquestions']");
count = count + web.getElementCount("//input[@id='marks']");
assert.equal(count,3);

web.click('id=next_2');
// xpath:idRelative: //div[@id=\'dynamic_content\']/div[1]/div
//   xpath:position: //form/div/div[1]/div[1]/div
//              css: css=#dynamic_content > div:nth-child(1) > div
web.assertText('//div[@id=\'dynamic_content\']/div[1]/div', 'Number of Subquestions should be Integer');
// xpath:idRelative: //div[@id=\'dynamic_content\']/div[2]/div
//   xpath:position: //form/div/div[1]/div[2]/div
//              css: css=#dynamic_content > div:nth-child(2) > div
web.assertText('//div[@id=\'dynamic_content\']/div[2]/div', 'Number of Subquestions should be Integer');
//               id: id=marks_err
// xpath:attributes: //div[@id=\'marks_err\']
// xpath:idRelative: //form[@id=\'subquestions\']/div/div[2]/div
//   xpath:position: //form/div/div[2]/div
//              css: css=#marks_err
web.assertText('id=marks_err', 'marks should be Integer');
