setTimeout(() => {
    const flash = document.getElementsByClassName("flashes")[0];
    if (flash) flash.style.display = "none";
}, 1000);
const accountForm = document.getElementById("account_form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
const clientError = document.getElementsByClassName("form_client_error");

accountForm.addEventListener("submit", (e) => {
    clientError[0].innerHTML = clientError[1].innerHTML = "";
    if (userName.value.trim() === "" || !emailRegex.test(email.value)) {
        e.preventDefault();
        if (userName.value.trim() === "")
            clientError[0].innerHTML = "enter valid name";
        if (!emailRegex.test(email.value))
            clientError[1].innerHTML = "enter valid email";
    }
});
