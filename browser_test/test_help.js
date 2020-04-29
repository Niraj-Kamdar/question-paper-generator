web.init();
web.open("http://127.0.0.1:5000/");
web.selectWindow("title=Set Now");
//               id: id=help_page_link
//       xpath:link: //a[contains(text(),\'Help\')]
// xpath:attributes: //a[@id=\'help_page_link\']
// xpath:idRelative: //div[@id=\'footercontent\']/span[10]/a
//       xpath:href: //a[@href=\'http://127.0.0.1:5000/help\']
//   xpath:position: //span[10]/a
//             link: link=Help
//              css: css=#help_page_link
web.click("id=help_page_link");
web.selectWindow("title=Help");
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText("//div[@id='page_title']/div/h2", "Help & Support");
// xpath:idRelative: //div[@id=\'wrapper\']/div[1]
//   xpath:position: //body/div/div[2]/div[1]
//              css: css=#wrapper > div:nth-child(1)
web.click("//div[@id='wrapper']/div[1]");
// xpath:idRelative: //div[@id=\'help_content\']/p
//   xpath:position: //div[2]/p
//              css: css=#help_content > p
web.click("//div[@id='help_content']/p");
// xpath:idRelative: //div[@id=\'help_content\']/p
//   xpath:position: //div[2]/p
//              css: css=#help_content > p
web.assertText(
    "//div[@id='help_content']/p",
    `Need Some Help? Below is some frequently asked questions which may help you. We're dedicated to giving
 you the
 very best of our service. If you have any other questions or comments, please don't hesitate to contact
 us.`
);
web.assertTitle("Help");
// xpath:idRelative: //div[@id=\'headingTwo\']/h5/button
//   xpath:position: //div[2]/div[1]/h5/button
//              css: css=#headingTwo > h5 > button
web.click("//div[@id='headingTwo']/h5/button");
// xpath:idRelative: //div[@id=\'headingThree\']/h5/button
//   xpath:position: //div[3]/div[1]/h5/button
//              css: css=#headingThree > h5 > button
web.click("//div[@id='headingThree']/h5/button");
// xpath:idRelative: //div[@id=\'collapseThree\']/div/p[2]
//   xpath:position: //p[2]
//              css: css=#collapseThree > div > p:nth-child(2)
web.assertText("//div[@id='collapseThree']/div/p[2]", "Or");
// xpath:idRelative: //div[@id=\'accordion\']/div[3]
//   xpath:position: //div[3]/div[3]
//              css: css=#accordion > div.card.mt-3
web.click("//div[@id='accordion']/div[3]");
// xpath:idRelative: //div[@id=\'headingOne\']/h5/button
//   xpath:position: //div[1]/div[1]/h5/button
//              css: css=#headingOne > h5 > button
web.click("//div[@id='headingOne']/h5/button");
// xpath:idRelative: //div[@id=\'collapseOne\']/div
//   xpath:position: //div[3]/div[1]/div[2]/div
//              css: css=#collapseOne > div
web.click("//div[@id='collapseOne']/div");
// xpath:idRelative: //div[@id=\'collapseOne\']/div
//   xpath:position: //div[3]/div[1]/div[2]/div
//              css: css=#collapseOne > div
web.assertText(
    "//div[@id='collapseOne']/div",
    `Yes, you have to login to our system to use services provided by us. You can login/signup by
 email address
 and set password for your account.`
);
// xpath:idRelative: //div[@id=\'headingOne\']/h5
//   xpath:position: //div[1]/div[1]/h5
//              css: css=#headingOne > h5
web.click("//div[@id='headingOne']/h5");
web.open("http://127.0.0.1:5000/");
