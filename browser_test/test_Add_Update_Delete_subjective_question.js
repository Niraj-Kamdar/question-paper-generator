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
// xpath:idRelative: //form[@id=\'loginForm\']/fieldset
//   xpath:position: //fieldset
//              css: css=#loginForm > fieldset
web.click("//form[@id='loginForm']/fieldset");
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
// xpath:idRelative: //div[@id=\'manage_courses_btn\']/h1
//   xpath:position: //div[2]/div/h1
//              css: css=#manage_courses_btn > h1
web.click("//div[@id='manage_courses_btn']/h1");
web.selectWindow("title=Set Now : Home");
//       xpath:link: //a[contains(text(),\'maths\')]
// xpath:idRelative: //div[@id=\'course_container\']/div[1]/a[1]
//       xpath:href: //a[contains(@href, \'/course/2/question/sub/\')]
//   xpath:position: //div[2]/div/div/div[1]/a[1]
//             link: link=maths
//              css: css=#course_container > div.course_items > a:nth-child(1)
web.click("//a[contains(text(),'maths')]");
web.selectWindow("title=Set Now : Home");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]
//   xpath:position: //body/div/div/div/div/div[1]
//              css: css=#main_container > div > div > div.row.mb-2
web.click("//div[@id='main_container']/div/div/div[1]");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText("//div[@id='main_container']/div/div/div[1]/h1",
               "Subjective Questions");
web.assertTitle("Set Now : Home");
// xpath:idRelative: //div[@id=\'sideNav\']/div[3]/div[2]/div[2]/a
//       xpath:href:
//       //a[@href=\'http://127.0.0.1:5000/course/2/question/sub/new/\']
//   xpath:position: //div[3]/div[2]/div[2]/a
//              css: css=#sideNav > div.add_container > div.add_items_container
//              > div:nth-child(2) > a
web.click("//div[@id='sideNav']/div[3]/div[2]/div[2]/a");
web.selectWindow("title=Set Now : Home");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.click("id=form_field_question_value");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.type("id=form_field_question_value",
         "How many Prime numbers between 1 to 100?");
//               id: id=marks_value
//             name: name=mark
// xpath:attributes: //input[@id=\'marks_value\']
// xpath:idRelative: //div[@id=\'marks_label\']/div[1]/input
//   xpath:position: //div[1]/div[1]/input
//              css: css=#marks_value
web.click("id=marks_value");
//               id: id=marks_value
//             name: name=mark
// xpath:attributes: //input[@id=\'marks_value\']
// xpath:idRelative: //div[@id=\'marks_label\']/div[1]/input
//   xpath:position: //div[1]/div[1]/input
//              css: css=#marks_value
web.type("id=marks_value", "10");
//               id: id=difficulty_value
//             name: name=difficulty
// xpath:attributes: //input[@id=\'difficulty_value\']
// xpath:idRelative: //div[@id=\'difficulty_label\']/div[1]/input
//   xpath:position: //div[2]/div[1]/input
//              css: css=#difficulty_value
web.click("id=difficulty_value");
//               id: id=difficulty_value
//             name: name=difficulty
// xpath:attributes: //input[@id=\'difficulty_value\']
// xpath:idRelative: //div[@id=\'difficulty_label\']/div[1]/input
//   xpath:position: //div[2]/div[1]/input
//              css: css=#difficulty_value
web.type("id=difficulty_value", "25");
//               id: id=submit_btn
//             name: name=submit
// xpath:attributes: //input[@id=\'submit_btn\']
// xpath:idRelative: //div[@id=\'form_content\']/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#submit_btn
web.click("id=submit_btn");
web.selectWindow("title=Set Now : Home");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText("//div[@id='main_container']/div/div/div[1]/h1",
               "Subjective Questions");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]
