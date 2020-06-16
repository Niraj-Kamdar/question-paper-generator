web.init();
web.open("http://127.0.0.1:5000/");
web.selectWindow("title=Set Now");
//               id: id=show_login
// xpath:attributes: //button[@id=\'show_login\']
// xpath:idRelative: //div[@id=\'header\']/div[3]/button
//   xpath:position: //button
//              css: css=#show_login
web.click("id=show_login");
web.selectWindow("title=Set Now");
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click("id=email");
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.type("id=email", "user@user.com");
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.click("id=password");
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.type("id=password", "user");
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'loginForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click("id=submit");
web.selectWindow("title=Set Now : Home");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //body/div/div/div/div/div[1]/h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText("//div[@id='main_container']/div/div/div[1]/h1", "Recent");
web.assertTitle("Set Now : Home");
