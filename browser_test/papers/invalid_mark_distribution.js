
const {register, login, add_course, add_unit, paper_request} =
    require("../utils/utils");

web.init();
web.open('http://localhost:5000/');

register();
login();
add_course();
add_unit();

paper_request();

web.click('(//button[@type=\'button\'])[1]');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/div
//   xpath:position: //form/div/div[1]/div[2]/div
//              css: css=#mark_form > div > div:nth-child(2) > div.form__fields
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[1]/div[2]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[1]
//   xpath:position: //form/div/div[1]/div[1]
//              css: css=#mark_form > div > div:nth-child(2) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[1]/div[1]',
               'Total marks are not equal to paper marks!!');
//               id: id=Unit:01
//             name: name=Unit:01
// xpath:attributes: //input[@id=\'Unit:01\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/input
//   xpath:position: //div[1]/div[2]/input
//              css: css=#Unit\\:01
web.click('id=Unit:01');
//               id: id=Unit:01
//             name: name=Unit:01
// xpath:attributes: //input[@id=\'Unit:01\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/input
//   xpath:position: //div[1]/div[2]/input
//              css: css=#Unit\\:01
web.type('id=Unit:01', '7');
// xpath:attributes: (//button[@type=\'button\'])[1]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[3]/button
//   xpath:position: //div[3]/button
//              css: css=#mark_form > div > div:nth-child(2) >
//              div.navigation_btns > button
web.click('(//button[@type=\'button\'])[1]');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[1]
//   xpath:position: //form/div/div[1]/div[1]
//              css: css=#mark_form > div > div:nth-child(2) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[1]/div[1]',
               'Total marks are not equal to paper marks!!');
//               id: id=Unit:01
//             name: name=Unit:01
// xpath:attributes: //input[@id=\'Unit:01\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/input
//   xpath:position: //div[1]/div[2]/input
//              css: css=#Unit\\:01
web.click('id=Unit:01');
//               id: id=Unit:01
//             name: name=Unit:01
// xpath:attributes: //input[@id=\'Unit:01\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/input
//   xpath:position: //div[1]/div[2]/input
//              css: css=#Unit\\:01
web.type('id=Unit:01', '10');
// xpath:attributes: (//button[@type=\'button\'])[1]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[3]/button
//   xpath:position: //div[3]/button
//              css: css=#mark_form > div > div:nth-child(2) >
//              div.navigation_btns > button
web.click('(//button[@type=\'button\'])[1]');
// xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
//   xpath:position: //div/div/div[1]/h3
//              css: css=#page_display > div.mb-2 > h3
web.assertText('//div[@id=\'page_display\']/div[1]/h3', 'cognitive');
// xpath:attributes: (//button[@type=\'button\'])[3]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[5]/button[2]
//   xpath:position: //div[2]/div[5]/button[2]
//              css: css=#mark_form > div > div:nth-child(3) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[3]');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[2]/div
//   xpath:position: //div[2]/div[2]/div
//              css: css=#mark_form > div > div:nth-child(3) > div:nth-child(3)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[2]/div[2]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[3]/div
//   xpath:position: //div[2]/div[3]/div
//              css: css=#mark_form > div > div:nth-child(3) > div:nth-child(4)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[2]/div[3]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[4]/div
//   xpath:position: //div[2]/div[4]/div
//              css: css=#mark_form > div > div:nth-child(3) > div:nth-child(5)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[2]/div[4]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[1]
//   xpath:position: //form/div/div[2]/div[1]
//              css: css=#mark_form > div > div:nth-child(3) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[2]/div[1]',
               'Total marks are not equal to paper marks!!');
