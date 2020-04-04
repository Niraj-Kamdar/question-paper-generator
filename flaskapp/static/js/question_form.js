/**wrapping everything inside IIFE to create separate context */

(function() {
  const form = document.getElementsByTagName("form")[0];
  //   const question = document.getElementById("form__fields__question");
  //   const mark = document.getElementById("form__fields__mark");
  //   const difficulty = document.getElementById("form__fields__difficulty");
  const formErrors = document.getElementsByClassName("form__client_error");
  const question = document.getElementById("form_field_question_value");
  const mark = document.getElementById("marks_value");
  const difficulty = document.getElementById("difficulty_value");
  const impCheckbox = document.getElementById("imp_checkbox");
  const toggleBtn = document.getElementById("toggle_btn");
  const toggleContainer = document.getElementById("toggle_container");
  const resetBtn = document.getElementById("reset_btn");
  mark.setAttribute("placeholder", "Enter marks here");
  difficulty.setAttribute("placeholder", "Enter difficulty here");
  question.setAttribute("placeholder", "Enter question here");
  question.addEventListener("blur", () => {
    if (question.value.trim() === "")
      formErrors[0].innerHTML = "empty question";
    if (question.value.trim().length < 2)
      formErrors[0].innerHTML = "enter valid question";
  });
  question.addEventListener("input", () => {
    if (formErrors[0].innerHTML) formErrors[0].innerHTML = "";
  });
  mark.addEventListener("blur", e => {
    if (
      Number(e.target.value.trim()) < 1 ||
      Number(e.target.value.trim()) > 100 ||
      e.target.value.trim() === "" ||
      isNaN(Number(e.target.value.trim()))
    )
      formErrors[1].innerHTML = "enter marks between 1 and 100";
  });
  mark.addEventListener("input", () => {
    if (formErrors[1].innerHTML) formErrors[1].innerHTML = "";
  });
  difficulty.addEventListener("blur", e => {
    if (
      Number(e.target.value.trim()) < 1 ||
      Number(e.target.value.trim()) > 100 ||
      e.target.value.trim() === "" ||
      isNaN(Number(e.target.value.trim()))
    )
      formErrors[2].innerHTML = "enter difficulty level between 1 and 100";
  });
  difficulty.addEventListener("input", () => {
    if (formErrors[2].innerHTML) formErrors[2].innerHTML = "";
  });
  form.addEventListener("submit", e => {
    let flag = 0;
    if (question.value.trim() === "") {
      formErrors[0].innerHTML = "empty question";
      flag++;
    }
    if (question.value.trim() < 2) {
      formErrors[0].innerHTML = "enter valid question";
      flag++;
    }
    if (
      Number(mark.value.trim()) < 1 ||
      Number(mark.value.trim()) > 100 ||
      mark.value.trim() === "" ||
      isNaN(Number(mark.value.trim()))
    ) {
      formErrors[1].innerHTML = "enter marks between 1 and 100";
      flag++;
    }
    if (
      Number(difficulty.value.trim()) < 1 ||
      Number(difficulty.value.trim()) > 100 ||
      difficulty.value.trim() === "" ||
      isNaN(Number(difficulty.value.trim()))
    ) {
      formErrors[2].innerHTML = "enter difficulty level between 1 and 100";
      flag++;
    }
    if (flag) {
      e.preventDefault();
    }
  });

  /**if checkbox is already checked */
  if (impCheckbox.checked) {
    toggleBtn.style.left = "24px";
    toggleContainer.style.backgroundColor = "#2196F3";
  }
  toggleContainer.addEventListener("click", () => {
    if (impCheckbox.checked) {
      toggleBtn.style.left = "4px";
      toggleContainer.style.backgroundColor = "#ccc";
    } else {
      toggleBtn.style.left = "24px";
      toggleContainer.style.backgroundColor = "#2196F3";
    }
    impCheckbox.checked = !impCheckbox.checked;
  });

  /**hiding cancel button on question list page */
  if (window.location.href.indexOf("new") === -1)
    resetBtn.style.display = "none";

  /**setting toggle switch and removing errors  on reset button*/
  resetBtn.addEventListener("click", () => {
    toggleBtn.style.left = "4px";
    toggleContainer.style.backgroundColor = "#ccc";
    for (let i = 0; i < formErrors.length; i++) {
      formErrors[i].innerHTML = "";
    }
  });
})();
