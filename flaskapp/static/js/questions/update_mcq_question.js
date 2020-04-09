const forms = document.getElementsByTagName("form");
const qids = document.getElementsByClassName("first_row_column_1");
const imps = document.getElementsByClassName("first_row_column_2");
const markLabel = document.getElementsByClassName("mark_label");
const updateImp = document.getElementsByClassName("first_row_column_3");
const impCheckbox = document.getElementsByClassName("imp_checkbox");
const mark = document.getElementById("mark_imp");
const deleteBtn = document.getElementById("delete_btn");
const deleteOption = document.getElementsByClassName("delete_question");
const deleteCheckbox = document.getElementsByClassName("delete_checkbox");
const questions = document.getElementsByClassName("question_container");
const editQuestion = document.getElementsByClassName("edit_question");
const cancelBtn = document.getElementById("cancel_btn");
const footer = document.getElementsByTagName("footer")[0];
footer.style.position = "fixed";
footer.style.bottom = "0px";
footer.style.left = "0px";
footer.style.right = "0px";
/**for styling */
const blockMain = document.getElementsByClassName("block_main");
if (blockMain.length) blockMain[0].classList.remove("block_main");
const buffer = {
  data: "",
  index: -1,
};

for (let i = 0; i < imps.length; i++) {
  if (imps[i].innerText === "True") {
    imps[i].innerText = "IMP";
    impCheckbox[i].checked = true;
  } else {
    imps[i].innerText = "";
  }
  markLabel[i].innerText = "Set IMP";
}

mark.addEventListener("click", () => {
  if (
    !forms[0] &&
    deleteOption.length &&
    deleteOption[0].style.display !== "block"
  ) {
    if (updateImp[0].style.display !== "block") {
      for (let i = 0; i < imps.length; i++) {
        imps[i].style.display = "none";
        updateImp[i].style.display = "block";
      }
    } else {
      const impIds = [];
      const notImpIds = [];
      for (let i = 0; i < impCheckbox.length; i++) {
        const matchArray = /\d+/.exec(qids[i].innerText);
        if (impCheckbox[i].checked) {
          impIds.push(Number(matchArray[0]));
        } else {
          notImpIds.push(Number(matchArray[0]));
        }
      }
      const data = {
        imp: impIds,
        notimp: notImpIds,
      };
      const jsonData = JSON.stringify(data);
      const url = window.location.href + "imp/" + jsonData;
      fetch(url)
        .then(() => {
          for (let i = 0; i < impCheckbox.length; i++) {
            if (impCheckbox[i].checked) imps[i].innerText = "IMP";
            else imps[i].innerText = "";
            imps[i].style.display = "block";
            updateImp[i].style.display = "none";
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
  }
});

deleteBtn.addEventListener("click", () => {
  if (updateImp.length && updateImp[0].style.display !== "block" && !forms[0]) {
    if (deleteOption[0].style.display !== "block") {
      for (let i = 0; i < deleteOption.length; i++) {
        deleteOption[i].style.display = "block";
      }
    } else {
      const ids = [];
      for (let i = 0; i < deleteCheckbox.length; i++) {
        if (deleteCheckbox[i].checked) {
          const matchArray = /\d+/.exec(qids[i].innerText);
          ids.push(parseInt(matchArray[0]));
        }
      }
      const jsonId = JSON.stringify(ids);
      const url = window.location.href + "delete/" + jsonId;
      fetch(url)
        .then(() => {
          for (let i = 0; i < deleteCheckbox.length; i++) {
            if (!deleteCheckbox[i].checked) {
              deleteOption[i].style.display = "none";
            } else {
              questions[i].parentNode.removeChild(questions[i]);
              i--;
            }
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
  }
});

Array.from(editQuestion).forEach((node) => {
  node.addEventListener("click", () => {
    edit(Array.from(editQuestion).indexOf(node));
  });
});

cancelBtn.addEventListener("click", () => {
  let flag = false;

  for (let j = 0; j < deleteOption.length; j++) {
    if (deleteOption[j].style.display === "block") {
      flag = true;
      break;
    }
  }
  if (flag) {
    for (let i = 0; i < deleteOption.length; i++) {
      deleteOption[i].style.display = "none";
      deleteCheckbox[i].checked = false;
    }
    return;
  }
  for (let j = 0; j < updateImp.length; j++) {
    if (updateImp[j].style.display === "block") {
      flag = true;
      break;
    }
  }
  if (flag) {
    for (let i = 0; i < updateImp.length; i++) {
      updateImp[i].style.display = "none";
      imps[i].style.display = "block";
    }
    return;
  }
  if (forms[0]) {
    questions[buffer.index].innerHTML = buffer.data;
    const index = buffer.index;
    editQuestion[index].addEventListener("click", () => {
      edit(index);
    });
    document.body.removeChild(document.getElementById("updateScript"));
    return;
  }
});

function edit(i) {
  if (
    !forms[0] &&
    deleteOption[0].style.display !== "block" &&
    updateImp[0].style.display !== "block"
  ) {
    const qid = parseInt(/\d+/.exec(qids[i].innerText)[0]);
    const url = window.location.href + "update/" + qid + "/";
    fetch(url)
      .then((data) => data.text())
      .then((data) => {
        let content = "";
        content = data;
        const startIndex = content.indexOf("<form");
        const lastIndex = content.indexOf("</form");
        const form = content.substr(startIndex, lastIndex + 6 - startIndex + 1);
        buffer.data = questions[i].innerHTML;
        buffer.index = i;
        questions[i].innerHTML = form;
        forms[0].action = url;
        forms[0].style.width = "100%";
        forms[0].style.backgroundColor = "rgba(0,0,0,0)";
        forms[0].style.padding = "15px 10px";
        const myscript = document.createElement("script");
        myscript.setAttribute(
          "src",
          "/static/js/questions/mcq_question_form.js"
        );
        myscript.setAttribute("id", "updateScript");
        document.body.appendChild(myscript);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}

/**for sideNav css */
