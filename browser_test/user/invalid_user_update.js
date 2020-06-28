web.init();
web.open('http://localhost:5000/');

const {login, register} = require("../utils/utils");

register();
login();

web.click('(//img[@alt=\'user\'])[1]');
web.selectWindow('title=Account');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#username
web.click('id=username');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#username
web.click('id=username');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#username
web.clear('id=username');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click('id=email');

web.clear('id=email');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //div[@id=\'form_content\']/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#submit
web.click('id=submit');
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div
//   xpath:position: //form/div/div[1]/div
//              css: css=#form_content > div:nth-child(2) > div
web.assertText('//div[@id=\'form_content\']/div[1]/div',
               'username is required');
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/div
//   xpath:position: //form/div/div[2]/div
//              css: css=#form_content > div:nth-child(3) > div
web.assertText('//div[@id=\'form_content\']/div[2]/div',
               'email address is invalid!!');