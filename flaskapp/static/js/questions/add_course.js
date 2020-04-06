const courseForm = document.getElementById("course_form");
const courseField = document.getElementById("form__fields__course");
const clientError = document.getElementsByClassName("form__client_error");

courseForm.addEventListener("submit", (e) => {
  clientError[0].innerHTML = "";
  const value = courseField.value;
  if (value.trim() === "") {
    e.preventDefault();
    clientError[0].innerText = "required field";
    clientError[0].style.color = "red";
    clientError[0].style.marginBottom = "16px";
  }
});
