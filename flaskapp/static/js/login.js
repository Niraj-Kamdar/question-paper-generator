const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
// const rememberField = document.getElementById("remember");
const loginForm = document.getElementsByTagName("form")[0];
// const submitBtn = document.getElementById("submit");
const emailError = document.getElementById("form_email_error");
const passwordError = document.getElementById("form_password_error");

/* form validation */
loginForm.addEventListener("submit", (e) => {
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email) || !password) {
        /*if email is not valid email address */
        if (!emailRegex.test(email)) {
            emailError.innerHTML = "enter valid email";
        }
        /*if password is empty */
        if (!password) {
            passwordError.innerHTML = "password Required!!";
        }
        e.preventDefault();
    }
});
