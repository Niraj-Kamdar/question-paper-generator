(function () {
  const courseField = document.getElementById("form__fields__course");
  const clientError = document.getElementsByClassName("form__client_error");
  const formError = document.querySelectorAll(".form__error li");
  const courseForm = document.getElementById("course_form");

  const resetBtn = document.getElementById("reset_btn");
  resetBtn.addEventListener("click", function () {
    courseField.value = "";
    clientError[0].innerHTML = "";
    if(formError.length) {formError[0].innerHTML = "";}
  });

  function isValid(course) {
    let validation = {
      isValid: true,
      errors: [],
    };
    if (course.trim() === "") {
      validation.errors.push("required field");
      validation.isValid = false;
    } else validation.errors.push("");
    return validation;
  }

  courseField.setAttribute("placeholder", "Add course");
  courseField.addEventListener("input", () => {
    clientError[0].innerHTML = "";
    if(formError.length){formError[0].innerHTML = "";}
  });

  courseForm.addEventListener("submit", (e) => {
    const validation = isValid(courseField.value);
    clientError[0].innerHTML = "";

    if (!validation.isValid) {
      e.preventDefault();
      clientError[0].innerText = validation.errors[0];
    }
  });
})();
