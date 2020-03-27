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
const selectBtn = document.getElementById("select");
const deleteBtn = document.getElementById("delete");
const deleteOption = document.getElementsByClassName("deleteOption");
const controlBtns = document.getElementsByClassName("controlBtn");
const questionContainer = document.getElementsByClassName("questionContainer");
const questions = document.getElementById("questions");
// const hr = document.getElementsByClassName("hr");
const buffer = new Array(editBtns.length);
deleteBtn.style.display = "none";
markBtn.style.display = "inline-block";
editBtns.forEach(node => {
    node.addEventListener("click", () => {
        if (
            !forms.length &&
            markBtn.style.display !== "none" &&
            deleteBtn.style.display === "none"
        ) {
            let content = "";
            const qid = Number(questionNumber[editBtns.indexOf(node)].innerText);
            const url = "/question/update/" + qid;
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
    if (!forms.length && deleteBtn.style.display === "none") {
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
        selectBtn.style.display = "none";
        resetImp.style.display = "inline";
        updateBtn.style.display = "inline";
    }
});

resetImp.addEventListener("click", () => {
    if (markBtn.style.display === "none" && deleteBtn.style.display === "none") {
        Array.from(checkBoxes).forEach(node => {
            node.previousElementSibling.style.display = "block";
            node.style.display = "none";
        });
        markBtn.style.display = "inline-block";
        selectBtn.style.display = "inline-block";
        resetImp.style.display = "none";
        updateBtn.style.display = "none";
    } else {
        Array.from(deleteOption).forEach(node => {
            node.style.display = "none";
        });
        resetImp.style.display = "none";
        deleteBtn.style.display = "none";
        selectBtn.style.display = "inline-block";
        markBtn.style.display = "inline-block";
    }
});
updateBtn.addEventListener("click", () => {
    const impIds = [];
    const notImpIds = [];
    Array.from(checkBoxes).forEach(node => {
        if (node.checked) {
            const qid = Number(
                questionNumber[Array.from(checkBoxes).indexOf(node)].innerText
            );
            impIds.push(qid);
        } else {
            const qid = Number(
                questionNumber[Array.from(checkBoxes).indexOf(node)].innerText
            );
            notImpIds.push(qid);
        }
    });
    const data = {
        imp: impIds,
        notimp: notImpIds
    };

    const jsonData = JSON.stringify(data);
    // const jsonIds = JSON.stringify(ids);
    const url = "/question/imp/" + jsonData;
    fetch(url)
        .then(() => {
            Array.from(checkBoxes).forEach(node => {
                if (node.checked) node.previousElementSibling.innerHTML = ":True";
                else node.previousElementSibling.innerHTML = ":False";
                node.previousElementSibling.style.display = "block";
                node.style.display = "none";
            });
            markBtn.style.display = "inline-block";
            selectBtn.style.display = "inline-block";
            resetImp.style.display = "none";
            updateBtn.style.display = "none";
        })
        .catch(e => {
            throw new Error(e);
        });
});

selectBtn.addEventListener("click", () => {
    if (!forms.length && markBtn.style.display !== "none") {
        Array.from(deleteOption).forEach(node => {
            node.style.display = "block";
        });
    }
    deleteBtn.style.display = "inline-block";
    selectBtn.style.display = "none";
    markBtn.style.display = "none";
    resetImp.style.display = "inline-block";
});

deleteBtn.addEventListener("click", () => {
    const ids = [];
    Array.from(deleteOption).forEach(node => {
        if (node.checked) {
            const qid = Number(
                questionNumber[Array.from(deleteOption).indexOf(node)].innerText
            );
            ids.push(qid);
        }
    });
    const jsonId = JSON.stringify(ids);
    const url = "/question/delete/" + jsonId;
    fetch(url)
        .then(() => {
            Array.from(deleteOption).forEach(node => {
                if (node.checked) {
                    questions.removeChild(
                        controlBtns[Array.from(deleteOption).indexOf(node)]
                    );
                    questions.removeChild(
                        questionContainer[Array.from(deleteOption).indexOf(node)]
                    );
                    //   questions.removeChild(hr[Array.from(deleteOption).indexOf(node)]);
                } else {
                    node.style.display = "none";
                }
            });
            selectBtn.style.display = "inline-block";
            markBtn.style.display = "inline-block";
            deleteBtn.style.display = "none";
            resetImp.style.display = "none";
        })
        .catch(e => {
            throw new Error(e);
        });
});
