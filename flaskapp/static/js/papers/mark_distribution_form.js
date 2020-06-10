const markForm = document.getElementById("mark_form");
const labels = document.getElementsByClassName("label");
const inputField = Array.from(document.getElementsByClassName("input_field"));
const backBtn = document.getElementsByClassName("back_btn");
const nextBtn = document.getElementsByClassName("next_btn");
const pages = document.getElementsByClassName("pages");
const errFields = document.getElementsByClassName("err");
const generalErrMsg = document.getElementById("general_err_msg");
const totalNextBtns = nextBtn.length - 1;
const totalBackBtns = backBtn.length;


const labelLength = labels.length;

inputField.forEach(function(node,index){
   const forAttribute = labels[index].getAttribute("for");
   node.setAttribute("id",forAttribute);
   node.setAttribute("name",forAttribute);
});

pages[1].style.display = "none";
pages[2].style.display = "none";
pages[3].style.display = "none";


markForm.addEventListener("submit",function(e){
    let validFields = 0;

    inputField.forEach(function(node,index){
        const [isValid,err] = isValidNumber(node.value);
        if(!isValid){
          errFields[index].innerHTML = err;
        }else{
          validFields++;
        }
     });


    if(validFields!==labelLength){
        generalErrMsg.innerHTML = "Enter valid marks in all input fields";
        e.preventDefault();
    }

});

for(let i=0;i<labelLength;i++){
    inputField[i].addEventListener('input',function(){
       errFields[i].innerHTML = "";
       generalErrMsg.innerHTML = "";
    });
}

for(let i=0;i<totalNextBtns;i++){
    nextBtn[i].addEventListener('click',function(){
       pages[i].style.display = "none";
       pages[i+1].style.display = "";
    });
}

for(let i=0;i<totalBackBtns;i++){
    backBtn[i].addEventListener('click',function(){
       pages[i+1].style.display = "none";
       pages[i].style.display = "";
    });
}


function isValidNumber(number){
    let isValid = false;
    let err = "";
    if(number===""){
        err = "Enter Marks in Integers";
    } else if(Number(number)<=0) {
        err = "Marks should be positive";
    } else{
        const indexOfDecimal = number.indexOf(".");
        const indexOfExp = number.indexOf("e");
        if(indexOfDecimal!==-1 || indexOfExp!==-1){
            err = "Enter Marks in Integers";
        }
    }
    if(!err){
        isValid = true;
    }
    return [isValid,err];
}