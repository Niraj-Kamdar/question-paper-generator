(function () {
    let rootUrl = "";
    let index = window.location.href.indexOf("/", 0);
    index = window.location.href.indexOf("/", index + 1);
    index = window.location.href.indexOf("/", index + 1);
    rootUrl = window.location.href.substr(0, index + 1);
    const addCourse = document.getElementById("add_course");
    const templateDisplay = document.getElementById("template_display");
    templateDisplay.style.width = "100%";
    addCourse.addEventListener("click", () => {
        window.location.href = rootUrl + "course/new";
    });
})();
