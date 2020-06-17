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
//       xpath:link: //a[contains(text(),\'Sign Up\')]
// xpath:idRelative: //div[@id=\'bodycontent\']/div[1]/div/div[2]/small[2]/a
//       xpath:href: //a[contains(@href, \'/register\')]
//   xpath:position: //small[2]/a
//             link: link=Sign Up
//              css: css=#bodycontent > div.login_page > div >
//              div.login_other_links.pt-2 > small:nth-child(2) > a
web.click("//a[contains(text(),'Sign Up')]");
web.selectWindow("title=Set Now");
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[1]/label
//   xpath:position: //div[1]/label
//              css: css=#registerForm > fieldset > div.form-group.mb-3 > label
web.assertText("//form[@id='registerForm']/fieldset/div[1]/label", "Username");
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/label
//   xpath:position: //div[2]/label
//              css: css=#registerForm > fieldset > div:nth-child(2) > label
web.assertText("//form[@id='registerForm']/fieldset/div[2]/label", "Email");
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/label
//   xpath:position: //div[3]/label
//              css: css=#registerForm > fieldset > div:nth-child(3) > label
web.assertText("//form[@id='registerForm']/fieldset/div[3]/label", "Password");
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[4]/label
//   xpath:position: //div[4]/label
//              css: css=#registerForm > fieldset > div.form-group.mt-3.mb-1 >
//              label
web.assertText("//form[@id='registerForm']/fieldset/div[4]/label",
               "Confirm Password");
web.assertTitle("Set Now");
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[1]/input
//   xpath:position: //fieldset/div[1]/input
//              css: css=#username
web.click("id=username");
//               id: id=username
//             name: name=username
// xpath:attributes: //input[@id=\'username\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[1]/input
//   xpath:position: //fieldset/div[1]/input
//              css: css=#username
web.type("id=username", "viny");
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click("id=email");
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.click("id=email");
//               id: id=email
//             name: name=email
// xpath:attributes: //input[@id=\'email\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[2]/input
//   xpath:position: //div[2]/input
//              css: css=#email
web.type("id=email", "viny@gmail.com");
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.click("id=password");
//               id: id=password
//             name: name=password
// xpath:attributes: //input[@id=\'password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[3]/input
//   xpath:position: //div[3]/input
//              css: css=#password
web.type("id=password", "12345678");
//               id: id=confirm_password
//             name: name=confirm_password
// xpath:attributes: //input[@id=\'confirm_password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#confirm_password
web.click("id=confirm_password");
//               id: id=confirm_password
//             name: name=confirm_password
// xpath:attributes: //input[@id=\'confirm_password\']
// xpath:idRelative: //form[@id=\'registerForm\']/fieldset/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#confirm_password
web.type("id=confirm_password", "12345678");
//               id: id=submit
//             name: name=submit
// xpath:attributes: //input[@id=\'submit\']
// xpath:idRelative: //form[@id=\'registerForm\']/div/input
//   xpath:position: //form/div/input
//              css: css=#submit
web.click("id=submit");
web.selectWindow("title=Set Now");
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset/div[1]/div
//   xpath:position: //fieldset/div[1]/div
//              css: css=#loginForm > fieldset > div.flashes > div
web.click("//form[@id='loginForm']/fieldset/div[1]/div");
//               id: id=header
// xpath:attributes: //div[@id=\'header\']
// xpath:idRelative: //div[@id=\'bodycontent\']/div[3]/header/div
//   xpath:position: //header/div
//              css: css=#header
web.click("id=header");
web.assertTitle("Set Now");
