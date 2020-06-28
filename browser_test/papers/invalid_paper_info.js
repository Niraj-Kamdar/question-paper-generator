
const {register,login,add_course,add_unit,add_sub,add_mcq,paper_request,mark_distribution} = require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();
add_unit();
add_sub();
add_mcq();

paper_request();
mark_distribution();


web.click('id=generate_paper'); // for mark distribution page

//               id: id=generate_paper
//             name: name=submit
// xpath:attributes: //input[@id=\'generate_paper\']
// xpath:idRelative: //div[@id=\'form_content\']/div[6]/input
//   xpath:position: //div[6]/input
//              css: css=#generate_paper
web.click('id=generate_paper'); // for paper logo form page
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div
//   xpath:position: //form/div/div[1]/div
//              css: css=#form_content > div:nth-child(1) > div
web.assertText('//div[@id=\'form_content\']/div[1]/div', 'required field!!');
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/div
//   xpath:position: //form/div/div[2]/div
//              css: css=#form_content > div:nth-child(2) > div
web.assertText('//div[@id=\'form_content\']/div[2]/div', 'required field!!');
// xpath:idRelative: //div[@id=\'form_content\']/div[3]/div
//   xpath:position: //div[3]/div
//              css: css=#form_content > div:nth-child(3) > div
web.assertText('//div[@id=\'form_content\']/div[3]/div', 'required field!!');
// xpath:idRelative: //div[@id=\'form_content\']/div[4]/div
//   xpath:position: //form/div/div[4]/div
//              css: css=#form_content > div:nth-child(4) > div
web.assertText('//div[@id=\'form_content\']/div[4]/div', 'required field!!');