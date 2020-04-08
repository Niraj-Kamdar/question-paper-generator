(function () {
    const mainContainer = document.getElementById("main_container");
    mainContainer.style.paddingTop = "100px"; // for all pages except question list
    document.body.style.overflowY = "auto"; //for all pages except question list
    const homeLink = document.getElementById("home_link");
    const courseLink = document.getElementById("course_link");
    const profileLink = document.getElementsByClassName("user")[0];
    let index = window.location.href.indexOf("/", 0);
    index = window.location.href.indexOf("/", index + 1);
    index = window.location.href.indexOf("/", index + 1);
    const rootUrl = window.location.href.substr(0, index + 1);
    profileLink.addEventListener("click", () => {
        if (rootUrl + "account" !== window.location.href)
            window.location.href = rootUrl + "account";
    });
    const length = window.location.href.match(new RegExp("/", "g")).length;

    if (length !== 3) {
        homeLink.setAttribute("href", rootUrl + "home");
    } else {
        if (window.location.href.indexOf("home") !== -1) {
            homeLink.removeAttribute("href");
        } else {
            homeLink.setAttribute("href", rootUrl + "home");
        }
    }

    let courseUrl = rootUrl + "course/";
    if (window.location.href !== courseUrl) {
        courseLink.setAttribute("href", courseUrl);
    } else {
        courseLink.removeAttribute("href");
    }


    
})();
