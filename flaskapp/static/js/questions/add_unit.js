(function() {
const chapterNo = document.getElementById("form__fields__chapter_no");
const name = document.getElementById("form__fields__name");
const formError = document.querySelectorAll(".form__error li");
const clientError = document.getElementsByClassName("form__client_error");
const form = document.getElementById("unit_form");
const resetBtn = document.getElementById("reset_btn");
for (let err of formError) {
  err.innerHTML = "";
}
chapterNo.addEventListener("input", () => { clientError[0].innerHTML = ""; });
name.addEventListener("input", () => { clientError[1].innerHTML = ""; });
resetBtn.addEventListener("click", function() {
  chapterNo.value = "";
  name.value = "";
  clientError[0].innerHTML = "";
  clientError[1].innerHTML = "";
});
form.addEventListener("submit", function(e) {
  let valid = {};
  for (let err of clientError) {
    err.innerHTML = "";
  }
  for (let err of formError) {
    err.innerHTML = "";
  }
  valid = isValid(chapterNo.value, name.value);
  if (!valid.isValid) {
    e.preventDefault();
    for (let i = 0; i < 2; i++) {
      clientError[i].innerHTML = valid.error[i];
    }
  }
});

function isValid(chapterNo, name) {
  const valid = {
    isValid : true,
    error : [],
  };
  if (chapterNo === "") {
    valid.isValid = false;
    valid.error.push("chapter number is required!!");
  } else if (isNaN(Number(chapterNo))) {
    valid.isValid = false;
    valid.error.push("chapter number must be integer");
  } else if (Number(chapterNo) < 1 || Number(chapterNo) > 100) {
    valid.isValid = false;
    valid.error.push("chapter number must be between 1 and 100");
  } else {
    valid.error.push("");
  }

  if (name === "") {
    valid.isValid = false;
    valid.error.push("Chapter name is required!!");
  } else if (name.length < 3) {
    valid.isValid = false;
    valid.error.push("name must have atleast three letters");
  } else {
    valid.error.push("");
  }
  return valid;
}
})();
