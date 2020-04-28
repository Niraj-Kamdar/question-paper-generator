{
  const forms = document.getElementsByTagName("form");
  const updateImp = document.getElementsByClassName("first_row_column_3");
  const deleteOption = document.getElementsByClassName("delete_question");
  const qids = document.getElementsByClassName("first_row_column_1");
  const questions = document.getElementsByClassName("question_container");
  const deleteCheckbox = document.getElementsByClassName("delete_checkbox");
  const imps = document.getElementsByClassName("first_row_column_2");
  const impCheckbox = document.getElementsByClassName("imp_checkbox");

  let pageNo = 1;
  let activeBtn = {};
  const buffer = {
    data: "",
    index: -1,
  };
  {
    activeBtn = document.querySelector("a.btn-info");
    if (activeBtn) pageNo = Number(activeBtn.innerText);

    for (let i = 0; i < qids.length; i++) {
      qids[i].innerText = (pageNo - 1) * qids.length + (i + 1);
    }
  }
  {
    const markLabel = document.getElementsByClassName("mark_label");
    for (let i = 0; i < imps.length; i++) {
      if (imps[i].innerText === "True") {
        imps[i].innerText = "IMP";
        impCheckbox[i].checked = true;
      } else {
        imps[i].innerText = "";
      }
      markLabel[i].innerText = "Set IMP";
    }
  }
  {
    function urlGenerator() {
      let url = window.location.href;
      let subIndex = url.indexOf("/sub");
      url = url.substr(0, subIndex + 4 + 1);
      return url;
    }

    {
      function edit(i) {
        if (
          !forms[0] &&
          deleteOption[0].style.display !== "block" &&
          updateImp[0].style.display !== "block"
        ) {
          const qid = parseInt(qids[i].getAttribute("data-id"));

          let url = urlGenerator();

          url = url + "update/" + qid + "/";
          fetch(url)
            .then((data) => data.text())
            .then((data) => {
              let content = "";
              let startIndex = -1;
              let lastIndex = -1;
              let form = "";
              let myscript = {};
              content = data;
              startIndex = content.indexOf("<form");
              lastIndex = content.indexOf("</form");
              form = content.substr(startIndex, lastIndex + 6 - startIndex + 1);
              buffer.data = questions[i].innerHTML;
              buffer.index = i;
              questions[i].innerHTML = form;
              forms[0].action = url;
              forms[0].style.width = "100%";
              forms[0].style.backgroundColor = "rgba(0,0,0,0)";
              forms[0].style.padding = "15px 10px";
              myscript = document.createElement("script");
              myscript.setAttribute(
                "src",
                "/static/js/questions/question_form.js"
              );
              myscript.setAttribute("id", "updateScript");
              document.body.appendChild(myscript);
            })
            .catch((e) => {
              throw new Error(e);
            });
        }
      }
      {
        const editQuestion = document.getElementsByClassName("edit_question");
        {
          Array.from(editQuestion).forEach((node) => {
            node.addEventListener("click", () => {
              edit(Array.from(editQuestion).indexOf(node));
            });
          });
        }
        {
          const cancelBtn = document.getElementById("cancel_btn");

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
              const index = buffer.index;
              let script = "";
              questions[buffer.index].innerHTML = buffer.data;

              editQuestion[index].addEventListener("click", () => {
                edit(index);
              });
              script = document.getElementById("updateScript");
              document.body.removeChild(script);
              return;
            }
          });
        }
      }
    }
    {
      const deleteBtn = document.getElementById("delete_btn");
      deleteBtn.addEventListener("click", () => {
        if (
          updateImp.length &&
          updateImp[0].style.display !== "block" &&
          !forms[0]
        ) {
          if (deleteOption[0].style.display !== "block") {
            for (let i = 0; i < deleteOption.length; i++) {
              deleteOption[i].style.display = "block";
            }
          } else {
            const ids = [];
            let jsonId = "";
            let url = "";
            for (let i = 0; i < deleteCheckbox.length; i++) {
              if (deleteCheckbox[i].checked) {
                ids.push(parseInt(qids[i].getAttribute("data-id")));
              }
            }
            jsonId = JSON.stringify(ids);
            url = urlGenerator();
            url = url + "delete/" + jsonId;
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
    }
    {
      const mark = document.getElementById("mark_imp");
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
            let data = {};
            let jsonData = "";
            let url = urlGenerator();
            for (let i = 0; i < impCheckbox.length; i++) {
              if (impCheckbox[i].checked) {
                impIds.push(qids[i].getAttribute("data-id"));
              } else {
                notImpIds.push(qids[i].getAttribute("data-id"));
              }
            }
            data = {
              imp: impIds,
              notimp: notImpIds,
            };
            jsonData = JSON.stringify(data);
            url = url + "imp/" + jsonData;
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
    }
  }
}

/**for side nav */
