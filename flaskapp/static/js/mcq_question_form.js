(function () {
    const questionValue = document.getElementById("form_field_question_value");
    const marksValue = document.getElementById("marks_value");
    const difficultyValue = document.getElementById("difficulty_value");
    const optionsValue = document.getElementsByClassName("options_value");
    const toggleContainer = document.getElementById("toggle_container");
    const toggleBtn = document.getElementById("toggle_btn");
    const resetBtn = document.getElementById("reset_btn");
    const clientErrors = document.getElementsByClassName("form__client_error");
    const impCheckbox = document.getElementById("imp_checkbox");
    const form = document.getElementById("form");

    marksValue.setAttribute("placeholder", "Enter marks here");
    difficultyValue.setAttribute("placeholder", "Enter difficulty here");
    questionValue.setAttribute("placeholder", "Enter question here");

    optionsValue[0].setAttribute("placeholder", "Option (A)");
    optionsValue[1].setAttribute("placeholder", "Option (B)");
    optionsValue[2].setAttribute("placeholder", "Option (C)");
    optionsValue[3].setAttribute("placeholder", "Option (D)");

    form.addEventListener("submit", (e) => {
        let flag = false;
        for (let i = 0; i < clientErrors.length; i++) {
            clientErrors[i].innerText = "";
        }
        if (questionValue.value.trim() === "") {
            clientErrors[0].innerText = "This field is required";
            flag = true;
        }

        const marks = parseInt(marksValue.value);
        if (isNaN(marks) || marks <= 0 || marks > 100) {
            clientErrors[1].innerText = "Enter number between 1 and 100";
            flag = true;
        }

        const difficultyLevel = parseInt(difficultyValue.value);
        if (
            isNaN(difficultyLevel) ||
            difficultyLevel <= 0 ||
            difficultyLevel > 100
        ) {
            clientErrors[2].innerText = "Enter difficulty level between 1 and 100";
            flag = true;
        }

        for (let i = 0; i < optionsValue.length; i++) {
            if (optionsValue[i].value.trim() === "") {
                clientErrors[i + 3].innerText = "options are required";
                flag = true;
            }
        }

        if (flag) {
            e.preventDefault();
        }
    });
    toggleContainer.addEventListener("click", () => {
        if (impCheckbox.checked) {
            toggleBtn.style.left = "4px";
            toggleContainer.style.backgroundColor = "#ccc";
        } else {
            toggleBtn.style.left = "28px";
            toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
        }
        impCheckbox.checked = !impCheckbox.checked;
    });

    resetBtn.addEventListener("click", () => {
        toggleBtn.style.left = "4px";
        toggleContainer.style.backgroundColor = "#ccc";
        for (let i = 0; i < clientErrors.length; i++) {
            clientErrors[i].innerText = "";
        }
    });

    /** for question update form */
    if (impCheckbox.checked) {
        toggleBtn.style.left = "28px";
        toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
    }

    if (window.location.href.indexOf("new") === -1)
        resetBtn.style.display = "none";
})();
