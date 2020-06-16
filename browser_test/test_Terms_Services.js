web.init();
web.open('http://127.0.0.1:5000/');
web.selectWindow('title=Set Now');
//               id: id=services_page_link
//       xpath:link: //a[contains(text(),\'Terms Of Services\')]
// xpath:attributes: //a[@id=\'services_page_link\']
// xpath:idRelative: //div[@id=\'footercontent\']/span[16]/a
//       xpath:href: //a[@href=\'http://127.0.0.1:5000/terms-of-service\']
//   xpath:position: //span[16]/a
//             link: link=Terms Of Services
//              css: css=#services_page_link
web.click('id=services_page_link');
web.selectWindow('title=Terms Of Service');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.click('//div[@id=\'page_title\']/div/h2');
web.assertTitle('Terms Of Service');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText('//div[@id=\'page_title\']/div/h2', 'Terms Of Service');
//   xpath:position: //body/div
//              css: css=body > div
web.click('//body/div');
// xpath:idRelative: //div[@id=\'services_content\']/h3[2]
//   xpath:position: //h3[2]
//              css: css=#services_content > h3:nth-child(3)
web.assertText('//div[@id=\'services_content\']/h3[2]', '2. MIT License');
// xpath:idRelative: //div[@id=\'services_content\']/p[5]
//   xpath:position: //p[5]
//              css: css=#services_content > p:nth-child(7)
web.click('//div[@id=\'services_content\']/p[5]');
// xpath:idRelative: //div[@id=\'services_content\']/p[4]
//   xpath:position: //p[4]
//              css: css=#services_content > p:nth-child(6)
web.assertText('//div[@id=\'services_content\']/p[4]', `The above copyright notice and this permission notice shall be included in all copies or substantial
 portions
 of the Software.`);
//   xpath:position: //body/div
//              css: css=body > div
web.click('//body/div');
// xpath:idRelative: //div[@id=\'services_content\']/p[6]
//   xpath:position: //p[6]
//              css: css=#services_content > p:nth-child(11)
web.click('//div[@id=\'services_content\']/p[6]');
// xpath:idRelative: //div[@id=\'services_content\']/p[6]
//   xpath:position: //p[6]
//              css: css=#services_content > p:nth-child(11)
web.waitForText('//div[@id=\'services_content\']/p[6]', `In no event shall SetNow or its suppliers be liable for any damages (including, without limitation,
 damages
 for loss of data or profit, or due to business interruption) arising out of the use or inability to use
 the
 materials on SetNow's website, even if SetNow or a SetNow authorized representative has been notified
 orally
 or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on
 implied warranties, or limitations of liability for consequential or incidental damages, these
 limitations
 may not apply to you.`);
//               id: id=services_content
// xpath:attributes: //div[@id=\'services_content\']
// xpath:idRelative: //div[@id=\'wrapper\']/div
//   xpath:position: //div[2]/div
//              css: css=#services_content
web.click('id=services_content');
// xpath:idRelative: //div[@id=\'services_content\']/p[9]
//   xpath:position: //p[9]
//              css: css=#services_content > p:nth-child(17)
web.assertText('//div[@id=\'services_content\']/p[9]', `SetNow may revise these terms of service for its website at any time without notice. By using this
 website
 you are agreeing to be bound by the then current version of these terms of service.`);
//   xpath:position: //body/div
//              css: css=body > div
web.click('//body/div');
web.open('http://127.0.0.1:5000/');
