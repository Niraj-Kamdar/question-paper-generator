web.init();
web.open('http://localhost:5000/');
web.selectWindow('title=Index');
// xpath:idRelative: //div[@id=\'header\']/div[4]/div/a[5]/h4
//   xpath:position: //a[5]/h4
//              css: css=#header > div.col3 > div > a:nth-child(5) > h4
web.click('//div[@id=\'header\']/div[4]/div/a[5]/h4');
web.selectWindow('title=Login');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'loginForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click('id=submit');
//               id: id=form_email_error
// xpath:attributes: //div[@id=\'form_email_error\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[2]/div
//   xpath:position: //fieldset/div[2]/div
//              css: css=#form_email_error
web.assertText('id=form_email_error', 'email address is invalid!!');
//               id: id=form_password_error
// xpath:attributes: //div[@id=\'form_password_error\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[3]/div
//   xpath:position: //div[3]/div
//              css: css=#form_password_error
web.assertText('id=form_password_error', 'Password is required!!');
