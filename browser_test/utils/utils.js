function register(checking) {
  web.selectWindow("title=Index");
  web.click("id=get_start_link");
  web.selectWindow("title=Register");
  web.click("id=username");
  web.type("id=username", "CT7567T");
  web.click("id=email");
  web.type("id=email", "201701176@daiict.ac.in");
  web.click("id=password");
  web.type("id=password", "12345678");
  web.click("id=confirm_password");
  web.type("id=confirm_password", "12345678");
  web.click("id=submit");
  if (checking) {
    let status = web.isExist("//form[@id='registerForm']");
    if (!status) {
      status = web.isExist("//form[@id='loginForm']");
      if (!status) {
        throw new Error("Not Registered");
      }
    }
  }
}

function login(checking) {
  // xpath:idRelative: //div[@id=\'header\']/div[4]/div/a[5]/h4
  //   xpath:position: //a[5]/h4
  //              css: css=#header > div.col3 > div > a:nth-child(5) > h4
  let status = web.isExist("//form[@id='registerForm']");
  if (status) {
    web.click("//div[@id='header']/div[4]/div/a[5]/h4");
  }
  web.selectWindow("title=Login");
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
  web.type("id=email", "201701176@daiict.ac.in");
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
  web.type("id=password", "12345678");
  //               id: id=submit
  //             name: name=submit
  // xpath:attributes: //input[@id=\'submit\']
  // xpath:idRelative: //form[@id=\'loginForm\']/div/input
  //   xpath:position: //form/div/input
  //              css: css=#submit
  web.click("id=submit");
  if (checking) {
    web.assertText("//div[@id='page_display']/div[1]/h1", "Recent");
  }
}

function add_course(checking) {
  web.click("//a[@id='manage_courses_btn']/h1");
  let count = web.isExist("//a[@class='course_item']", 0);
  if (!count) {
    web.selectWindow("title=Courses");
    // xpath:idRelative: //div[@id=\'add_course_container\']/a/div
    //   xpath:position: //div[2]/a/div
    //              css: css=#add_course_container > a > div
    web.click("//div[@id='add_course_container']/a/div");
    web.selectWindow("title=Add Courses");
    //               id: id=form__fields__course
    //             name: name=course
    // xpath:attributes: //input[@id=\'form__fields__course\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
    //   xpath:position: //div[1]/input
    //              css: css=#form__fields__course
    web.click("id=form__fields__course");
    //               id: id=form__fields__course
    //             name: name=course
    // xpath:attributes: //input[@id=\'form__fields__course\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
    //   xpath:position: //div[1]/input
    //              css: css=#form__fields__course
    web.type("id=form__fields__course", "WEB");
    //               id: id=submit_btn
    //             name: name=submit
    // xpath:attributes: //input[@id=\'submit_btn\']
    // xpath:idRelative: //div[@id=\'submit_reset_container\']/input
    //   xpath:position: //div[3]/input
    //              css: css=#submit_btn
    web.click("id=submit_btn");
    if (checking) {
      let count2 = web.isExist("//a[@class='course_item']", 10000);
      if (!count2) {
        throw new Error("Course not Added");
      }
    }
  }
}

function remove_course(checking) {
  web.click("//div[@id='add_course_container']/button/div");
  // xpath:attributes: //input[@type=\'checkbox\']
  // xpath:idRelative: //div[@id=\'course_container\']/div[1]/div/label/input
  //   xpath:position: //input
  //              css: css=#course_container > div.course_items > div > label >
  //              input
  web.click("//input[@type='checkbox']");
  // xpath:idRelative: //div[@id=\'add_course_container\']/button/div
  //   xpath:position: //div[2]/button/div
  //              css: css=#add_course_container > button > div
  web.click("//div[@id='add_course_container']/button/div");

  if (checking) {
    web.waitForNotExist("//a[@class='course_item']", 10000);
    let count = web.isExist("//a[@class='course_item']", 0);
    if (count) {
      throw new Error("Course not deleted");
    }
  }
}

