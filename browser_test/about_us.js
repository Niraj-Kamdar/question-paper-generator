web.init();
web.open('http://localhost:5000/');
web.selectWindow('title=Index');
// xpath:idRelative: //div[@id=\'header\']/div[4]/div/a[2]/h4
//   xpath:position: //a[2]/h4
//              css: css=#header > div.col3 > div > a:nth-child(2) > h4
web.click('//div[@id=\'header\']/div[4]/div/a[2]/h4');
web.selectWindow('title=About Us');
// xpath:idRelative: //div[@id=\'page_title\']/div/h2
//   xpath:position: //div/div/div/div[1]/div/h2
//              css: css=#page_title > div > h2
web.assertText('//div[@id=\'page_title\']/div/h2', 'About Us');