//   xpath:position: //body/div/div/div/div/div[1]
//              css: css=#main_container > div > div > div.row.mb-2
web.click("//div[@id='main_container']/div/div/div[1]");
// xpath:idRelative:
// //div[@id=\'questions\']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//   xpath:position: //div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//              css: css=#questions > div:nth-child(2) > div.question_container
//              > div.question_info > div.second_row > div.second_row_column_2 >
//              div.question_description
web.click("//div[@id='questions']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]");
// xpath:idRelative:
// //div[@id=\'questions\']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//   xpath:position: //div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//              css: css=#questions > div:nth-child(2) > div.question_container
//              > div.question_info > div.second_row > div.second_row_column_2 >
//              div.question_description
web.assertText(
    "//div[@id='questions']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]",
    "How many Prime numbers between 1 to 100?");
//               id: id=template_display
// xpath:attributes: //div[@id=\'template_display\']
// xpath:idRelative: //div[@id=\'content\']/div[1]
//   xpath:position: //body/div/div/div/div/div[2]/div[1]
//              css: css=#template_display
web.click("id=template_display");
//        xpath:img: //img[@alt=\'edit\']
// xpath:idRelative: //div[@id=\'questions\']/div[2]/div[1]/div[3]/div/img
//   xpath:position: //div[1]/div[3]/div/img
//              css: css=#questions > div:nth-child(2) > div.question_container
//              > div.update_question > div > img
web.click("//img[@alt='edit']");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]
//   xpath:position: //body/div/div/div/div/div[1]
//              css: css=#main_container > div > div > div.row.mb-2
web.click("//div[@id='main_container']/div/div/div[1]");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText("//div[@id='main_container']/div/div/div[1]/h1",
               "Subjective Questions");
// xpath:idRelative: //div[@id=\'main_container\']/div
//   xpath:position: //body/div/div/div
//              css: css=#main_container > div
web.click("//div[@id='main_container']/div");
web.assertTitle("Set Now : Home");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.click("id=form_field_question_value");
//               id: id=form_field_question_value
//             name: name=question
// xpath:attributes: //textarea[@id=\'form_field_question_value\']
// xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
//   xpath:position: //textarea
//              css: css=#form_field_question_value
web.type("id=form_field_question_value",
         "How many Prime numbers between 2 to 50?");
//               id: id=marks_value
//             name: name=mark
// xpath:attributes: //input[@id=\'marks_value\']
// xpath:idRelative: //div[@id=\'marks_label\']/div[1]/input
//   xpath:position: //div[1]/div[1]/input
//              css: css=#marks_value
web.click("id=marks_value");
//               id: id=marks_value
//             name: name=mark
// xpath:attributes: //input[@id=\'marks_value\']
// xpath:idRelative: //div[@id=\'marks_label\']/div[1]/input
//   xpath:position: //div[1]/div[1]/input
//              css: css=#marks_value
web.type("id=marks_value", "5");
//               id: id=difficulty_value
//             name: name=difficulty
// xpath:attributes: //input[@id=\'difficulty_value\']
// xpath:idRelative: //div[@id=\'difficulty_label\']/div[1]/input
//   xpath:position: //div[2]/div[1]/input
//              css: css=#difficulty_value
web.click("id=difficulty_value");
//               id: id=difficulty_value
//             name: name=difficulty
// xpath:attributes: //input[@id=\'difficulty_value\']
// xpath:idRelative: //div[@id=\'difficulty_label\']/div[1]/input
//   xpath:position: //div[2]/div[1]/input
//              css: css=#difficulty_value
web.type("id=difficulty_value", "15");
// xpath:idRelative: //div[@id=\'form_content\']/div[3]
//   xpath:position: //form/div[1]/div[3]
//              css: css=#form_content > div.form__fields
web.click("//div[@id='form_content']/div[3]");
//               id: id=toggle_container
// xpath:attributes: //div[@id=\'toggle_container\']
// xpath:idRelative: //div[@id=\'form_content\']/div[3]/div
//   xpath:position: //form/div[1]/div[3]/div
//              css: css=#toggle_container
web.click("id=toggle_container");
//               id: id=submit_btn
//             name: name=submit
// xpath:attributes: //input[@id=\'submit_btn\']
// xpath:idRelative: //div[@id=\'form_content\']/div[4]/input
//   xpath:position: //div[4]/input
//              css: css=#submit_btn
web.click("id=submit_btn");
web.selectWindow("title=Set Now : Home");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText("//div[@id='main_container']/div/div/div[1]/h1",
               "Subjective Questions");