function add_unit(checking) {
  web.click("//a[contains(text(),'WEB')]");
  const count = web.getElementCount("//a[@class='unit_item']");
  if (!count) {
    web.click("//a[@id='add_unit']/div");
    web.click("id=form__fields__chapter_no");
    //               id: id=form__fields__chapter_no
    //             name: name=chapter_no
    // xpath:attributes: //input[@id=\'form__fields__chapter_no\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
    //   xpath:position: //div[1]/input
    //              css: css=#form__fields__chapter_no
    web.type("id=form__fields__chapter_no", "1");
    //               id: id=form__fields__name
    //             name: name=name
    // xpath:attributes: //input[@id=\'form__fields__name\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[2]/input
    //   xpath:position: //div[2]/input
    //              css: css=#form__fields__name
    web.click("id=form__fields__name");
    //               id: id=form__fields__name
    //             name: name=name
    // xpath:attributes: //input[@id=\'form__fields__name\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[2]/input
    //   xpath:position: //div[2]/input
    //              css: css=#form__fields__name
    web.type("id=form__fields__name", "Introduction");
    //               id: id=submit_btn
    //             name: name=submit
    // xpath:attributes: //input[@id=\'submit_btn\']
    // xpath:idRelative: //div[@id=\'submit_reset_container\']/input
    //   xpath:position: //div[3]/input
    //              css: css=#submit_btn
    web.click("id=submit_btn");

    if (checking) {
      web.waitForExist("//a[@class='unit_item']", 10000);
      let count = web.getElementCount("//a[@class='unit_item']");
      if (!count) {
        throw new Error("Unit not added");
      }
    }
  }
}

function remove_unit(checking) {
  web.click("//button[@id='delete_unit']/div");
  // xpath:attributes: //input[@type=\'checkbox\']
  // xpath:idRelative: //div[@id=\'unit_container\']/div[2]/div/label/input
  //   xpath:position: //input
  //              css: css=#unit_container > div.unit_items > div > label >
  //              input
  web.click("//input[@type='checkbox']");
  // xpath:idRelative: //button[@id=\'delete_unit\']/div
  //   xpath:position: //div[3]/button/div
  //              css: css=#delete_unit > div
  web.click("//button[@id='delete_unit']/div");

  if (checking) {
    web.waitForNotExist("//a[@class='unit_item']", 10000);
    let count = web.isExist("//a[@class='unit_item']", 0);
    if (count) {
      throw new Error("Unit not deleted");
    }
  }
}

function add_sub(checking) {
  web.click("(//a[@class='unit_item'])[1]");
  const count = web.getElementCount("//div[@class='question_container']");
  if (!count) {
    web.click("//div[@id='sideNav']/div[3]/div[2]/div[2]/a");
    web.selectWindow("title=Add Subjective Question");
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
    web.type("id=form_field_question_value", "who is yoda?");
    //               id: id=marks_value
    //             name: name=mark
    // xpath:attributes: //input[@id=\'marks_value\']
    // xpath:idRelative: //div[@id=\'marks_label\']/div[1]/input
    //   xpath:position: //div[1]/input
    //              css: css=#marks_value
    web.click("id=marks_value");
    //               id: id=marks_value
    //             name: name=mark
    // xpath:attributes: //input[@id=\'marks_value\']
    // xpath:idRelative: //div[@id=\'marks_label\']/div[1]/input
    //   xpath:position: //div[1]/input
    //              css: css=#marks_value
    web.type("id=marks_value", "5");
    //               id: id=difficulty_value
    //             name: name=difficulty
    // xpath:attributes: //select[@id=\'difficulty_value\']
    // xpath:idRelative: //div[@id=\'difficulty_label\']/div/select
    //   xpath:position: //div[2]/div/select
    //              css: css=#difficulty_value
    web.click("id=difficulty_value");
    //               id: id=difficulty_value
    //             name: name=difficulty
    // xpath:attributes: //select[@id=\'difficulty_value\']
    // xpath:idRelative: //div[@id=\'difficulty_label\']/div/select
    //   xpath:position: //div[2]/div/select
    //              css: css=#difficulty_value
    web.select("id=difficulty_value", "label=Medium");
    //               id: id=cognitive_value
    //             name: name=cognitive_level
    // xpath:attributes: //select[@id=\'cognitive_value\']
    // xpath:idRelative: //div[@id=\'cognitive_label\']/div/select
    //   xpath:position: //div[3]/div/div/select
    //              css: css=#cognitive_value
    web.click("id=cognitive_value");
    //               id: id=cognitive_value
    //             name: name=cognitive_level
    // xpath:attributes: //select[@id=\'cognitive_value\']
    // xpath:idRelative: //div[@id=\'cognitive_label\']/div/select
    //   xpath:position: //div[3]/div/div/select
    //              css: css=#cognitive_value
    web.select("id=cognitive_value", "label=Comprehension");
    //               id: id=submit_btn
    //             name: name=submit
    // xpath:attributes: //input[@id=\'submit_btn\']
    // xpath:idRelative: //div[@id=\'submit_reset_container\']/input
    //   xpath:position: //div[5]/input
    //              css: css=#submit_btn
    web.click("id=submit_btn");

    if (checking) {
      web.assertText(
        "//div[@id='questions']/div[2]/div/div[2]/div[2]/div/span[2]",
        "5"
      );
      // xpath:idRelative:
      // //div[@id=\'questions\']/div[2]/div/div[2]/div[3]/div/span[2]
      //   xpath:position: //div[3]/div/span[2]
      //              css: css=#questions > div:nth-child(2) > div >
      //              div.question_info > div.third_row > div >
      //              span.difficulty.medium
      web.assertText(
        "//div[@id='questions']/div[2]/div/div[2]/div[3]/div/span[2]",
        "Medium"
      );
      // xpath:idRelative:
      // //div[@id=\'questions\']/div[2]/div/div[2]/div[4]/div/span[2]
      //   xpath:position: //div[4]/div/span[2]
      //              css: css=#questions > div:nth-child(2) > div >
      //              div.question_info > div.fourth_row > div >
      //              span.cognitive.comprehension
      web.assertText(
        "//div[@id='questions']/div[2]/div/div[2]/div[4]/div/span[2]",
        "Comprehension"
      );
      // xpath:idRelative: //div[@id=\'questions\']/div[2]/div/div[2]/div[5]/div
      //   xpath:position: //div[5]/div
      //              css: css=#questions > div:nth-child(2) > div >
      //              div.question_info > div.fifth_row > div
      web.assertText(
        "//div[@id='questions']/div[2]/div/div[2]/div[5]/div",
        "who is yoda?"
      );
    }
  }
}

