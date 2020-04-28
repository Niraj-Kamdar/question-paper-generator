(function() {
const courseForm = document.getElementById("course_form");
const courseField = document.getElementById("form__fields__course");
const clientError = document.getElementsByClassName("form__client_error");

courseField.setAttribute("placeholder", "Add course");
courseForm.addEventListener("submit", (e) => {
  clientError[0].innerHTML = "";
  const validation = isValid(courseField.value);
  if (!validation.isValid) {
    e.preventDefault();
    clientError[0].innerText = validation.errors[0];
    clientError[0].style.color = "red";
    clientError[0].style.marginBottom = "16px";
  }
});

function isValid(course) {
  let validation = {
    isValid : true,
    errors : [],
  };
  if (course.trim() === "") {
    validation.errors.push("required field");
    validation.isValid = false;
  } else
    validation.errors.push("");
  return validation;
}
})();
