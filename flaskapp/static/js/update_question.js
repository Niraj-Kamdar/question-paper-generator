const editBtns = Array.from(document.getElementsByClassName("editBtn"));
const cancelBtns = Array.from(document.getElementsByClassName("cancelBtn"));
const formContent = Array.from(document.getElementsByClassName("formContent"));
const forms = document.getElementsByTagName("form");
const buffer = new Array(editBtns.length);
editBtns.forEach(node => {
  node.addEventListener("click", e => {
    if (!forms.length) {
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
          document.body.appendChild(myscript);
        })
        .catch(e => {
          console.log(e);
        });
    }
  });
});
cancelBtns.forEach(node => {
  node.addEventListener("click", e => {
    formContent[cancelBtns.indexOf(node)].innerHTML =
      buffer[cancelBtns.indexOf(node)];
    node.style.display = "none";
    editBtns[cancelBtns.indexOf(node)].style.display = "inline-block";
  });
});