function delete_sub(checking) {
  let count = web.getElementCount("//div[@class='question_container']");
  if (count) {
    web.click("//img[@alt='delete']");
    // xpath:attributes: (//input[@type=\'checkbox\'])[1]
    // xpath:idRelative: //div[@id=\'questions\']/div[2]/div/div[1]/label/input
    //   xpath:position: //div[1]/label/input
    //              css: css=#questions > div:nth-child(2) > div >
    //              div.delete_question > label > input
    web.click("(//input[@type='checkbox'])[1]");
    //        xpath:img: //img[@alt=\'delete\']
    // xpath:idRelative: //div[@id=\'delete_btn\']/img
    //   xpath:position: //div[1]/div[2]/img
    //              css: css=#delete_btn > img
    web.click("//img[@alt='delete']");

    if (checking) {
      web.waitForNotExist("//div[@class='question_container']");
      const count = web.getElementCount("//div[@class='question_container']");
      if (count) {
        throw new Error("Question is not deleted");
      }
    }
  }
}

function add_mcq(checking) {
  web.click("//div[@id='unit_container']/div[2]/div/a");
  web.click("//div[@id='sideNav']/div[2]/div[2]/div[1]/a");
  let status = web.isExist("//div[@class='question_container']");
  if (!status) {
    web.click("//div[@id='sideNav']/div[3]/div[2]/div[1]/a");
    web.selectWindow("title=Add Objective Question");
    //               id: id=form_field_question_value
    //             name: name=question
    // xpath:attributes: //textarea[@id=\'form_field_question_value\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
    //   xpath:position: //div[1]/textarea
    //              css: css=#form_field_question_value
    web.click("id=form_field_question_value");
    //               id: id=form_field_question_value
    //             name: name=question
    // xpath:attributes: //textarea[@id=\'form_field_question_value\']
    // xpath:idRelative: //div[@id=\'form_content\']/div[1]/div[1]/textarea
    //   xpath:position: //div[1]/textarea
    //              css: css=#form_field_question_value
    web.type("id=form_field_question_value", "who is boba fett?");
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
    // xpath:attributes: //select[@id=\'difficulty_value\']
    // xpath:idRelative: //div[@id=\'difficulty_label\']/div/select
    //   xpath:position: //div[2]/div/select
    //              css: css=#difficulty_value
    web.click("id=difficulty_value");
    //               id: id=difficulty_value
    //             name: name=difficulty
    // xpath:attributes: //select[@id=\'difficulty_value\']
    // xpath:idRelative: //div[@id=\'difficulty_label\']/div/select
    //   xpath:position: //div[2]/div/select
    //              css: css=#difficulty_value
    web.select("id=difficulty_value", "label=Medium");
    //               id: id=cognitive_value
    //             name: name=cognitive_level
    // xpath:attributes: //select[@id=\'cognitive_value\']
    // xpath:idRelative: //div[@id=\'cognitive_label\']/div/select
    //   xpath:position: //div[3]/div/div/select
    //              css: css=#cognitive_value
    web.click("id=cognitive_value");
    //               id: id=cognitive_value
    //             name: name=cognitive_level
    // xpath:attributes: //select[@id=\'cognitive_value\']
    // xpath:idRelative: //div[@id=\'cognitive_label\']/div/select
    //   xpath:position: //div[3]/div/div/select
    //              css: css=#cognitive_value
    web.select("id=cognitive_value", "label=Comprehension");
    // xpath:idRelative: //div[@id=\'options\']/div[1]/label[1]/textarea
    //   xpath:position: //div[1]/label[1]/textarea
    //              css: css=#options > div:nth-child(1) > label.fake_label >
    //              textarea
    web.click("//div[@id='options']/div[1]/label[1]/textarea");
    // xpath:idRelative: //div[@id=\'options\']/div[1]/label[1]/textarea
    //   xpath:position: //div[1]/label[1]/textarea
    //              css: css=#options > div:nth-child(1) > label.fake_label >
    //              textarea
    web.type(
      "//div[@id='options']/div[1]/label[1]/textarea",
      "a bounty hunter?"
    );
    // xpath:idRelative: //div[@id=\'options\']/div[3]/label[1]/textarea
    //   xpath:position: //div[3]/label[1]/textarea
    //              css: css=#options > div:nth-child(3) > label.fake_label >
    //              textarea
    web.click("//div[@id='options']/div[3]/label[1]/textarea");
    // xpath:idRelative: //div[@id=\'options\']/div[3]/label[1]/textarea
    //   xpath:position: //div[3]/label[1]/textarea
    //              css: css=#options > div:nth-child(3) > label.fake_label >
    //              textarea
    web.type("//div[@id='options']/div[3]/label[1]/textarea", "mandalorian");
    // xpath:idRelative: //div[@id=\'options\']/div[5]/label[1]/textarea
    //   xpath:position: //div[5]/label[1]/textarea
    //              css: css=#options > div:nth-child(5) > label.fake_label >
    //              textarea
    web.click("//div[@id='options']/div[5]/label[1]/textarea");
    // xpath:idRelative: //div[@id=\'options\']/div[5]/label[1]/textarea
    //   xpath:position: //div[5]/label[1]/textarea
    //              css: css=#options > div:nth-child(5) > label.fake_label >
    //              textarea
    web.type("//div[@id='options']/div[5]/label[1]/textarea", "both ");
    // xpath:idRelative: //div[@id=\'options\']/div[7]/label[1]/textarea
    //   xpath:position: //div[7]/label[1]/textarea
    //              css: css=#options > div:nth-child(7) > label.fake_label >
    //              textarea
    web.type("//div[@id='options']/div[7]/label[1]/textarea", "none");
    //               id: id=submit_btn
    //             name: name=submit
    // xpath:attributes: //input[@id=\'submit_btn\']
    // xpath:idRelative: //div[@id=\'submit_reset_container\']/input
    //   xpath:position: //div[6]/input
    //              css: css=#submit_btn
    web.click("id=submit_btn");
    if (checking) {
      web.waitForExist("//div[@class='question_container']");
      const count = web.getElementCount("//div[@class='question_container']");
      if (!count) {
        throw new Error("mcq is not added");
      }
    }
  }
}

