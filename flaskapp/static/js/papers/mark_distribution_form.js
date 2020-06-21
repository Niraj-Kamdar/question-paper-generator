(function() {

    const markForm = document.getElementById("mark_form");
    const hiddenLabel = Array.from(document.getElementsByClassName("hidden_label"));
    const labels = Array.from(document.getElementsByClassName("label"));
    const inputField = Array.from(document.getElementsByClassName("input_field"));
    const backBtn = Array.from(document.getElementsByClassName("back_btn"));
    const nextBtn = Array.from(document.getElementsByClassName("next_btn"));
    const pages = document.getElementsByClassName("pages");
    const marks = Number(document.getElementById("total_marks").innerHTML);
    const unitFields = Array.from(document.getElementsByClassName("unit"));
    const cognitiveFields = Array.from(document.getElementsByClassName("cognitive"));
    const difficultyFields = Array.from(document.getElementsByClassName("difficulty"));
    const questionsFields = Array.from(document.getElementsByClassName("question"));
    const questionTypeFields = Array.from(document.getElementsByClassName("question_type"));
    const unitFieldsErr = Array.from(document.getElementsByClassName("unit_err"));
    const cognitiveFieldsErr = Array.from(document.getElementsByClassName("cognitive_err"));
    const difficultyFieldsErr = Array.from(document.getElementsByClassName("difficulty_err"));
    const questionTypeFieldsErr = Array.from(document.getElementsByClassName("question_type_err"));
    const questionsFieldsErr = Array.from(document.getElementsByClassName("question_err"));
    const marksErr = document.getElementsByClassName("marks_err");
    const header = document.getElementsByClassName("header")[0];
    const fieldHeader = Array.from(document.getElementsByClassName("field_header"));
    const formParts = [unitFields, cognitiveFields, difficultyFields,questionTypeFields, questionsFields];
    const formPartsErr = [unitFieldsErr, cognitiveFieldsErr, difficultyFieldsErr,questionTypeFieldsErr, questionsFieldsErr];

    hiddenLabel.forEach(function (node) {
        node.style.display = "none";
    });

    labels.forEach(function (node, index) {
        node.setAttribute("for", hiddenLabel[index].getAttribute("for"));
        node.innerHTML = hiddenLabel[index].innerHTML;
    });

    inputField.forEach(function (node, index) {
        const forAttribute = hiddenLabel[index].getAttribute("for");
        node.setAttribute("id", forAttribute);
        node.setAttribute("name", forAttribute);
    });

    fieldHeader.forEach(function (node) {
       node.style.display = "none";
    });

    Array.from(pages).forEach(function(node,index){
       if(index) {
           node.style.display = "none";
       }
    });
    header.innerHTML = fieldHeader[0].innerHTML;

    markForm.addEventListener("submit", function (e) {
        navigationHandler(3, false, e);
    });

    formParts.forEach(function (element, index) {
        element.forEach(function (node, index2) {
            node.addEventListener('input', function () {
                formPartsErr[index][index2].innerHTML = "";
                marksErr[index].innerHTML = "";
            });
        });
    });

    nextBtn.forEach(function (node, index) {
        if (index !== 4) {
            node.addEventListener('click', function () {
                navigationHandler(index, false);
            });
        }
    });

    backBtn.forEach(function (node, index) {
        node.addEventListener('click', function () {
            navigationHandler(index, true);
        });
    });


    function isValidNumber(number) {
        let isValid = false;
        let err = "";
        if (number === "") {
            err = "Enter Marks in Integers";
        } else if (Number(number) <= 0) {
            err = "Marks should be positive";
        } else {
            const indexOfDecimal = number.indexOf(".");
            const indexOfExp = number.indexOf("e");
            if (indexOfDecimal !== -1 || indexOfExp !== -1) {
                err = "Enter Marks in Integers";
            }
        }
        if (!err) {
            isValid = true;
        }
        return [isValid, err];
    }

    function isValidTotalMarks(element) {
        const total_marks = element.map(node => Number(node.value)).reduce((acc, cur) => acc + cur);
        return total_marks === marks;
    }

    function isErrExists(...element) {
        return element.map((node) => node.innerHTML).reduce((acc, cur) => acc + cur);
    }

    function navigationHandler(index, back, event) {
        if (back) index++;
        const s = isErrExists(...formPartsErr[index], marksErr[index]);
        if (!s) {
            let validFields = 0;
            formParts[index].forEach(function (node, index2) {
                const [isValid, err] = isValidNumber(node.value);
                if (!isValid) {
                    formPartsErr[index][index2].innerHTML = err;
                } else {
                    validFields++;
                }
            });
            console.log(formParts,formParts[index]);
            const status = isValidTotalMarks(formParts[index]);
            if (status) {
                validFields++;
            } else {
                marksErr[index].innerHTML = "Total marks are not equal to paper marks!!";
            }
            if (validFields === formParts[index].length + 1) {
                pages[index].style.display = "none";
                if (back) {
                    pages[index - 1].style.display = "";
                    header.innerHTML = fieldHeader[index-1].innerHTML;
                } else {
                    if(index + 1<5) {
                        pages[index + 1].style.display = "";
                        header.innerHTML = fieldHeader[index + 1].innerHTML;
                    }
                }
            } else {
                if (event) event.preventDefault();
            }
        }
    }
})();