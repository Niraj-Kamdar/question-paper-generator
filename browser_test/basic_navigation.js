web.init();
web.open('http://localhost:5000/');
web.selectWindow('title=Index');
// xpath:idRelative: //div[@id=\'header\']/div[4]/div/a[3]/h4
//   xpath:position: //a[3]/h4
//              css: css=#header > div.col3 > div > a:nth-child(3) > h4
web.click('//div[@id=\'header\']/div[4]/div/a[3]/h4');
web.selectWindow('title=Help');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div/div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText('//div[@id=\'page_title\']/div/h2', 'Help & Support');
// xpath:idRelative: //div[@id=\'header\']/div[4]/div/a[4]/h4
//   xpath:position: //a[4]/h4
//              css: css=#header > div.col3 > div > a:nth-child(4) > h4
web.click('//div[@id=\'header\']/div[4]/div/a[4]/h4');
web.selectWindow('title=Contact Us');
// xpath:idRelative: //form[@id=\'contactForm\']/span
//   xpath:position: //form/span
//              css: css=#contactForm > span
web.assertText('//form[@id=\'contactForm\']/span', 'Get in touch');
//               id: id=policy_page_link
//       xpath:link: //a[contains(text(),\'Privacy Policy\')]
// xpath:attributes: //a[@id=\'policy_page_link\']
// xpath:idRelative: //div[@id=\'footercontent\']/div[3]/span[1]/a
//       xpath:href: //a[contains(@href, \'/privacy-policy\')]
//   xpath:position: //div[3]/span[1]/a
//             link: link=Privacy Policy
//              css: css=#policy_page_link
web.click('id=policy_page_link');
web.selectWindow('title=Privacy Policy');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div/div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText('//div[@id=\'page_title\']/div/h2', 'Privacy Policy');
//               id: id=services_page_link
//       xpath:link: //a[contains(text(),\'Terms Of Services\')]
// xpath:attributes: //a[@id=\'services_page_link\']
// xpath:idRelative: //div[@id=\'footercontent\']/div[3]/span[2]/a
//       xpath:href: //a[contains(@href, \'/terms-of-service\')]
//   xpath:position: //span[2]/a
//             link: link=Terms Of Services
//              css: css=#services_page_link
web.click('id=services_page_link');
web.selectWindow('title=Terms Of Service');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div/div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText('//div[@id=\'page_title\']/div/h2', 'Terms Of Service');
//               id: id=logo
//        xpath:img: (//img[@alt=\'logo\'])[1]
// xpath:attributes: //img[@id=\'logo\']
// xpath:idRelative: //div[@id=\'header\']/div[2]/a/img
//   xpath:position: //div[2]/a/img
//              css: css=#logo
web.click('id=logo');
web.selectWindow('title=Index');
//               id: id=get_start_link
//       xpath:link: //a[contains(text(),\'Get Started\')]
// xpath:attributes: //a[@id=\'get_start_link\']
// xpath:idRelative: //div[@id=\'get_start_container\']/div[1]/a
//       xpath:href: //a[contains(@href, \'/register\')]
//   xpath:position: //main/div/div/div[1]/div[1]/a
//             link: link=Get Started
//              css: css=#get_start_link
web.assertText('id=get_start_link', 'Get Started');