function delete_mcq(checking) {
  // let status = web.isExist('//div[@id=\'questions\']');
  // if(!status){
  //    web.click('//div[@id=\'unit_container\']/div[2]/div/a');
  // }
  // web.click('//div[@id=\'sideNav\']/div[2]/div[2]/div[1]/a');
  let status = web.isExist("//div[@class='question_container']");
  if (status) {
    web.click("//img[@alt='delete']");
    // xpath:attributes: (//input[@type=\'checkbox\'])[1]
    // xpath:idRelative: //div[@id=\'questions\']/div[2]/div/div[1]/label/input
    //   xpath:position: //div[1]/label/input
    //              css: css=#questions > div:nth-child(2) > div >
    //              div.delete_question > label > input
    web.click("(//input[@type='checkbox'])[1]");
    //        xpath:img: //img[@alt=\'delete\']
    // xpath:idRelative: //div[@id=\'delete_btn\']/img
    //   xpath:position: //div[1]/div[2]/img
    //              css: css=#delete_btn > img
    web.click("//img[@alt='delete']");
    if (checking) {
      web.waitForNotExist("//div[@class='question_container']");
      const count = web.getElementCount("//div[@class='question_container']");
      if (count) {
        throw new Error("mcq is not deleted");
      }
    }
  }
}

