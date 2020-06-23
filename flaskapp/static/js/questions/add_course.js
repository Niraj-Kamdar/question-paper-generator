(function() {
const courseField = document.getElementById("form__fields__course");
const clientError = document.getElementsByClassName("form__client_error");
const formError = document.querySelectorAll(".form__error li");
const courseForm = document.getElementById("course_form");
const toggleContainer = document.getElementById("toggle_container");
const toggleBtn = document.getElementById("toggle_btn");
const impCheckbox = document.getElementById("checkbox");
const submitBtn = document.getElementById("submit_btn");
const resetBtn = document.getElementById("reset_btn");

let tabindex = 1;
courseField.setAttribute("tabindex", tabindex++);
toggleContainer.setAttribute("tabindex", tabindex++);
submitBtn.setAttribute("tabindex", tabindex++);
resetBtn.setAttribute("tabindex", tabindex++);

resetBtn.addEventListener("click", function() {
  courseField.value = "";
  clientError[0].innerHTML = "";
  if (formError.length) {
    formError[0].innerHTML = "";
  }
  toggleBtn.style.left = "4px";
  toggleContainer.style.backgroundColor = "#ccc";
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

courseField.setAttribute("placeholder", "Add course");
courseField.addEventListener("input", () => {
  clientError[0].innerHTML = "";
  if (formError.length) {
    formError[0].innerHTML = "";
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

courseForm.addEventListener("submit", (e) => {
  const validation = isValid(courseField.value);
  clientError[0].innerHTML = "";

  if (!validation.isValid) {
    e.preventDefault();
    clientError[0].innerText = validation.errors[0];
  }
});
})();