//               id: id=Knowledge
//             name: name=Knowledge
// xpath:attributes: //input[@id=\'Knowledge\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[2]/input
//   xpath:position: //div[2]/div[2]/input
//              css: css=#Knowledge
web.click('id=Knowledge');
//               id: id=Knowledge
//             name: name=Knowledge
// xpath:attributes: //input[@id=\'Knowledge\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[2]/input
//   xpath:position: //div[2]/div[2]/input
//              css: css=#Knowledge
web.type('id=Knowledge', '2');
//               id: id=Comprehension
//             name: name=Comprehension
// xpath:attributes: //input[@id=\'Comprehension\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[3]/input
//   xpath:position: //div[2]/div[3]/input
//              css: css=#Comprehension
web.type('id=Comprehension', '2');
//               id: id=Application
//             name: name=Application
// xpath:attributes: //input[@id=\'Application\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[4]/input
//   xpath:position: //div[2]/div[4]/input
//              css: css=#Application
web.type('id=Application', '2');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[1]
//   xpath:position: //form/div/div[2]/div[1]
//              css: css=#mark_form > div > div:nth-child(3) > div.marks_err
web.click('(//button[@type=\'button\'])[2]');
web.assertText('//form[@id=\'mark_form\']/div/div[2]/div[1]',
               'Total marks are not equal to paper marks!!');

// xpath:attributes: (//button[@type=\'button\'])[3]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[5]/button[2]
//   xpath:position: //div[2]/div[5]/button[2]
//              css: css=#mark_form > div > div:nth-child(3) >
//              div.navigation_btns > button.next_btn

web.click('id=Knowledge');
//               id: id=Knowledge
//             name: name=Knowledge
// xpath:attributes: //input[@id=\'Knowledge\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[2]/input
//   xpath:position: //div[2]/div[2]/input
//              css: css=#Knowledge
web.type('id=Knowledge', '0');
//               id: id=Comprehension
//             name: name=Comprehension
// xpath:attributes: //input[@id=\'Comprehension\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[3]/input
//   xpath:position: //div[2]/div[3]/input
//              css: css=#Comprehension
web.click('id=Comprehension');
//               id: id=Comprehension
//             name: name=Comprehension
// xpath:attributes: //input[@id=\'Comprehension\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[3]/input
//   xpath:position: //div[2]/div[3]/input
//              css: css=#Comprehension

web.type('id=Comprehension', '10');
//               id: id=Application
//             name: name=Application
// xpath:attributes: //input[@id=\'Application\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[4]/input
//   xpath:position: //div[2]/div[4]/input
//              css: css=#Application
web.click('id=Application');
//               id: id=Application
//             name: name=Application
// xpath:attributes: //input[@id=\'Application\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[4]/input
//   xpath:position: //div[2]/div[4]/input
//              css: css=#Application
web.type('id=Application', '0');
// xpath:attributes: (//button[@type=\'button\'])[3]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[5]/button[2]
//   xpath:position: //div[2]/div[5]/button[2]
//              css: css=#mark_form > div > div:nth-child(3) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[3]');
// xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
//   xpath:position: //div/div/div[1]/h3
//              css: css=#page_display > div.mb-2 > h3
web.assertText('//div[@id=\'page_display\']/div[1]/h3', 'difficulty');
// xpath:attributes: (//button[@type=\'button\'])[5]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[5]/button[2]
//   xpath:position: //div[3]/div[5]/button[2]
//              css: css=#mark_form > div > div:nth-child(4) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[5]');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[2]/div
//   xpath:position: //div[3]/div[2]/div
//              css: css=#mark_form > div > div:nth-child(4) > div:nth-child(3)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[3]/div[2]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[3]/div
//   xpath:position: //div[3]/div[3]/div
//              css: css=#mark_form > div > div:nth-child(4) > div:nth-child(4)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[3]/div[3]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[4]/div
//   xpath:position: //div[3]/div[4]/div
//              css: css=#mark_form > div > div:nth-child(4) > div:nth-child(5)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[3]/div[4]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[1]
//   xpath:position: //form/div/div[3]/div[1]
//              css: css=#mark_form > div > div:nth-child(4) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[3]/div[1]',
               'Total marks are not equal to paper marks!!');
//               id: id=Easy
//             name: name=Easy
// xpath:attributes: //input[@id=\'Easy\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[2]/input
//   xpath:position: //div[3]/div[2]/input
//              css: css=#Easy
web.click('id=Easy');
//               id: id=Easy
//             name: name=Easy
// xpath:attributes: //input[@id=\'Easy\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[2]/input
//   xpath:position: //div[3]/div[2]/input
//              css: css=#Easy
web.type('id=Easy', '2');
//               id: id=Medium
//             name: name=Medium
// xpath:attributes: //input[@id=\'Medium\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[3]/input
//   xpath:position: //div[3]/div[3]/input
//              css: css=#Medium
web.type('id=Medium', '2');
//               id: id=Hard
//             name: name=Hard
// xpath:attributes: //input[@id=\'Hard\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[4]/input
//   xpath:position: //div[3]/div[4]/input
//              css: css=#Hard
web.type('id=Hard', '2');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[1]
//   xpath:position: //form/div/div[3]/div[1]
//              css: css=#mark_form > div > div:nth-child(4) > div.marks_err
web.click('(//button[@type=\'button\'])[4]');
web.assertText('//form[@id=\'mark_form\']/div/div[3]/div[1]',
               'Total marks are not equal to paper marks!!');
