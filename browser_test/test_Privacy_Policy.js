web.init();
web.open('http://127.0.0.1:5000/');
web.selectWindow('title=Set Now');
//               id: id=policy_page_link
//       xpath:link: //a[contains(text(),\'Privacy Policy\')]
// xpath:attributes: //a[@id=\'policy_page_link\']
// xpath:idRelative: //div[@id=\'footercontent\']/span[14]/a
//       xpath:href: //a[@href=\'http://127.0.0.1:5000/privacy-policy\']
//   xpath:position: //span[14]/a
//             link: link=Privacy Policy
//              css: css=#policy_page_link
web.click('id=policy_page_link');
web.selectWindow('title=Privacy Policy');
//               id: id=policy_content
// xpath:attributes: //div[@id=\'policy_content\']
// xpath:idRelative: //div[@id=\'wrapper\']/div
//   xpath:position: //div[2]/div
//              css: css=#policy_content
web.click('id=policy_content');
// xpath:idRelative: //div[@id=\'policy_content\']/p[3]
//   xpath:position: //p[3]
//              css: css=#policy_content > p:nth-child(3)
web.assertText('//div[@id=\'policy_content\']/p[3]', `We only retain collected information for as long as necessary to provide you with your requested service.
 What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as
 well as unauthorized access, disclosure, copying, use or modification.`);
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.click('//div[@id=\'page_title\']/div/h2');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText('//div[@id=\'page_title\']/div/h2', 'Privacy Policy');
//   xpath:position: //body/div
//              css: css=body > div
web.click('//body/div');
web.assertTitle('Privacy Policy');
//   xpath:position: //body/div
//              css: css=body > div
web.click('//body/div');
web.open('http://127.0.0.1:5000/');
