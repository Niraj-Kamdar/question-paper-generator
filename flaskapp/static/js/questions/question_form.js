(function () {
  const clientErrors = document.getElementsByClassName("form__client_error");
  const question = document.getElementById("form_field_question_value");
  const mark = document.getElementById("marks_value");
  const difficulty = document.getElementById("difficulty_value");
  const congnitiveValue = document.getElementById("cognitive_value");
  const toggleContainer = document.getElementById("toggle_container");
  const submitBtn = document.getElementById("submit_btn");
  const resetBtn = document.getElementById("reset_btn");
  const toggleBtn = document.getElementById("toggle_btn");
  const impCheckbox = document.getElementById("imp_checkbox");
  const form = document.getElementsByTagName("form")[0];

  let tabindex = 1;

  function isValid(question, mark) {
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
    return validation;
  }

  question.setAttribute("tabindex", tabindex++);
  mark.setAttribute("tabindex", tabindex++);
  difficulty.setAttribute("tabindex", tabindex++);
  congnitiveValue.setAttribute("tabindex", tabindex++);
  toggleContainer.setAttribute("tabindex", tabindex++);
  submitBtn.setAttribute("tabindex", tabindex++);
  resetBtn.setAttribute("tabindex", tabindex++);

  if (window.location.href.indexOf("new") === -1) {
    resetBtn.style.display = "none";
  }

  if (impCheckbox.checked) {
    toggleBtn.style.left = "28px";
    toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
  }

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

  mark.setAttribute("placeholder", "Enter marks here");
  mark.addEventListener("input", () => {
    clientErrors[1].innerHTML = "";
  });

  question.setAttribute("placeholder", "Enter question here");
  question.setAttribute(
    "style",
    "height:" + question.scrollHeight + "px;overflow-y:hidden;"
  );
  question.addEventListener("input", (e) => {
    clientErrors[0].innerHTML = "";
    e.target.style.height = "";
    e.target.style.height = e.target.scrollHeight + "px";
  });
  window.addEventListener("resize", function () {
    question.style.height = "";
    question.style.height = question.scrollHeight + "px";
  });
  resetBtn.addEventListener("click", () => {
    toggleBtn.style.left = "4px";
    toggleContainer.style.backgroundColor = "#ccc";
    for (let i = 0; i < clientErrors.length; i++) {
      clientErrors[i].innerText = "";
    }
  });

  form.addEventListener("submit", (e) => {
    let validation = {};
    for (let i = 0; i < clientErrors.length; i++) {
      clientErrors[i].innerHTML = "";
    }
    validation = isValid(question.value, mark.value);
    if (!validation.isValid) {
      e.preventDefault();
      for (let i = 0; i < validation.errors.length; i++) {
        clientErrors[i].innerHTML = validation.errors[i];
      }
    }
  });
})();
