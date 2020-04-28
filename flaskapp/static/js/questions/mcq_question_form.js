{
  const clientErrors = document.getElementsByClassName("form__client_error");
  const questionValue = document.getElementById("form_field_question_value");
  const marksValue = document.getElementById("marks_value");
  const difficultyValue = document.getElementById("difficulty_value");
  const optionsValue = document.getElementsByClassName("options_value");
  const fakeContainer = document.getElementsByClassName("fake_container");
  const toggleContainer = document.getElementById("toggle_container");
  const impCheckbox = document.getElementById("imp_checkbox");
  const toggleBtn = document.getElementById("toggle_btn");
  const resetBtn = document.getElementById("reset_btn");
  {
    let tabindex = 1;
    const submitBtn = document.getElementById("submit_btn");

    questionValue.setAttribute("tabindex", tabindex++);
    marksValue.setAttribute("tabindex", tabindex++);
    difficultyValue.setAttribute("tabindex", tabindex++);
    fakeContainer[0].setAttribute("tabindex", tabindex++);
    fakeContainer[1].setAttribute("tabindex", tabindex++);
    fakeContainer[2].setAttribute("tabindex", tabindex++);
    fakeContainer[3].setAttribute("tabindex", tabindex++);
    toggleContainer.setAttribute("tabindex", tabindex++);
    submitBtn.setAttribute("tabindex", tabindex++);
    resetBtn.setAttribute("tabindex", tabindex++);
  }
  {
    for (let i = 0; i < optionsValue.length; i++) {
      optionsValue[i].style.display = "none";
      fakeContainer[i].value = optionsValue[i].value;
      fakeContainer[i].style.height = "";
      fakeContainer[i].style.height = fakeContainer[i].scrollHeight + "px";
    }
    fakeContainer[0].setAttribute("placeholder", "Option (A)");
    fakeContainer[1].setAttribute("placeholder", "Option (B)");
    fakeContainer[2].setAttribute("placeholder", "Option (C)");
    fakeContainer[3].setAttribute("placeholder", "Option (D)");
    for (let i = 0; i < optionsValue.length; i++) {
      fakeContainer[i].addEventListener("input", (e) => {
        clientErrors[i + 3].innerText = "";
        e.target.style.height = "";
        e.target.style.height = e.target.scrollHeight + "px";
      });
      window.addEventListener("resize", function () {
        fakeContainer[i].style.height = "";
        fakeContainer[i].style.height = fakeContainer[i].scrollHeight + "px";
      });
    }
  }
  {
    difficultyValue.setAttribute("placeholder", "Enter difficulty here");
    difficultyValue.addEventListener("input", () => {
      clientErrors[2].innerText = "";
    });
  }
  {
    marksValue.setAttribute("placeholder", "Enter marks here");
    marksValue.addEventListener("input", () => {
      clientErrors[1].innerText = "";
    });
  }
  {
    questionValue.setAttribute("placeholder", "Enter question here");
    questionValue.setAttribute(
      "style",
      "height:" + questionValue.scrollHeight + "px;overflow-y:hidden;"
    );

    questionValue.addEventListener("input", (e) => {
      clientErrors[0].innerText = "";
      e.target.style.height = "";
      e.target.style.height = e.target.scrollHeight + "px";
    });

    window.addEventListener("resize", function () {
      questionValue.style.height = "";
      questionValue.style.height = questionValue.scrollHeight + "px";
    });
  }
  {
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
  }
  {
    if (impCheckbox.checked) {
      toggleBtn.style.left = "28px";
      toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
    }
  }
  {
    resetBtn.addEventListener("click", () => {
      toggleBtn.style.left = "4px";
      toggleContainer.style.backgroundColor = "#ccc";
      for (let i = 0; i < clientErrors.length; i++) {
        clientErrors[i].innerText = "";
      }
    });

    /** for question update form */

    if (window.location.href.indexOf("new") === -1)
      resetBtn.style.display = "none";
  }
  {
    function isValid(question, marksValue, difficultyValue, ...options) {
      let validation = {
        isValid: true,
        errors: [],
      };
      const marks = Number(marksValue);
      const difficulty = Number(difficultyValue);
      if (question.trim() === "") {
        validation.errors.push("This field is required");
        validation.isValid = false;
      } else if (question.length < 2) {
        validation.errors.push("enter question having atleast two characters");
        validation.isValid = false;
      } else {
        validation.errors.push("");
      }

      if (marks < 1 || marks > 100) {
        validation.errors.push("Enter marks between 1 and 100");
        validation.isValid = false;
      } else if (isNaN(marks)) {
        validation.errors.push("Invalid marks!!");
        validation.isValid = false;
      } else {
        validation.errors.push("");
      }

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
    {
      const form = document.getElementById("form");
      form.addEventListener("submit", (e) => {
        let validation = {};
        for (let i = 0; i < clientErrors.length; i++) {
          clientErrors[i].innerText = "";
        }
        validation = isValid(
          questionValue.value,
          marksValue.value,
          difficultyValue.value,
          fakeContainer[0].value,
          fakeContainer[1].value,
          fakeContainer[2].value,
          fakeContainer[3].value
        );
        if (!validation.isValid) {
          e.preventDefault();
          for (let i = 0; i < validation.errors.length; i++) {
            clientErrors[i].innerText = validation.errors[i];
          }
        } else {
          for (let i = 0; i < optionsValue.length; i++) {
            optionsValue[i].value = fakeContainer[i].value;
          }
          for (let i = 0; i < fakeContainer.length; i++) {
            fakeContainer[i].parentNode.removeChild(fakeContainer[i]);
            i--;
          }
        }
      });
    }
  }
}