function paper_request(checking) {
  const status = web.isExist("//div[@id='questions']");
  if (status) {
    web.click("(//a[contains(text(),'WEB')])[2]");
  }

  web.click("//a[@id='generate_paper']/div");
  web.click("id=number_of_questions");
  //               id: id=number_of_questions
  // xpath:attributes: //input[@id=\'number_of_questions\']
  // xpath:idRelative: //form[@id=\'questions\']/div/div[1]/input
  //   xpath:position: //div[1]/input
  //              css: css=#number_of_questions
  web.type("id=number_of_questions", "2");
  //               id: id=next_1
  // xpath:attributes: //button[@id=\'next_1\']
  // xpath:idRelative: //form[@id=\'questions\']/div/div[2]/button
  //   xpath:position: //div[2]/button
  //              css: css=#next_1
  web.click("id=next_1");
  //               id: id=back_1
  // xpath:attributes: //button[@id=\'back_1\']
  // xpath:idRelative: //form[@id=\'subquestions\']/div/div[3]/button[1]
  //   xpath:position: //div[3]/button[1]
  //              css: css=#back_1
  web.assertText("id=back_1", "Back");
  //               id: id=next_2
  // xpath:attributes: //button[@id=\'next_2\']
  // xpath:idRelative: //form[@id=\'subquestions\']/div/div[3]/button[2]
  //   xpath:position: //button[2]
  //              css: css=#next_2

  if (checking) {
    let count = web.getElementCount("//input[@class='subquestions']");
    count = count + web.getElementCount("//input[@id='marks']");
    assert.equal(count, 3);
  }

  //               id: id=subquestions_1
  // xpath:attributes: //input[@id=\'subquestions_1\']
  // xpath:idRelative: //div[@id=\'dynamic_content\']/div[1]/input
  //   xpath:position: //div/div[1]/div[1]/input
  //              css: css=#subquestions_1
  web.click("id=subquestions_1");
  //               id: id=subquestions_1
  // xpath:attributes: //input[@id=\'subquestions_1\']
  // xpath:idRelative: //div[@id=\'dynamic_content\']/div[1]/input
  //   xpath:position: //div/div[1]/div[1]/input
  //              css: css=#subquestions_1
  web.type("id=subquestions_1", "1");
  //               id: id=subquestions_2
  // xpath:attributes: //input[@id=\'subquestions_2\']
  // xpath:idRelative: //div[@id=\'dynamic_content\']/div[2]/input
  //   xpath:position: //div/div[1]/div[2]/input
  //              css: css=#subquestions_2
  web.type("id=subquestions_2", "1");
  //               id: id=marks
  // xpath:attributes: //input[@id=\'marks\']
  // xpath:idRelative: //form[@id=\'subquestions\']/div/div[2]/input
  //   xpath:position: //form/div/div[2]/input
  //              css: css=#marks
  web.type("id=marks", "10");
  // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
  //   xpath:position: //div/div/div[1]/h3
  //              css: css=#page_display > div.mb-2 > h3
  if (checking) {
    web.click("id=back_1");
    const status = web.isExist("//button[@id='next_1']");
    if (!status) {
      throw new Error("back link not working");
    } else {
      web.click("id=next_1");
    }
  }
  web.click("id=next_2");
  if (checking) {
    web.assertText("//div[@id='page_display']/div[1]/h3", "unit");
  }
}