// xpath:attributes: (//button[@type=\'button\'])[5]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[5]/button[2]
//   xpath:position: //div[3]/div[5]/button[2]
//              css: css=#mark_form > div > div:nth-child(4) >
//              div.navigation_btns > button.next_btn
web.click('id=Easy');
//               id: id=Easy
//             name: name=Easy
// xpath:attributes: //input[@id=\'Easy\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[2]/input
//   xpath:position: //div[3]/div[2]/input
//              css: css=#Easy
web.type('id=Easy', '0');
//               id: id=Medium
//             name: name=Medium
// xpath:attributes: //input[@id=\'Medium\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[3]/input
//   xpath:position: //div[3]/div[3]/input
//              css: css=#Medium
web.click('id=Medium');
//               id: id=Medium
//             name: name=Medium
// xpath:attributes: //input[@id=\'Medium\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[3]/input
//   xpath:position: //div[3]/div[3]/input
//              css: css=#Medium
web.type('id=Medium', '10');
//               id: id=Hard
//             name: name=Hard
// xpath:attributes: //input[@id=\'Hard\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[4]/input
//   xpath:position: //div[3]/div[4]/input
//              css: css=#Hard
web.click('id=Hard');
//               id: id=Hard
//             name: name=Hard
// xpath:attributes: //input[@id=\'Hard\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[4]/input
//   xpath:position: //div[3]/div[4]/input
//              css: css=#Hard
web.type('id=Hard', '0');
// xpath:attributes: (//button[@type=\'button\'])[5]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[5]/button[2]
//   xpath:position: //div[3]/div[5]/button[2]
//              css: css=#mark_form > div > div:nth-child(4) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[5]');

// xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
//   xpath:position: //div/div/div[1]/h3
//              css: css=#page_display > div.mb-2 > h3
web.assertText('//div[@id=\'page_display\']/div[1]/h3', 'question_type');
// xpath:attributes: (//button[@type=\'button\'])[7]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[4]/button[2]
//   xpath:position: //div[4]/div[4]/button[2]
//              css: css=#mark_form > div > div:nth-child(5) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[7]');
//               id: id=sub
//             name: name=sub
// xpath:attributes: //input[@id=\'sub\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[2]/input
//   xpath:position: //div[4]/div[2]/input
//              css: css=#sub
web.assertText('//form[@id=\'mark_form\']/div/div[4]/div[2]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[3]/div
//   xpath:position: //div[4]/div[3]/div
//              css: css=#mark_form > div > div:nth-child(5) > div:nth-child(4)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[4]/div[3]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[1]
//   xpath:position: //form/div/div[4]/div[1]
//              css: css=#mark_form > div > div:nth-child(5) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[4]/div[1]',
               'Total marks are not equal to paper marks!!');
//               id: id=sub
//             name: name=sub
// xpath:attributes: //input[@id=\'sub\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[2]/input
//   xpath:position: //div[4]/div[2]/input
//              css: css=#sub
web.click('id=sub');
//               id: id=sub
//             name: name=sub
// xpath:attributes: //input[@id=\'sub\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[2]/input
//   xpath:position: //div[4]/div[2]/input
//              css: css=#sub
web.type('id=sub', '2');
//               id: id=mcq
//             name: name=mcq
// xpath:attributes: //input[@id=\'mcq\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[3]/input
//   xpath:position: //div[4]/div[3]/input
//              css: css=#mcq
web.click('id=mcq');
//               id: id=mcq
//             name: name=mcq
// xpath:attributes: //input[@id=\'mcq\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[3]/input
//   xpath:position: //div[4]/div[3]/input
//              css: css=#mcq
web.type('id=mcq', '2');
// xpath:attributes: (//button[@type=\'button\'])[7]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[4]/button[2]
//   xpath:position: //div[4]/div[4]/button[2]
//              css: css=#mark_form > div > div:nth-child(5) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[6]');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[1]
//   xpath:position: //form/div/div[4]/div[1]
//              css: css=#mark_form > div > div:nth-child(5) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[4]/div[1]',
               'Total marks are not equal to paper marks!!');
