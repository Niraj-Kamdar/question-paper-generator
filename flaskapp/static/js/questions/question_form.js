(function () {
    const footer = document.getElementsByTagName("footer")[0];
    footer.style.position = "fixed";
    footer.style.bottom = "0px";
    footer.style.left = "0px";
    footer.style.right = "0px";
    const form = document.getElementsByTagName("form")[0];
    const formErrors = document.getElementsByClassName("form__client_error");
    const question = document.getElementById("form_field_question_value");
    const mark = document.getElementById("marks_value");
    const difficulty = document.getElementById("difficulty_value");
    const toggleContainer = document.getElementById("toggle_container");
    const toggleBtn = document.getElementById("toggle_btn");
    const impCheckbox = document.getElementById("imp_checkbox");
    const submitBtn = document.getElementById("submit_btn");
    const resetBtn = document.getElementById("reset_btn");
    let tabindex = 1;
    question.setAttribute("tabindex", tabindex++);
    mark.setAttribute("tabindex", tabindex++);
    difficulty.setAttribute("tabindex", tabindex++);
    toggleContainer.setAttribute("tabindex", tabindex++);
    submitBtn.setAttribute("tabindex", tabindex++);
    resetBtn.setAttribute("tabindex", tabindex++);
    /**setting placeholder of form elements */
    mark.setAttribute("placeholder", "Enter marks here");
    difficulty.setAttribute("placeholder", "Enter difficulty here");
    question.setAttribute("placeholder", "Enter question here");

    /**for styling */
    const blockMain = document.getElementsByClassName("block_main");
    if (blockMain.length) blockMain[0].classList.remove("block_main");

    question.addEventListener("input", () => {
        formErrors[0].innerHTML = "";
    });

    mark.addEventListener("input", () => {
        formErrors[1].innerHTML = "";
    });

    difficulty.addEventListener("input", () => {
        formErrors[2].innerHTML = "";
    });

    /**form submit handler */
    form.addEventListener("submit", (e) => {
        for (let i = 0; i < formErrors.length; i++) {
            formErrors[i].innerHTML = "";
        }
        let validation = isValid(question.value, mark.value, difficulty.value);
        if (!validation.isValid) {
            for (let i = 0; i < validation.errors.length; i++) {
                formErrors[i].innerHTML = validation.errors[i];
            }
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
        for (let i = 0; i < formErrors.length; i++) {
            formErrors[i].innerHTML = "";
        }
    });

    /** for question update form */
    if (impCheckbox.checked) {
        toggleBtn.style.left = "28px";
        toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
    }

    if (window.location.href.indexOf("new") === -1) {
        resetBtn.style.display = "none";
    }

    function isValid(question, mark, difficulty) {
        let validation = {
            isValid: true,
            errors: [],
        };

        if (question.trim() === "") {
            validation.errors.push("empty question!!");
            validation.isValid = false;
        } else if (question.trim() < 2) {
            validation.errors.push("enter question having atleast two characters");
            validation.isValid = false;
        } else {
            validation.errors.push("");
        }
        if (Number(mark) < 1 || Number(mark) > 100) {
            validation.errors.push("enter marks between 1 and 100");
            validation.isValid = false;
        } else if (isNaN(Number(mark))) {
            validation.errors.push("Invalid Number!!");
            validation.isValid = false;
        } else {
            validation.errors.push("");
        }
        if (Number(difficulty) < 1 || Number(difficulty) > 100) {
            validation.errors.push("enter difficulty level between 1 and 100");
            validation.isValid = false;
        } else if (isNaN(Number(difficulty))) {
            validation.errors.push("Invalid difficulty level!!");
            validation.isValid = false;
        } else {
            validation.errors.push("");
        }
        return validation;
    }
})();
