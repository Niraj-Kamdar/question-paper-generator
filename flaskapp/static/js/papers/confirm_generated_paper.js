(function(){
    const emailField= document.getElementsByClassName("email_form")[0];
    const generateField = document.getElementById("generate");
    const clientError = document.getElementsByClassName("form_client_error")[0];
    const pdfForm = document.getElementById("generate_pdf");
    const abortBtn = document.getElementById("abort");
    const pdfMailBtn = document.getElementById("pdf_mail");
    let status = "";

    abortBtn.addEventListener("click",function(){
        generateField.value="NO";
        status = "abort";
    });

    pdfMailBtn.addEventListener("click",function(){
       generateField.value = "YES";
       status = "success";
    });

    emailField.addEventListener('input',function () {
        clientError.innerHTML = "";
        status = "";
    });

    pdfForm.addEventListener('submit',function(e){
        if(status==="success") {
            const [validEmail, err] = isValid(emailField.value);
            if (!validEmail) {
                clientError.innerHTML = err;
                e.preventDefault();
            }
        }
    });

    function isValid(email){
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        if(emailRegex.test(email)){
            return [true,""];
        }else{
            return [false,"Invalid email Address!!"];
        }
    }
})();