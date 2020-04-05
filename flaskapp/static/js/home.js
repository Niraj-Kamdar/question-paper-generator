window.onload = function () {
    var userbtn = document.getElementsByClassName('user')[0]
    userbtn.addEventListener("click", () => {
        window.location.href = 'http://localhost:5000/account';
    });
    var question_bank_btn = document.getElementById("question_bank_btn");
    question_bank_btn.addEventListener("click", () => {
        window.location.href = 'http://localhost:5000/course/1/question/sub/';
    });
    var manage_courses_btn = document.getElementById("manage_courses_btn");
    manage_courses_btn.addEventListener("click", () => {
        window.location.href = 'http://localhost:5000/course';
    });
}