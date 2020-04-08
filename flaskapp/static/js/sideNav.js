(function () {
    const exploreItems = document.getElementsByClassName("explore_items");
    const add_items = document.getElementsByClassName("add_items");
    const nav_links = document.getElementsByClassName("nav_link");
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
    const index = url.indexOf("question");
    const partialUrlQuestion = url.substr(0, index + 8 + 1);
    if (partialUrlQuestion + "mcq/" !== url)
        nav_links[0].href = partialUrlQuestion + "mcq/";
    else nav_links[0].removeAttribute("href");
    if (partialUrlQuestion + "sub/" !== url)
        nav_links[1].href = partialUrlQuestion + "sub/";
    else nav_links[1].removeAttribute("href");
    if (partialUrlQuestion + "mcq/new/" !== url)
        nav_links[2].href = partialUrlQuestion + "mcq/new/";
    else nav_links[2].removeAttribute("href");
    if (partialUrlQuestion + "sub/new/" !== url)
        nav_links[3].href = partialUrlQuestion + "sub/new/";
    else nav_links[3].removeAttribute("href");

    // for question list page
    if (index1 === -1) {
        document.body.style.overflowY = "hidden";
        const flashes = document.getElementsByClassName("flashes");
        if (flashes.length) {
            // console.log("yup");
            setTimeout(() => {
                flashes[0].style.display = "none";
            }, 1000);
        }
        const mainContainer = document.getElementById("main_container");
        mainContainer.style.paddingTop = "100px";
    }

    //course navigation
    const courseName = document.getElementsByClassName("course_name");
    const courseId = document.getElementsByClassName("course_id");
    const coursesItemContainer = document.getElementsByClassName(
        "courses_items_container"
    );
    coursesItemContainer[0].innerHTML = "";
    const courseIndex = url.indexOf("course");
    const partialUrl = url.substr(0, courseIndex + 6);
    const laterUrl = url.substr(courseIndex);
    const subIndex = url.indexOf("sub");
    const newIndex = url.indexOf("new");

    for (let i = 0; i < courseName.length; i++) {
        let completeUrl = "";
        if (subIndex !== -1 && newIndex !== -1)
            completeUrl =
                partialUrl + "/" + courseId[i].innerText + "/question/sub/new/";
        else if (subIndex !== -1 && newIndex === -1)
            completeUrl = partialUrl + "/" + courseId[i].innerText + "/question/sub/";
        else if (subIndex === -1 && newIndex !== -1)
            completeUrl =
                partialUrl + "/" + courseId[i].innerText + "/question/mcq/new/";
        else
            completeUrl = partialUrl + "/" + courseId[i].innerText + "/question/mcq/";

        const cid = /(\d+)/.exec(laterUrl)[1];
        if (cid === courseId[i].innerText) {
            coursesItemContainer[0].innerHTML =
                coursesItemContainer[0].innerHTML +
                "<div class='courses_items active'>" +
                "<img alt='list_style_image' src='/static/images/list_style_image.svg' /> " +
                "<a class='course_link'>" +
                courseName[i].innerText +
                "</a>" +
                "</div>";
        } else {
            coursesItemContainer[0].innerHTML =
                coursesItemContainer[0].innerHTML +
                "<div class='courses_items'>" +
                "<img alt='list_style_image' src='/static/images/list_style_image.svg' /> " +
                "<a href='" +
                completeUrl +
                "' class='course_link'>" +
                courseName[i].innerText +
                "</a>" +
                "</div>";
        }
    }
})();
