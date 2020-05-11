(function () {
  const accountForm = document.getElementById("account_form");
  const userName = document.getElementById("username");
  const email = document.getElementById("email");
  const clientError = document.getElementsByClassName("form_client_error");
  const formError = document.getElementsByClassName("invalid-feedback");
  for (let err of formError) {
    err.innerHTML = "";
  }
  function isValid(user, email) {
    let validation = {
      isValid: true,
      errors: [],
    };
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (user.trim() === "") {
      validation.errors.push("username is required");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }

    if (!emailRegex.test(email)) {
      validation.errors.push("email address is invalid!!");
      validation.isValid = false;
    } else {
      validation.errors.push("");
    }
    return validation;
  }

  userName.addEventListener("input", () => {
    clientError[0].innerHTML = "";
    formError[0].innerHTML = "";
  });

  email.addEventListener("input", () => {
    clientError[1].innerHTML = "";
    formError[1].innerHTML = "";
  });

  accountForm.addEventListener("submit", (e) => {
    const validation = isValid(userName.value, email.value);
    clientError[0].innerHTML = clientError[1].innerHTML = "";
    for (let err of formError) {
      err.innerHTML = "";
    }

    if (!validation.isValid) {
      e.preventDefault();
      for (let i = 0; i < validation.errors.length; i++) {
        clientError[i].innerText = validation.errors[i];
      }
    }
  });
})();