//               id: id=sub
//             name: name=sub
// xpath:attributes: //input[@id=\'sub\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[2]/input
//   xpath:position: //div[4]/div[2]/input
//              css: css=#sub
web.click('id=sub');
//               id: id=sub
//             name: name=sub
// xpath:attributes: //input[@id=\'sub\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[2]/input
//   xpath:position: //div[4]/div[2]/input
//              css: css=#sub
web.type('id=sub', '5');
//               id: id=mcq
//             name: name=mcq
// xpath:attributes: //input[@id=\'mcq\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[3]/input
//   xpath:position: //div[4]/div[3]/input
//              css: css=#mcq
web.click('id=mcq');
// xpath:attributes: (//button[@type=\'button\'])[7]
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[4]/button[2]
//   xpath:position: //div[4]/div[4]/button[2]
//              css: css=#mark_form > div > div:nth-child(5) >
//              div.navigation_btns > button.next_btn
web.type('id=mcq', '5');
web.click('(//button[@type=\'button\'])[7]');
// xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
//   xpath:position: //div/div/div[1]/h3
//              css: css=#page_display > div.mb-2 > h3
web.assertText('//div[@id=\'page_display\']/div[1]/h3', 'question');

// xpath:attributes: //button[@type=\'submit\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[4]/button[2]
//   xpath:position: //div[5]/div[4]/button[2]
//              css: css=#mark_form > div > div:nth-child(6) >
//              div.navigation_btns > button.next_btn
web.click('//button[@type=\'submit\']');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[1]
//   xpath:position: //div[5]/div[1]
//              css: css=#mark_form > div > div:nth-child(6) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[5]/div[1]',
               'Total marks are not equal to paper marks!!');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[2]/div
//   xpath:position: //div[5]/div[2]/div
//              css: css=#mark_form > div > div:nth-child(6) > div:nth-child(3)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[5]/div[2]/div',
               'Enter Marks in Integers');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[3]/div
//   xpath:position: //div[5]/div[3]/div
//              css: css=#mark_form > div > div:nth-child(6) > div:nth-child(4)
//              > div
web.assertText('//form[@id=\'mark_form\']/div/div[5]/div[3]/div',
               'Enter Marks in Integers');
//               id: id=Que.1.A
//             name: name=Que.1.A
// xpath:attributes: //input[@id=\'Que.1.A\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[2]/input
//   xpath:position: //div[5]/div[2]/input
//              css: css=#Que\\.1\\.A
web.click('id=Que.1.A');
//               id: id=Que.1.A
//             name: name=Que.1.A
// xpath:attributes: //input[@id=\'Que.1.A\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[2]/input
//   xpath:position: //div[5]/div[2]/input
//              css: css=#Que\\.1\\.A
web.type('id=Que.1.A', '3');
//               id: id=Que.2.A
//             name: name=Que.2.A
// xpath:attributes: //input[@id=\'Que.2.A\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[3]/input
//   xpath:position: //div[5]/div[3]/input
//              css: css=#Que\\.2\\.A
web.type('id=Que.2.A', '4');
// xpath:attributes: //button[@type=\'submit\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[4]/button[2]
//   xpath:position: //div[5]/div[4]/button[2]
//              css: css=#mark_form > div > div:nth-child(6) >
//              div.navigation_btns > button.next_btn
web.click('(//button[@type=\'button\'])[8]');
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[1]
//   xpath:position: //div[5]/div[1]
//              css: css=#mark_form > div > div:nth-child(6) > div.marks_err
web.assertText('//form[@id=\'mark_form\']/div/div[5]/div[1]',
               'Total marks are not equal to paper marks!!');

//               id: id=Que.1.A
//             name: name=Que.1.A
// xpath:attributes: //input[@id=\'Que.1.A\']
// xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[2]/input
//   xpath:position: //div[5]/div[2]/input
//              css: css=#Que\\.1\\.A