function mark_distribution(checking) {
  //               id: id=Unit:01
  //             name: name=Unit:01
  // xpath:attributes: //input[@id=\'Unit:01\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/input
  //   xpath:position: //div[1]/div[2]/input
  //              css: css=#Unit\\:01
  web.click("id=Unit:01");
  //               id: id=Unit:01
  //             name: name=Unit:01
  // xpath:attributes: //input[@id=\'Unit:01\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[2]/input
  //   xpath:position: //div[1]/div[2]/input
  //              css: css=#Unit\\:01
  web.type("id=Unit:01", "10");
  // xpath:attributes: (//button[@type=\'button\'])[1]
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[3]/button
  //   xpath:position: //div[3]/button
  //              css: css=#mark_form > div > div:nth-child(2) >
  //              div.navigation_btns > button
  web.click("(//button[@type='button'])[1]");
  // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
  //   xpath:position: //div/div/div[1]/h3
  //              css: css=#page_display > div.mb-2 > h3
  if (checking) {
    web.assertText("//div[@id='page_display']/div[1]/h3", "cognitive");
  }

  web.click("id=Knowledge");
  //               id: id=Knowledge
  //             name: name=Knowledge
  // xpath:attributes: //input[@id=\'Knowledge\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[2]/input
  //   xpath:position: //div[2]/div[2]/input
  //              css: css=#Knowledge
  web.type("id=Knowledge", "0");
  //               id: id=Comprehension
  //             name: name=Comprehension
  // xpath:attributes: //input[@id=\'Comprehension\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[3]/input
  //   xpath:position: //div[2]/div[3]/input
  //              css: css=#Comprehension
  web.click("id=Comprehension");
  //               id: id=Comprehension
  //             name: name=Comprehension
  // xpath:attributes: //input[@id=\'Comprehension\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[3]/input
  //   xpath:position: //div[2]/div[3]/input
  //              css: css=#Comprehension

  web.type("id=Comprehension", "10");
  //               id: id=Application
  //             name: name=Application
  // xpath:attributes: //input[@id=\'Application\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[4]/input
  //   xpath:position: //div[2]/div[4]/input
  //              css: css=#Application
  web.click("id=Application");
  //               id: id=Application
  //             name: name=Application
  // xpath:attributes: //input[@id=\'Application\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[4]/input
  //   xpath:position: //div[2]/div[4]/input
  //              css: css=#Application
  web.type("id=Application", "0");
  // xpath:attributes: (//button[@type=\'button\'])[3]
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[5]/button[2]
  //   xpath:position: //div[2]/div[5]/button[2]
  //              css: css=#mark_form > div > div:nth-child(3) >
  //              div.navigation_btns > button.next_btn

  if (checking) {
    web.click("(//button[@type='button'])[2]");
    // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
    //   xpath:position: //div/div/div[1]/h3
    //              css: css=#page_display > div.mb-2 > h3
    web.assertText("//div[@id='page_display']/div[1]/h3", "unit");
    // xpath:attributes: (//button[@type=\'button\'])[1]
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[1]/div[3]/button
    //   xpath:position: //div[3]/button
    //              css: css=#mark_form > div > div:nth-child(2) >
    //              div.navigation_btns > button
    web.click("(//button[@type='button'])[1]");
    // xpath:attributes: (//button[@type=\'button\'])[3]
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[5]/button[2]
    //   xpath:position: //div[2]/div[5]/button[2]
    //              css: css=#mark_form > div > div:nth-child(3) >
    //              div.navigation_btns > button.next_btn
  }

  web.click("(//button[@type='button'])[3]");
  // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
  //   xpath:position: //div/div/div[1]/h3
  //              css: css=#page_display > div.mb-2 > h3
  if (checking) {
    web.assertText("//div[@id='page_display']/div[1]/h3", "difficulty");
  }

  web.click("id=Easy");
  //               id: id=Easy
  //             name: name=Easy
  // xpath:attributes: //input[@id=\'Easy\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[2]/input
  //   xpath:position: //div[3]/div[2]/input
  //              css: css=#Easy
  web.type("id=Easy", "0");
  //               id: id=Medium
  //             name: name=Medium
  // xpath:attributes: //input[@id=\'Medium\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[3]/input
  //   xpath:position: //div[3]/div[3]/input
  //              css: css=#Medium
  web.click("id=Medium");
  //               id: id=Medium
  //             name: name=Medium
  // xpath:attributes: //input[@id=\'Medium\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[3]/input
  //   xpath:position: //div[3]/div[3]/input
  //              css: css=#Medium
  web.type("id=Medium", "10");
  //               id: id=Hard
  //             name: name=Hard
  // xpath:attributes: //input[@id=\'Hard\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[4]/input
  //   xpath:position: //div[3]/div[4]/input
  //              css: css=#Hard
  web.click("id=Hard");
  //               id: id=Hard
  //             name: name=Hard
  // xpath:attributes: //input[@id=\'Hard\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[4]/input
  //   xpath:position: //div[3]/div[4]/input
  //              css: css=#Hard
  web.type("id=Hard", "0");
  // xpath:attributes: (//button[@type=\'button\'])[5]
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[5]/button[2]
  //   xpath:position: //div[3]/div[5]/button[2]
  //              css: css=#mark_form > div > div:nth-child(4) >
  //              div.navigation_btns > button.next_btn

  if (checking) {
    web.click("(//button[@type='button'])[4]");
    // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
    //   xpath:position: //div/div/div[1]/h3
    //              css: css=#page_display > div.mb-2 > h3
    web.assertText("//div[@id='page_display']/div[1]/h3", "cognitive");
    // xpath:attributes: (//button[@type=\'button\'])[3]
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[2]/div[5]/button[2]
    //   xpath:position: //div[2]/div[5]/button[2]
    //              css: css=#mark_form > div > div:nth-child(3) >
    //              div.navigation_btns > button.next_btn
    web.click("(//button[@type='button'])[3]");
    // xpath:attributes: (//button[@type=\'button\'])[5]
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[5]/button[2]
    //   xpath:position: //div[3]/div[5]/button[2]
    //              css: css=#mark_form > div > div:nth-child(4) >
    //              div.navigation_btns > button.next_btn
  }

  web.click("(//button[@type='button'])[5]");

  // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
  //   xpath:position: //div/div/div[1]/h3
  //              css: css=#page_display > div.mb-2 > h3
  if (checking) {
    web.assertText("//div[@id='page_display']/div[1]/h3", "question_type");
  }

  web.click("id=sub");
  //               id: id=sub
  //             name: name=sub
  // xpath:attributes: //input[@id=\'sub\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[2]/input
  //   xpath:position: //div[4]/div[2]/input
  //              css: css=#sub
  web.type("id=sub", "5");
  //               id: id=mcq
  //             name: name=mcq
  // xpath:attributes: //input[@id=\'mcq\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[3]/input
  //   xpath:position: //div[4]/div[3]/input
  //              css: css=#mcq
  web.click("id=mcq");
  // xpath:attributes: (//button[@type=\'button\'])[7]
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[4]/button[2]
  //   xpath:position: //div[4]/div[4]/button[2]
  //              css: css=#mark_form > div > div:nth-child(5) >
  //              div.navigation_btns > button.next_btn
  web.type("id=mcq", "5");
  if (checking) {
    web.click("(//button[@type='button'])[6]");
    // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
    //   xpath:position: //div/div/div[1]/h3
    //              css: css=#page_display > div.mb-2 > h3
    web.assertText("//div[@id='page_display']/div[1]/h3", "difficulty");
    // xpath:attributes: (//button[@type=\'button\'])[5]
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[3]/div[5]/button[2]
    //   xpath:position: //div[3]/div[5]/button[2]
    //              css: css=#mark_form > div > div:nth-child(4) >
    //              div.navigation_btns > button.next_btn
    web.click("(//button[@type='button'])[5]");
  }

  web.click("(//button[@type='button'])[7]");
  // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
  //   xpath:position: //div/div/div[1]/h3
  //              css: css=#page_display > div.mb-2 > h3
  if (checking) {
    web.assertText("//div[@id='page_display']/div[1]/h3", "question");
  }

  web.click("id=Que.1.A");
  //               id: id=Que.1.A
  //             name: name=Que.1.A
  // xpath:attributes: //input[@id=\'Que.1.A\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[2]/input
  //   xpath:position: //div[5]/div[2]/input
  //              css: css=#Que\\.1\\.A
  web.type("id=Que.1.A", "5");
  //               id: id=Que.2.A
  //             name: name=Que.2.A
  // xpath:attributes: //input[@id=\'Que.2.A\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[3]/input
  //   xpath:position: //div[5]/div[3]/input
  //              css: css=#Que\\.2\\.A
  web.click("id=Que.2.A");
  //               id: id=Que.2.A
  //             name: name=Que.2.A
  // xpath:attributes: //input[@id=\'Que.2.A\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[3]/input
  //   xpath:position: //div[5]/div[3]/input
  //              css: css=#Que\\.2\\.A
  web.type("id=Que.2.A", "5");

  // xpath:attributes: //button[@type=\'submit\']
  // xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[4]/button[2]
  //   xpath:position: //div[5]/div[4]/button[2]
  //              css: css=#mark_form > div > div:nth-child(6) >
  //              div.navigation_btns > button.next_btn
  if (checking) {
    web.click("(//button[@type='button'])[8]");
    // xpath:idRelative: //div[@id=\'page_display\']/div[1]/h3
    //   xpath:position: //div/div/div[1]/h3
    //              css: css=#page_display > div.mb-2 > h3
    web.assertText("//div[@id='page_display']/div[1]/h3", "question_type");
    // xpath:attributes: (//button[@type=\'button\'])[7]
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[4]/div[4]/button[2]
    //   xpath:position: //div[4]/div[4]/button[2]
    //              css: css=#mark_form > div > div:nth-child(5) >
    //              div.navigation_btns > button.next_btn
    web.click("(//button[@type='button'])[7]");
    // xpath:attributes: //button[@type=\'submit\']
    // xpath:idRelative: //form[@id=\'mark_form\']/div/div[5]/div[4]/button[2]
    //   xpath:position: //div[5]/div[4]/button[2]
    //              css: css=#mark_form > div > div:nth-child(6) >
    //              div.navigation_btns > button.next_btn
  }

  web.click("//button[@type='submit']");

  if (checking) {
    web.assertText("id=subjective_part_title", "Subjective Question");
    //               id: id=mcq_part_title
    // xpath:attributes: //div[@id=\'mcq_part_title\']
    // xpath:idRelative: //div[@id=\'mcq_part\']/div[1]
    //   xpath:position: //div[2]/div/div/div[2]/div[1]
    //              css: css=#mcq_part_title
    web.assertText("id=mcq_part_title", "MCQs");

    let count = web.getElementCount("//div[@class='mcqs_id']");
    if (!count) {
      let count2 = web.getElementCount("//div[@class='subquestions_id']");
      if (!count2) {
        throw new Error("Invalid paper template");
      }
    }
  }
}

