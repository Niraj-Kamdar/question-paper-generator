(function () {
    const footer = document.getElementsByTagName("footer")[0];
    footer.style.position = "fixed";
    footer.style.bottom = "0px";
    const flashes = document.getElementsByClassName("flashes");
    if (flashes.length) {
        setTimeout(() => {
            flashes[0].style.display = "none";
        }, 1000);
    }
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
