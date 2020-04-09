(function () {
    window.onload = function () {
        var manage_courses_btn = document.getElementById("manage_courses_btn");
        manage_courses_btn.addEventListener("click", () => {
            window.location.href = "/course";
        });
    };
})();
