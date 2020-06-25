(function() {
const conflictsButton = document.getElementById("fix_conflicts");
const logoContent = document.getElementById("paper_logo");
const toggleContainer =
    Array.from(document.getElementsByClassName("toggle_container"));
const toggleButton = Array.from(document.getElementsByClassName("toggle_btn"));
const addCheckbox = Array.from(document.getElementsByClassName("add_checkbox"));
const qidContainer =
    Array.from(document.getElementsByClassName("first_row_column_1"));
const qids = qidContainer.map((node) => Number(node.getAttribute("data-id")));
const qtypes = Array.from(document.getElementsByClassName("first_row_column_3"))
                   .map((node) => node.innerHTML.trim());
const logoForm = document.getElementById("logoform");
const paperFields = Array.from(document.getElementsByClassName("paper_fields"));
const formClientErrs =
    Array.from(document.getElementsByClassName("form_client_error"));
const cognitiveSkills =
    Array.from(document.getElementsByClassName("cognitive"));
const difficultyLevels =
    Array.from(document.getElementsByClassName("difficulty"));
const conflictsContainer = document.getElementById("conflicts_container");

document.getElementById("page_display")
    .firstElementChild.firstElementChild.innerHTML = "Conflicts";

logoContent.style.display = "none";

qidContainer.forEach(function(node, index) { node.innerHTML = index + 1; });

[cognitiveSkills, difficultyLevels].forEach((nodes) => {
  nodes.forEach((node) => {
    node.classList.add(node.innerHTML.toLowerCase().trim());
    console.log(node);
  });
});

toggleContainer.forEach(function(node, index) {
  node.addEventListener("click", function() {
    if (addCheckbox[index].checked) {
      toggleButton[index].style.left = "4px";
      toggleContainer[index].style.backgroundColor = "#ccc";
    } else {
      toggleButton[index].style.left = "28px";
      toggleContainer[index].style.backgroundColor = "rgba(144, 0, 240, 0.76)";
    }
    addCheckbox[index].checked = !addCheckbox[index].checked;
  });
});

if (!addCheckbox.length) {
  const data = {mcq : {ask : [], nask : []}, sub : {ask : [], nask : []}};
  ajax(data);
} else {

  conflictsButton.addEventListener("click", function() {
    const mcqAskId = qids.filter((node, index) => addCheckbox[index].checked &&
                                                  qtypes[index] === "mcq");
    const mcqNaskId =
        qids.filter((node, index) =>
                        !addCheckbox[index].checked && qtypes[index] === "mcq");
    const subAskId = qids.filter((node, index) => addCheckbox[index].checked &&
                                                  qtypes[index] === "sub");
    const subNaskId =
        qids.filter((node, index) =>
                        !addCheckbox[index].checked && qtypes[index] === "sub");
    const data = {
      mcq : {
        ask : mcqAskId,
        nask : mcqNaskId,
      },
      sub : {
        ask : subAskId,
        nask : subNaskId,
      },
    };
    ajax(data);
  });
}

paperFields.forEach(function(node, index) {
  node.addEventListener("input",
                        function() { formClientErrs[index].innerHTML = ""; });
});

logoForm.addEventListener("submit", function(e) {
  const values = paperFields.map((node) => node.value);
  const status = isValid(values);
  if (!status.isValid) {
    formClientErrs.forEach(
        (node, index) => { node.innerHTML = status.err[index]; });
    e.preventDefault();
  }
});

function isValid(values) {
  let validation = {
    isValid : true,
    err : [],
  };
  values.forEach(function(value, index) {
    if (index !== 4) {
      if (!value) {
        validation.isValid = false;
        validation.err.push("required field!!");
      } else {
        validation.err.push("");
      }
    } else {
      if (!value) {
        validation.isValid = false;
        validation.err.push("required field!!");
      } else {
        const extension = value.substr(value.lastIndexOf(".") + 1);
        console.log(extension);
        const validExtensions = [ "jpg", "jpeg", "png", "tiff" ];
        if (validExtensions.indexOf(extension) === -1) {
          validation.isValid = false;
          validation.err.push("enter valid image file");
        } else {
          validation.err.push("");
        }
      }
    }
  });
  return validation;
}

function ajax(data) {
  fetch("/papers/handle/conflicts", {
    method : "post",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(data),
  })
      .then((res) => res.json())
      .then((res) => {
        const {status} = res;
        if (status === "OK") {
          logoContent.style.display = "";
          conflictsContainer.style.display = "none";
        }
      })
      .catch((err) => { console.log(err); });
}
})();
