web.init();
web.open('http://127.0.0.1:5000/');
web.selectWindow('title=Set Now');
//               id: id=show_login
// xpath:attributes: //button[@id=\'show_login\']
// xpath:idRelative: //div[@id=\'header\']/div[3]/button
//   xpath:position: //button
//              css: css=#show_login
web.click('id=show_login');
web.selectWindow('title=Set Now');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click('id=email');
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.type('id=email', 'user@user.com');
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.click('id=password');
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.type('id=password', 'user');
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[4]/label
//   xpath:position: //div[4]/label
//              css: css=#loginForm > fieldset > div.form-check > label
web.click('//form[@id=\'loginForm\']/fieldset/div[4]/label');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'loginForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click('id=submit');
web.selectWindow('title=Set Now : Home');
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]
//   xpath:position: //body/div/div/div/div/div[1]
//              css: css=#main_container > div > div > div.row.mb-2
web.click('//div[@id=\'main_container\']/div/div/div[1]');
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //body/div/div/div/div/div[1]/h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText('//div[@id=\'main_container\']/div/div/div[1]/h1', 'Recent');
// xpath:idRelative: //div[@id=\'home_content\']/div[2]
//   xpath:position: //div[2]/div[1]/div/div[2]
//              css: css=#home_content > div:nth-child(2)
web.click('//div[@id=\'home_content\']/div[2]');
web.assertTitle('Set Now : Home');
// xpath:idRelative: //div[@id=\'manage_courses_btn\']/div/h3
//   xpath:position: //h3
//              css: css=#manage_courses_btn > div > h3
web.click('//div[@id=\'manage_courses_btn\']/div/h3');
web.selectWindow('title=Set Now : Home');
web.assertTitle('Set Now : Home');
// xpath:idRelative: //div[@id=\'add_course\']/div
//   xpath:position: //div[2]/div/div/div[2]/div/div
//              css: css=#add_course > div
web.click('//div[@id=\'add_course\']/div');
web.selectWindow('title=Set Now : Home');
//               id: id=form__fields__course
//             name: name=course
// xpath:attributes: //input[@id=\'form__fields__course\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#form__fields__course
web.click('id=form__fields__course');
//               id: id=form__fields__course
//             name: name=course
// xpath:attributes: //input[@id=\'form__fields__course\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
//   xpath:position: //div[1]/input
//              css: css=#form__fields__course
web.type('id=form__fields__course', 'Cryptography');
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //div[@id=\'submit_btn\']/input
//   xpath:position: //div[2]/input
//              css: css=#submit
web.click('id=submit');
web.selectWindow('title=Set Now : Home');
web.assertTitle('Set Now : Home');
