(function () {
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
  registerForm.addEventListener("submit", (e) => {
    const email = emailField.value;
    const userName = userNameField.value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    userNameError.innerHTML = emailError.innerHTML = passwordError.innerHTML = confirmPasswordError.innerHTML =
      "";
    const validation = isValid(email, userName, password, confirmPassword);
    if (!validation.isValid) {
      e.preventDefault();
      [
        emailError.innerHTML,
        userNameError.innerHTML,
        passwordError.innerHTML,
        confirmPasswordError.innerHTML,
      ] = validation.errors;
    }
  });

  function isValid(email, username, password, confirmPassword) {
    const validation = {
      isValid: true,
      errors: [],
    };
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email)) {
      validation.errors.push("email address is invalid!!");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    if (username.trim() === "") {
      validation.errors.push("Username is required!!");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    if (password.trim() === "") {
      validation.errors.push("Password is required!!");
      validation.isValid = false;
    } else if (password.length < 8) {
      validation.errors.push("password must have atleast 8 characters");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }

    if (password !== confirmPassword) {
      validation.errors.push("this field must match with password field");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    return validation;
  }
})();
