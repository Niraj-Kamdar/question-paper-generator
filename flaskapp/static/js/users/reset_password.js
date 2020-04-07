(function () {
  const resetForm = document.getElementById("resetForm");
  const resetPasswordForm = document.getElementById("reset_password_form");

  if (resetForm) {
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("email_error");
    emailField.addEventListener("input", () => {
      emailError.innerHTML = "";
    });
    resetForm.addEventListener("submit", (e) => {
      const email = emailField.value;
      emailError.innerHTML = "";
      const validation = isValid(email);
      if (!validation.isValid) {
        e.preventDefault();
        emailError.innerHTML = validation.errors[0];
      }
    });
  } else {
    const password = document.getElementsByClassName("password")[0];
    const confirmPassword = document.getElementsByClassName(
      "confirm_password"
    )[0];
    const formError = document.getElementsByClassName("form_error");
    password.addEventListener("input", () => {
      formError[0].innerHTML = "";
    });
    confirmPassword.addEventListener("input", () => {
      formError[1].innerHTML = "";
    });
    resetPasswordForm.addEventListener("submit", (e) => {
      formError[0].innerHTML = formError[1].innerHTML = "";
      const validation = isValidPassword(password.value, confirmPassword.value);
      if (!validation.isValid) {
        e.preventDefault();
        [formError[0].innerHTML, formError[1].innerHTML] = validation.errors;
      }
    });
  }
  function isValid(email) {
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

    return validation;
  }

  function isValidPassword(password, confirmPassword) {
    const validation = {
      isValid: true,
      errors: [],
    };
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
