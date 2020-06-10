const markForm = document.getElementById("mark_form");
const hiddenLabel = Array.from(document.getElementsByClassName("hidden_label"));
const labels = Array.from(document.getElementsByClassName("label"));
const inputField = Array.from(document.getElementsByClassName("input_field"));
const backBtn = Array.from(document.getElementsByClassName("back_btn"));
const nextBtn = Array.from(document.getElementsByClassName("next_btn"));
const pages = document.getElementsByClassName("pages");
const errFields = document.getElementsByClassName("err");
const generalErrMsg = document.getElementById("general_err_msg");


const labelLength = labels.length;

hiddenLabel.forEach(function(node){
    node.style.display = "none";
});

labels.forEach(function(node,index){
    node.setAttribute("for",hiddenLabel[index].getAttribute("for"));
    node.innerHTML = hiddenLabel[index].innerHTML;
});

inputField.forEach(function(node,index){
   const forAttribute = hiddenLabel[index].getAttribute("for");
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

inputField.forEach(function(node,index){
  node.addEventListener('input',function(){
     errFields[index].innerHTML = "";
     generalErrMsg.innerHTML = "";
  });
});

nextBtn.forEach(function(node,index){
   if(index!==3){
       node.addEventListener('click',function(){
          pages[index].style.display = "none";
          pages[index + 1].style.display = "";
       });
   }
});

backBtn.forEach(function(node,index){
  node.addEventListener('click',function(){
      pages[index+1].style.display = "none";
      pages[index].style.display = "";
  })
});


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