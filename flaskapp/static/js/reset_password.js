const emailField = document.getElementById("email");
const emailError = document.getElementById("email_error");
const resetForm = document.getElementById("resetForm");

resetForm.addEventListener("submit", e => {
  const email = emailField.value;
  emailError.innerHTML = "";
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!emailRegex.test(email)) {
    emailError.innerHTML = "enter valid email";
    e.preventDefault();
  }
});
