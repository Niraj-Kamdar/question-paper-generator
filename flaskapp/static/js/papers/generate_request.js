
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

part2.style.display = "none";

numberOfQuestions.addEventListener('input',function(){
   questionsErr.innerHTML = "";
});

firstNextBtn.addEventListener("click",function(e){
    const value = numberOfQuestions.value;
    const [isValid,err] = isValidNumber(value);
    if(!isValid){
       questionsErr.innerHTML = err;
    } else {
        e.target.parentNode.parentNode.style.display = "none";
        part2.style.display = "";
        generateSubQuestionForm(value);
    }
});


secondNextBtn.addEventListener("click",function(){
  const len = subquestions.length;
  const marks = document.getElementById("marks").value;
  let correct = 0;

  Array.from(subquestions).forEach(function(node,index){
      const [isValid,err] = isValidNumber(node.value);
      if(!isValid) {
          subquestionsErr[index].innerHTML = err.replace("Questions","Sub Questions");
      }else{
          correct++;
      }
  });

  const [isValid,err] = isValidNumber(marks);
  if(!isValid){
      document.getElementById("marks_err").innerHTML = err.replace("Number of Questions","marks");
  }

  if(correct===len && isValid){
      const data = {
          questions : [],
          total_marks : marks
      };
      data.questions = Array.from(subquestions).map(node=>Number(node.value));
      generateMarksForm(data);
  }
});


const generateSubQuestionForm = (function(){
    let buffer = [];

    firstBackBtn.addEventListener('click',function(){
       buffer = Array.from(subquestions).map((node)=>node.value);
       part2.style.display = "none";
       part1.style.display = "";
     });

    return function(value){
      let content = "";
      for(let i=1;i<=value;i++){
            let s = `<label>Enter subquestion for Question ${i}: <input type="number" class="subquestions" value="${buffer[i - 1] ? buffer[i - 1] : ""}" /></label>`;
            s = s + '<div class="subquestions_err"></div>';
            content = content + s;
        }
        subQuestionForm.innerHTML = content + subQuestionForm.innerHTML;

        document.getElementById("marks").addEventListener('input', function () {
            document.getElementById("marks_err").innerHTML = "";
        });

        Array.from(subquestions).forEach(function(node,index){
            node.addEventListener('input',function(){
               subquestionsErr[index].innerHTML = "";
            });
        });
     }
})();

function isValidNumber(number){
    let isValid = false;
    let err = "";
    if(number===""){
        err = "Enter Number of Questions in Integers";
    } else if(Number(number)<=0) {
        err = "Number of Questions should be positive";
    } else{
        const indexOfDecimal = number.indexOf(".");
        const indexOfExp = number.indexOf("e");
        if(indexOfDecimal!==-1 || indexOfExp!==-1){
            err = "Enter Number of Questions in Integers";
        }
    }
    if(!err){
        isValid = true;
    }
    return [isValid,err];
}

async function generateMarksForm(data){
      const windowUrl = window.location.href;
      const startIndex = windowUrl.indexOf("/course");
      const endIndex = windowUrl.indexOf("/papers");
      let url = windowUrl.substr(startIndex + 7 + 1,endIndex - startIndex - 8);
      url="/course/" + url + "/papers/generate/request";
      let responseUrl = "";
      const data2 = data;
      try {

          const response = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(data2),
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          responseUrl = response.url;
          const data = await response.text();
          const startIndex = data.indexOf("<form");
          const endIndex = data.indexOf("</form>");
          part3.innerHTML = data.substr(startIndex,endIndex - startIndex + 1 + 6);
          const jsFileUrl = "/static/js/papers/mark_distribution_form.js";
          const newScript = document.createElement("script");
          newScript.setAttribute("src",jsFileUrl);
          document.body.appendChild(newScript);
          const markForm = document.getElementById("mark_form");
          markForm.setAttribute("action",responseUrl);
      } catch(e){
          document.getElementById("network_err").innerHTML = "NETWORK ERROR " + e;
      }
}