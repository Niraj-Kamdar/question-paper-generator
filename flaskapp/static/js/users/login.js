(function () {
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const emailError = document.getElementById("form_email_error");
  const passwordError = document.getElementById("form_password_error");
  const loginForm = document.getElementsByTagName("form")[0];
  const formError = document.getElementsByClassName("invalid-feedback");
  for (let err of formError) {
    err.innerHTML = "";
  }

  function isValid(email, password) {
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
    if (password.trim() === "") {
      validation.errors.push("Password is required!!");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    return validation;
  }

  emailField.addEventListener("input", () => {
    emailError.innerHTML = "";
    formError[0].innerHTML = "";
  });

  passwordField.addEventListener("input", () => {
    passwordError.innerHTML = "";
    formError[1].innerHTML = "";
  });

  loginForm.addEventListener("submit", (e) => {
    const validation = isValid(emailField.value, passwordField.value);
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    for (let err of formError) {
      err.innerHTML = "";
    }
    if (!validation.isValid) {
      e.preventDefault();
      emailError.innerText = validation.errors[0];
      passwordError.innerText = validation.errors[1];
    }
  });
})();
