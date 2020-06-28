web.init();
web.open('http://localhost:5000/');

const {register,login} = require("../utils/utils");

register();
login();

web.click('(//img[@alt=\'user\'])[1]');

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
web.type('id=username', 'CT7567TG');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click('id=email');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //div[@id=\'form_content\']/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.type('id=email', '201701176@daiict.ac.in');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#username

web.click('id=submit');
web.assertText('//div[@id=\'template_display\']/div/div[1]/div/div/h2', 'CT7567TG');

web.click('id=username');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#username
web.type('id=username', 'CT7567T');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //div[@id=\'form_content\']/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#submit
web.click('id=submit');