function paper_info(checking) {
  web.selectWindow("title=Mark Distribution");
  //               id: id=generate_paper
  // xpath:attributes: //button[@id=\'generate_paper\']
  // xpath:idRelative: //div[@id=\'template_display\']/button
  //   xpath:position: //button
  //              css: css=#generate_paper
  web.click("id=generate_paper");

  //               id: id=generate_paper
  //             name: name=submit
  // xpath:attributes: //input[@id=\'generate_paper\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[6]/input
  //   xpath:position: //div[6]/input
  //              css: css=#generate_paper

  web.click("id=name");
  //               id: id=name
  //             name: name=name
  // xpath:attributes: //input[@id=\'name\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[1]/input
  //   xpath:position: //div[1]/input
  //              css: css=#name
  web.type("id=name", "IT308 mid term");
  //               id: id=term
  //             name: name=term
  // xpath:attributes: //input[@id=\'term\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[2]/input
  //   xpath:position: //div[2]/input
  //              css: css=#term
  web.type("id=term", "Automn");
  //               id: id=exam_date
  //             name: name=exam_date
  // xpath:attributes: //input[@id=\'exam_date\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[3]/input
  //   xpath:position: //div[3]/input
  //              css: css=#exam_date
  web.click("id=exam_date");
  //               id: id=exam_date
  //             name: name=exam_date
  // xpath:attributes: //input[@id=\'exam_date\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[3]/input
  //   xpath:position: //div[3]/input
  //              css: css=#exam_date
  web.type("id=exam_date", "2020-06-27");
  //               id: id=time_limit
  //             name: name=time_limit
  // xpath:attributes: //input[@id=\'time_limit\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[4]/input
  //   xpath:position: //div[4]/input
  //              css: css=#time_limit
  web.click("id=time_limit");
  //               id: id=time_limit
  //             name: name=time_limit
  // xpath:attributes: //input[@id=\'time_limit\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[4]/input
  //   xpath:position: //div[4]/input
  //              css: css=#time_limit
  web.type("id=time_limit", "1h");
  //               id: id=picture
  //             name: name=picture
  // xpath:attributes: //input[@id=\'picture\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[5]/input
  //   xpath:position: //div[5]/input
  //              css: css=#picture
  //               id: id=generate_paper
  //             name: name=submit
  // xpath:attributes: //input[@id=\'generate_paper\']
  // xpath:idRelative: //div[@id=\'form_content\']/div[6]/input
  //   xpath:position: //div[6]/input
  //              css: css=#generate_paper

  web.click("id=generate_paper");

  if (checking) {
    web.assertText(
      "//div[@id='template_display']/div[1]",
      "Click Here to view Demo"
    );
    // xpath:idRelative: //div[@id=\'template_display\']/div[2]
    //   xpath:position: //div[2]/div/div[2]
    //              css: css=#template_display > div:nth-child(5)
    web.assertText(
      "//div[@id='template_display']/div[2]",
      "Mail paper to examiner"
    );
  }
}

module.exports = {
  register,
  login,
  add_course,
  remove_course,
  add_unit,
  remove_unit,
  add_sub,
  add_mcq,
  delete_sub,
  delete_mcq,
  paper_request,
  mark_distribution,
  paper_info,
};
