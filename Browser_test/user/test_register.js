web.init();
web.open('https://setnow.herokuapp.com/');
web.selectWindow('title=Set Now');
//               id: id=show_login
// xpath:attributes: //button[@id=\'show_login\']
// xpath:idRelative: //div[@id=\'header\']/div[3]/button
//   xpath:position: //button
//              css: css=#show_login
web.click('id=show_login');
web.selectWindow('title=Set Now');
//       xpath:link: //a[contains(text(),\'Sign Up\')]
// xpath:idRelative: //div[@id=\'bodycontent\']/div[1]/div/div[2]/small[2]/a
//       xpath:href: //a[contains(@href, \'/register\')]
//   xpath:position: //small[2]/a
//             link: link=Sign Up
//              css: css=#bodycontent > div.login_page > div > div.login_other_links.pt-2 > small:nth-child(2) > a
web.click('//a[contains(text(),\'Sign Up\')]');
web.selectWindow('title=Set Now');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[1]/input
//   xpath:position: //fieldset/div[1]/input
//              css: css=#username
web.click('id=username');
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[1]/input
//   xpath:position: //fieldset/div[1]/input
//              css: css=#username
web.type('id=username', 'test');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.type('id=email', 'test@xyz.com');
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.type('id=password', 'test@xyz');
//               id: id=confirm_password
//             name: name=confirm_password
// xpath:attributes: //input[@id=\'confirm_password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#confirm_password
web.type('id=confirm_password', 'test@xyz');
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password

//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'registerForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click('id=submit');
