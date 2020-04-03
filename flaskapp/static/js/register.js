const userNameField = document.getElementById("username");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirm_password");
const registerForm = document.getElementById("registerForm");
const userNameError = document.getElementById("user_name_error");
const emailError = document.getElementById("user_email_error");
const passwordError = document.getElementById("user_password_error");
const confirmPasswordError = document.getElementById(
  "user_confirm_password_error"
);
registerForm.addEventListener("submit", e => {
  const email = emailField.value;
  const userName = userNameField.value;
  const password = passwordField.value;
  const confirmPassword = confirmPasswordField.value;
  userNameError.innerHTML = emailError.innerHTML = passwordError.innerHTML = confirmPasswordError.innerHTML =
    "";
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  if (
    !emailRegex.test(email) ||
    !userName ||
    !(password === confirmPassword) ||
    !password
  ) {
    /**if userName is empty */
    if (!userName) {
      userNameError.innerHTML = "userName is required!!";
    }
    /**if email is not valid email address */
    if (!emailRegex.test(email)) {
      emailError.innerHTML = "enter valid email";
    }
    /**if password is empty */
    if (!password) {
      passwordError.innerHTML = "password is required!!";
    }
    /**if password does not match with confirm password */
    if (!(password === confirmPassword)) {
      confirmPasswordError.innerHTML =
        "this field must match with password field";
    }
    e.preventDefault();
  }
});
