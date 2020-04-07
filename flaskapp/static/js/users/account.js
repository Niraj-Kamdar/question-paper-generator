(function () {
    setTimeout(() => {
        const flash = document.getElementsByClassName("flashes")[0];
        if (flash) flash.style.display = "none";
    }, 1000);
    const accountForm = document.getElementById("account_form");
    const userName = document.getElementById("username");
    const email = document.getElementById("email");

    userName.addEventListener("input", () => {
        clientError[0].innerHTML = "";
    });

    email.addEventListener("input", () => {
        clientError[1].innerHTML = "";
    });

    const clientError = document.getElementsByClassName("form_client_error");

    accountForm.addEventListener("submit", (e) => {
        clientError[0].innerHTML = clientError[1].innerHTML = "";
        const validation = isValid(userName.value, email.value);
        if (!validation.isValid) {
            e.preventDefault();
            for (let i = 0; i < validation.errors.length; i++) {
                clientError[i].innerText = validation.errors[i];
            }
        }
    });

    function isValid(user, email) {
        let validation = {
            isValid: true,
            errors: [],
        };
        if (user.trim() === "") {
            validation.errors.push("username is required");
            validation.isValid = false;
        } else {
            validation.errors.push("");
        }
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        if (!emailRegex.test(email)) {
            validation.errors.push("email address is invalid!!");
            validation.isValid = false;
        } else {
            validation.errors.push("");
        }
        return validation;
    }
})();
