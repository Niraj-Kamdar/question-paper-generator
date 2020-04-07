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

  /**for styling */
  const blockMain = document.getElementsByClassName("block_main");
  if (blockMain.length) blockMain[0].classList.remove("block_main");
  /**setting placeholder to form elements */
  marksValue.setAttribute("placeholder", "Enter marks here");
  difficultyValue.setAttribute("placeholder", "Enter difficulty here");
  questionValue.setAttribute("placeholder", "Enter question here");

  optionsValue[0].setAttribute("placeholder", "Option (A)");
  optionsValue[1].setAttribute("placeholder", "Option (B)");
  optionsValue[2].setAttribute("placeholder", "Option (C)");
  optionsValue[3].setAttribute("placeholder", "Option (D)");

  form.addEventListener("submit", (e) => {
    for (let i = 0; i < clientErrors.length; i++) {
      clientErrors[i].innerText = "";
    }
    const validation = isValid(
      questionValue.value,
      marksValue.value,
      difficultyValue.value,
      optionsValue[0].value,
      optionsValue[1].value,
      optionsValue[2].value,
      optionsValue[3].value
    );
    if (!validation.isValid) {
      e.preventDefault();
      for (let i = 0; i < validation.errors.length; i++) {
        clientErrors[i].innerText = validation.errors[i];
      }
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

  function isValid(question, marksValue, difficultyValue, ...options) {
    let validation = {
      isValid: true,
      errors: [],
    };
    if (question.trim() === "") {
      validation.errors.push("This field is required");
      validation.isValid = false;
    } else if (question.length < 2) {
      validation.errors.push("enter question having atleast two characters");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    const marks = Number(marksValue);
    if (marks < 1 || marks > 100) {
      validation.errors.push("Enter marks between 1 and 100");
      validation.isValid = false;
    } else if (isNaN(marks)) {
      validation.errors.push("Invalid marks!!");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    const difficulty = Number(difficultyValue);
    if (difficulty < 1 || difficulty > 100) {
      validation.errors.push("Enter difficulty between 1 and 100");
      validation.isValid = false;
    } else if (isNaN(difficulty)) {
      validation.errors.push("Invalid difficulty level!!");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }

    for (let i = 0; i < options.length; i++) {
      if (options[i].trim() === "") {
        validation.errors.push("Options are required!!");
        validation.isValid = false;
      } else {
        validation.errors.push("");
      }
    }
    return validation;
  }
})();
