const resetForm = document.getElementById("resetForm");
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
const resetPasswordForm = document.getElementById("reset_password_form");

function isValid(email) {
  const validation = {
    isValid: true,
    errors: [],
  };

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

if (resetForm) {
  const emailField = document.getElementById("email");
  const emailError = document.getElementById("email_error");
  const formError = document.getElementsByClassName("invalid-feedback");
  for (let err of formError) {
    err.innerHTML = "";
  }

  emailField.addEventListener("input", () => {
    emailError.innerHTML = "";
    if (formError.length) formError[0].innerHTML = "";
  });
  resetForm.addEventListener("submit", (e) => {
    const email = emailField.value;
    const validation = isValid(email);
    if (formError.length) formError[0].innerHTML = "";
    emailError.innerHTML = "";
    if (!validation.isValid) {
      e.preventDefault();
      emailError.innerHTML = validation.errors[0];
    }
  });
}

if (resetPasswordForm) {
  const password = document.getElementsByClassName("password")[0];
  const confirmPassword = document.getElementsByClassName(
    "confirm_password"
  )[0];
  const clientError = document.getElementsByClassName("form_error");
  const formError = document.getElementsByClassName("invalid-feedback");
  for (let err of formError) {
    err.innerHTML = "";
  }

  password.addEventListener("input", () => {
    clientError[0].innerHTML = "";
    if (formError.length) formError[0].innerHTML = "";
  });
  confirmPassword.addEventListener("input", () => {
    clientError[1].innerHTML = "";
    if (formError.length) formError[1].innerHTML = "";
  });
  resetPasswordForm.addEventListener("submit", (e) => {
    const validation = isValidPassword(password.value, confirmPassword.value);
    clientError[0].innerHTML = clientError[1].innerHTML = "";

    for (let err of formError) {
      err.innerHTML = "";
    }

    if (!validation.isValid) {
      e.preventDefault();
      [clientError[0].innerHTML, clientError[1].innerHTML] = validation.errors;
    }
  });
}