// xpath:idRelative: //div[@id=\'questions\']/div[2]/div[1]
//   xpath:position: //body/div/div/div/div/div[2]/div[1]/div/div[2]/div[1]
//              css: css=#questions > div:nth-child(2) > div.question_container
web.click("//div[@id='questions']/div[2]/div[1]");
web.assertTitle("Set Now : Home");
// xpath:idRelative:
// //div[@id=\'questions\']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//   xpath:position: //div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//              css: css=#questions > div:nth-child(2) > div.question_container
//              > div.question_info > div.second_row > div.second_row_column_2 >
//              div.question_description
web.click("//div[@id='questions']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]");
// xpath:idRelative:
// //div[@id=\'questions\']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//   xpath:position: //div[2]/div[1]/div[2]/div[2]/div[2]/div[1]
//              css: css=#questions > div:nth-child(2) > div.question_container
//              > div.question_info > div.second_row > div.second_row_column_2 >
//              div.question_description
web.assertText(
    "//div[@id='questions']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]",
    "How many Prime numbers between 2 to 50?");
//               id: id=template_display
// xpath:attributes: //div[@id=\'template_display\']
// xpath:idRelative: //div[@id=\'content\']/div[1]
//   xpath:position: //body/div/div/div/div/div[2]/div[1]
//              css: css=#template_display
web.click("id=template_display");
//        xpath:img: //img[@alt=\'delete\']
// xpath:idRelative: //div[@id=\'delete_btn\']/img
//   xpath:position: //div[1]/div[2]/img
//              css: css=#delete_btn > img
web.click("//img[@alt='delete']");
// xpath:attributes: (//input[@type=\'checkbox\'])[1]
// xpath:idRelative: //div[@id=\'questions\']/div[2]/div[1]/div[1]/label/input
//   xpath:position: //div[1]/label/input
//              css: css=#questions > div:nth-child(2) > div.question_container
//              > div.delete_question > label > input
web.click("(//input[@type='checkbox'])[1]");
//        xpath:img: //img[@alt=\'delete\']
// xpath:idRelative: //div[@id=\'delete_btn\']/img
//   xpath:position: //div[1]/div[2]/img
//              css: css=#delete_btn > img
web.click("//img[@alt='delete']");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]
//   xpath:position: //body/div/div/div/div/div[1]
//              css: css=#main_container > div > div > div.row.mb-2
web.click("//div[@id='main_container']/div/div/div[1]");
// xpath:idRelative: //div[@id=\'main_container\']/div/div/div[1]/h1
//   xpath:position: //h1
//              css: css=#main_container > div > div > div.row.mb-2 > h1
web.assertText("//div[@id='main_container']/div/div/div[1]/h1",
               "Subjective Questions");
//               id: id=template_display
// xpath:attributes: //div[@id=\'template_display\']
// xpath:idRelative: //div[@id=\'content\']/div[1]
//   xpath:position: //body/div/div/div/div/div[2]/div[1]
//              css: css=#template_display
web.click("id=template_display");
web.assertTitle("Set Now : Home");
//               id: id=template_display
// xpath:attributes: //div[@id=\'template_display\']
// xpath:idRelative: //div[@id=\'content\']/div[1]
//   xpath:position: //body/div/div/div/div/div[2]/div[1]
//              css: css=#template_display
web.click("id=template_display");
