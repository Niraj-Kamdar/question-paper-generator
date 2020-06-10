

const numberOfQuestions = document.getElementById("number_of_questions");

const questionsErr = document.getElementById("questions_err");

const subquestionsErr = document.getElementsByClassName("subquestions_err");

const firstNextBtn = document.getElementById("next_1");

const firstBackBtn = document.getElementById("back_1");

const secondNextBtn = document.getElementById("next_2");

const part1 = document.getElementById("part_1");

const part2 = document.getElementById("part_2");

const part3 = document.getElementById("part_3");

const subQuestionForm = document.getElementById("subquestions");

const subquestions = document.getElementsByClassName("subquestions");

let buffer = [];

part2.style.display = "none";

numberOfQuestions.addEventListener('input',function(){
   questionsErr.innerHTML = "";
});



firstNextBtn.addEventListener("click",function(e){
    const value = numberOfQuestions.value;
    const [isValid,err] = isValidQustionField(value);
    if(!isValid){
       questionsErr.innerHTML = err;
    } else {
        let content = "";

        e.target.parentNode.parentNode.style.display = "none";
        part2.style.display = "";

        for(let i=1;i<=value;i++){
            let s = `<label>Enter subquestion for Question ${i}: <input type="number" class="subquestions" value="${buffer[i - 1] ? buffer[i - 1] : ""}" /></label>`;
            s = s + '<div class="subquestions_err"></div>';
            content = content + s;
        }
        subQuestionForm.innerHTML = content + subQuestionForm.innerHTML;

        document.getElementById("marks").addEventListener('input', function () {
            document.getElementById("marks_err").innerHTML = "";
        });
        

        const len = subquestions.length;
        for(let i=0;i<len;i++){
            subquestions[i].addEventListener('input',function(){
                subquestionsErr[i].innerHTML = "";
            });
        }
    }
});

firstBackBtn.addEventListener('click',function(){
   buffer = [];
   Array.from(subquestions).forEach((subquestion) => {
     buffer.push(subquestion.value);
   });
   
   part2.style.display = "none";
   part1.style.display = "";
});

secondNextBtn.addEventListener("click",function(){
  const len = subquestions.length;
  const marks = document.getElementById("marks").value;
  let correct = 0;
  for(let i=0;i<len;i++){
      const [isValid,err] = isValidQustionField(subquestions[i].value);
      if(!isValid) {
          subquestionsErr[i].innerHTML = err.replace("questions","subquestions");
      }else{
          correct++; 
      }
  }
  
  const [isValid,err] = isValidQustionField();

  if(!isValid){
      document.getElementById("marks_err").innerHTML = err.replace("questions","marks");
  }

  if(correct===len && isValid){
      const data = {
          questions : [],
          total_marks : marks
      }
      for(let i=0;i<len;i++){
          data.questions.push(Number(subquestions[i].value));
      }
    //   const jsonData = JSON.stringify(data);
      const url="/course/1/papers/generate/request";
      let responseUrl = "";
      fetch(url,{
          method : 'POST',
          body: JSON.stringify(data),
          headers : {
              'Content-Type' : 'application/json'
          },
      }).then((data)=> {
          responseUrl = data.url;
          return data.text();
      }).then((data)=>{
          const startIndex = data.indexOf("<form");
          const endIndex = data.indexOf("</form>");
          data = data.substr(startIndex,endIndex - startIndex + 1 + 6);
          part3.innerHTML = data;
          const jsFileUrl = "/static/js/papers/mark_distribution_form.js";
          const newScript = document.createElement("script");
          newScript.setAttribute("src",jsFileUrl);
          document.body.appendChild(newScript);
          const markForm = document.getElementById("mark_form");
          markForm.setAttribute("action",responseUrl);
      }).catch((err)=>{
          console.log(err);
      });
  }
});

function isValidQustionField(numberOfQuestions) {
    let isValid = true;
    let err = "";
    if (numberOfQuestions <= 0) {
        isValid = false;
        err = "number of questions must be positive";
    }
    return [isValid, err];
}