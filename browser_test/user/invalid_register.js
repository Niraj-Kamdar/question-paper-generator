web.init();
web.open('http://localhost:5000/');
web.selectWindow('title=Index');
//               id: id=get_start_link
//       xpath:link: //a[contains(text(),\'Get Started\')]
// xpath:attributes: //a[@id=\'get_start_link\']
// xpath:idRelative: //div[@id=\'get_start_container\']/div[1]/a
//       xpath:href: //a[contains(@href, \'/register\')]
//   xpath:position: //main/div/div/div[1]/div[1]/a
//             link: link=Get Started
//              css: css=#get_start_link
web.click('id=get_start_link');
web.selectWindow('title=Register');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'registerForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click('id=submit');
//               id: id=user_name_error
// xpath:attributes: //div[@id=\'user_name_error\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[1]/div
//   xpath:position: //fieldset/div[1]/div
//              css: css=#user_name_error
web.assertText('id=user_name_error', 'Username is required!!');
//               id: id=user_email_error
// xpath:attributes: //div[@id=\'user_email_error\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/div
//   xpath:position: //fieldset/div[2]/div
//              css: css=#user_email_error
web.assertText('id=user_email_error', 'email address is invalid!!');
//               id: id=user_password_error
// xpath:attributes: //div[@id=\'user_password_error\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/div
//   xpath:position: //div[3]/div
//              css: css=#user_password_error
web.assertText('id=user_password_error', 'Password is required!!');
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
web.type('id=username', 'Jeel2308');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click('id=email');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.type('id=email', 'jeelpatel238@gmail.com');
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.click('id=password');
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.type('id=password', '1234567');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'registerForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click('id=submit');
//               id: id=user_password_error
// xpath:attributes: //div[@id=\'user_password_error\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/div
//   xpath:position: //div[3]/div
//              css: css=#user_password_error
web.assertText('id=user_password_error',
               'password must have atleast 8 characters');
//               id: id=user_confirm_password_error
// xpath:attributes: //div[@id=\'user_confirm_password_error\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[4]/div
//   xpath:position: //fieldset/div[4]/div
//              css: css=#user_confirm_password_error
web.assertText('id=user_confirm_password_error',
               'this field must match with password field');
