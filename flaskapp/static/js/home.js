(function () {
    document.getElementById("template_display").style.width = "100%";
    window.onload = function () {
        var manage_courses_btn = document.getElementById("manage_courses_btn");
        manage_courses_btn.addEventListener("click", () => {
            window.location.href = "/course";
        });
    };
})();
