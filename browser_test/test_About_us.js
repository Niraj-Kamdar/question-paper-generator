web.init();
web.open("http://127.0.0.1:5000/");
web.selectWindow("title=Set Now");
//               id: id=about_page_link
//       xpath:link: //a[contains(text(),\'About us\')]
// xpath:attributes: //a[@id=\'about_page_link\']
// xpath:idRelative: //div[@id=\'footercontent\']/span[8]/a
//       xpath:href: //a[@href=\'http://127.0.0.1:5000/about-us\']
//   xpath:position: //span[8]/a
//             link: link=About us
//              css: css=#about_page_link
web.click("id=about_page_link");
web.selectWindow("title=About Us");
web.assertTitle("About Us");
// xpath:idRelative: //div[@id=\'page_title\']/div
//   xpath:position: //body/div/div[1]/div
//              css: css=#page_title > div
web.click("//div[@id='page_title']/div");
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText("//div[@id='page_title']/div/h2", "About Us");
// xpath:idRelative: //div[@id=\'wrapper\']/div[1]
//   xpath:position: //body/div/div[2]/div[1]
//              css: css=#wrapper > div:nth-child(1)
web.click("//div[@id='wrapper']/div[1]");
// xpath:idRelative: //div[@id=\'about_content\']/p[1]
//   xpath:position: //div[2]/p[1]
//              css: css=#about_content > p:nth-child(1)
web.click("//div[@id='about_content']/p[1]");
// xpath:idRelative: //div[@id=\'about_content\']/p[1]
//   xpath:position: //div[2]/p[1]
//              css: css=#about_content > p:nth-child(1)
web.assertText(
    "//div[@id='about_content']/p[1]",
    `Welcome to SetNow, We're dedicated to giving you the
 very best of our service. We are hoping that,
 this website will help in lighten your work for
 making question paper. Our goal to make this
 website is to reduce hours of manual work to set
 question paper which cover all syllbas, include
 important qustions and with overall difficulty as
 you desire. This website is created by
 students of DA-IICT (Gandhinagar, Gujrat). This
 effort was made under the guidence of Prof.
 Saurabh Tiwari.`
);
//               id: id=wrapper
// xpath:attributes: //div[@id=\'wrapper\']
//   xpath:position: //body/div/div[2]
//              css: css=#wrapper
web.click("id=wrapper");
// xpath:idRelative: (//div[@id=\'m_name\']/p)[1]
//   xpath:position: //div[1]/div[1]/div[1]/p
web.assertText(
    "(//div[@id='m_name']/p)[1]",
    `Niraj Kamdar
 [201701184]`
);
// xpath:idRelative: (//div[@id=\'m_name\']/p)[8]
//   xpath:position: //div[3]/div[2]/div[1]/p
web.assertText(
    "(//div[@id='m_name']/p)[8]",
    `Manan Solanki
 [201701209]`
);
// xpath:attributes: (//div[@id=\'m_name\'])[6]
// xpath:idRelative: (//div[@id=\'team_card\']/div[1])[6]
//   xpath:position: //div[3]/div[2]/div[3]/div[1]
web.click("(//div[@id='m_name'])[6]");
// xpath:idRelative: (//div[@id=\'m_name\']/p)[6]
//   xpath:position: //div[2]/div[3]/div[1]/p
web.assertText(
    "(//div[@id='m_name']/p)[6]",
    `Karpit Patel
 [201701174]`
);
// xpath:attributes: (//div[@id=\'m_name\'])[13]
// xpath:idRelative: (//div[@id=\'team_card\']/div[1])[13]
//   xpath:position: //div[5]/div[1]/div[1]
web.click("(//div[@id='m_name'])[13]");
