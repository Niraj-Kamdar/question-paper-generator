(function () {
  const exploreItems = document.getElementsByClassName("explore_items");
  const add_items = document.getElementsByClassName("add_items");

  const url = window.location.href;
  let option = "";
  const index1 = url.indexOf("new");
  const index2 = url.indexOf("sub");
  if (index2 !== -1) option = "Subjective Question";
  else option = "Multiple Choice Question";
  let flag = false;
  // assigning active class
  for (let i = 0; i < add_items.length; i++) {
    if (add_items[i].innerText === option && index1 !== -1) {
      add_items[i].classList.add("active");
      flag = true;
    }
  }
  if (!flag) {
    for (let i = 0; i < exploreItems.length; i++) {
      if (exploreItems[i].innerText === option) {
        exploreItems[i].classList.add("active");
      }
    }
  }

  // assigning links to side nav

  // for question list page

  // coursesItemContainer[0].innerHTML = "";

  {
    function assignStaticLink(
      addMCQ,
      addSubjectiveQuestion,
      viewMCQ,
      viewSubjectiveQuestion,
      url,
      flag
    ) {
      const index = url.indexOf("question");
      const partialUrlQuestion = url.substr(0, index + 8 + 1);
      addMCQ.setAttribute("href", partialUrlQuestion + "mcq/new/");
      addSubjectiveQuestion.setAttribute(
        "href",
        partialUrlQuestion + "sub/new/"
      );
      viewMCQ.setAttribute("href", partialUrlQuestion + "mcq/");
      viewSubjectiveQuestion.setAttribute("href", partialUrlQuestion + "sub/");
      if (flag) return;
      [addMCQ, addSubjectiveQuestion, viewMCQ, viewSubjectiveQuestion].forEach(
        function (node) {
          node.addEventListener("click", (e) => {
            if (e.target.href === url) e.preventDefault();
          });
        }
      );
    }

    {
      const addMCQ = document.getElementById("add_container").firstElementChild
        .nextElementSibling;
      const addSubjectiveQuestion = addMCQ.nextElementSibling;
      const viewMCQ = document.getElementById("explore_container")
        .firstElementChild.nextElementSibling;
      const viewSubjectiveQuestion = viewMCQ.nextElementSibling;
      assignStaticLink(
        addMCQ,
        addSubjectiveQuestion,
        viewMCQ,
        viewSubjectiveQuestion,
        window.location.href,
        true
      );
    }
    {
      const nav_links = document.getElementsByClassName("nav_link");
      assignStaticLink(
        nav_links[2],
        nav_links[3],
        nav_links[0],
        nav_links[1],
        window.location.href,
        false
      );
    }
  }
  {
    function assignDynamicLink(courseName, url, flag) {
      const courseIndex = url.indexOf("course");
      const laterUrl = url.substr(courseIndex);
      const cid = /(\d+)/.exec(laterUrl)[1];
      const subIndex = url.indexOf("sub");
      const newIndex = url.indexOf("new");

      for (let i = 0; i < courseName.length - 1; i++) {
        let completeUrl = "";
        const courseId = courseName[i].getAttribute("data-id");
        if (cid === courseId) courseName[i].classList.add("active");
        if (subIndex !== -1 && newIndex !== -1)
          completeUrl = "/course/" + courseId + "/question/sub/new/";
        else if (subIndex !== -1 && newIndex === -1)
          completeUrl = "/course/" + courseId + "/question/sub/";
        else if (subIndex === -1 && newIndex !== -1)
          completeUrl = "/course/" + courseId + "/question/mcq/new/";
        else completeUrl = "/course/" + courseId + "/question/mcq/";
        courseName[i].setAttribute("href", completeUrl);
        if (flag) return;
        courseName[i].addEventListener("click", (e) => {
          if (cid === courseId) e.preventDefault();
        });
      }
    }
    {
      const courseContainer = document.getElementById("course_container");
      const courseName = [];
      const children = courseContainer.children;

      for (let i = 1; i < children.length; i++) {
        courseName.push(children[i]);
      }
      assignDynamicLink(courseName, window.location.href, true);
    }
    {
      const courseName = document.getElementsByClassName("course_link");
      assignDynamicLink(courseName, window.location.href, false);
    }
  }
})();
