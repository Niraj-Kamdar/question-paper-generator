const editBtns = Array.from(document.getElementsByClassName("editBtn"));
const cancelBtns = Array.from(document.getElementsByClassName("cancelBtn"));
const formContent = Array.from(document.getElementsByClassName("formContent"));
const checkBoxes = document.getElementsByClassName("imp");
const resetImp = document.getElementById("cancel");
const questionNumber = Array.from(
  document.getElementsByClassName("questionId")
);
const forms = document.getElementsByTagName("form");
const markBtn = document.getElementById("mark");
const updateBtn = document.getElementById("update");
const buffer = new Array(editBtns.length);
editBtns.forEach(node => {
  node.addEventListener("click", () => {
    if (!forms.length && markBtn.style.display !== "none") {
      let content = "";
      const url = "/question/update/" + (editBtns.indexOf(node) + 1);
      fetch(url)
        .then(data => data.text())
        .then(data => {
          content = data;
          const startIndex = content.indexOf("<form");
          const lastIndex = content.indexOf("</form");
          const form = content.substr(
            startIndex,
            lastIndex + 6 - startIndex + 1
          );
          buffer[editBtns.indexOf(node)] =
            formContent[editBtns.indexOf(node)].innerHTML;
          formContent[editBtns.indexOf(node)].innerHTML = form;
          cancelBtns[editBtns.indexOf(node)].style.display = "inline-block";
          node.style.display = "none";
          forms[0].action = url;

          const myscript = document.createElement("script");
          myscript.setAttribute("src", "/static/js/question_form.js");
          myscript.setAttribute("id", "updateScript");
          document.body.appendChild(myscript);
        })
        .catch(e => {
          throw new Error(e);
        });
    }
  });
});
cancelBtns.forEach(node => {
  node.addEventListener("click", () => {
    formContent[cancelBtns.indexOf(node)].innerHTML =
      buffer[cancelBtns.indexOf(node)];
    node.style.display = "none";
    editBtns[cancelBtns.indexOf(node)].style.display = "inline-block";
    document.body.removeChild(document.getElementById("updateScript"));
  });
});

markBtn.addEventListener("click", () => {
  if (!forms.length) {
    Array.from(checkBoxes).forEach(node => {
      node.previousElementSibling.style.display = "none";
      if (node.previousElementSibling.innerText === ":True")
        node.checked = true;
      else {
        node.checked = false;
      }
      node.style.display = "block";
    });
    markBtn.style.display = "none";
    resetImp.style.display = "inline";
    updateBtn.style.display = "inline";
  }
});

resetImp.addEventListener("click", () => {
  Array.from(checkBoxes).forEach(node => {
    node.previousElementSibling.style.display = "block";
    node.style.display = "none";
  });
  markBtn.style.display = "block";
  resetImp.style.display = "none";
  updateBtn.style.display = "none";
});
updateBtn.addEventListener("click", () => {
  const ids = [];
  Array.from(checkBoxes).forEach(node => {
    if (node.checked) {
      const qid = Number(
        questionNumber[Array.from(checkBoxes).indexOf(node)].innerText
      );
      ids.push(qid);
    }
  });
  const jsonIds = JSON.stringify(ids);
  const url = "/question/imp/" + jsonIds;
  fetch(url)
    .then(() => {
      Array.from(checkBoxes).forEach(node => {
        if (node.checked) node.previousElementSibling.innerHTML = ":True";
        else node.previousElementSibling.innerHTML = ":False";
        node.previousElementSibling.style.display = "block";
        node.style.display = "none";
      });
      markBtn.style.display = "block";
      resetImp.style.display = "none";
      updateBtn.style.display = "none";
    })
    .catch(e => {
      throw new Error(e);
    });
});
