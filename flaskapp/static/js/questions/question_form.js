(function () {
    const form = document.getElementsByTagName("form")[0];
    const formErrors = document.getElementsByClassName("form__client_error");
    const question = document.getElementById("form_field_question_value");
    const mark = document.getElementById("marks_value");
    const difficulty = document.getElementById("difficulty_value");
    const toggleContainer = document.getElementById("toggle_container");
    const toggleBtn = document.getElementById("toggle_btn");
    const impCheckbox = document.getElementById("imp_checkbox");
    const resetBtn = document.getElementById("reset_btn");
    mark.setAttribute("placeholder", "Enter marks here");
    difficulty.setAttribute("placeholder", "Enter difficulty here");
    question.setAttribute("placeholder", "Enter question here");

    /**for styling */
    const blockMain = document.getElementsByClassName("block_main");
    if (blockMain.length) blockMain[0].classList.remove("block_main");
    // question.addEventListener("blur", () => {
    //   if (question.value.trim() === "")
    //     formErrors[0].innerHTML = "empty question";
    //   if (question.value.trim().length < 2)
    //     formErrors[0].innerHTML = "enter valid question";
    // });
    // question.addEventListener("input", () => {
    //   if (formErrors[0].innerHTML) formErrors[0].innerHTML = "";
    // });
    // mark.addEventListener("blur", (e) => {
    //   if (
    //     Number(e.target.value.trim()) < 1 ||
    //     Number(e.target.value.trim()) > 100 ||
    //     e.target.value.trim() === "" ||
    //     isNaN(Number(e.target.value.trim()))
    //   )
    //     formErrors[1].innerHTML = "enter marks between 1 and 100";
    // });
    // mark.addEventListener("input", () => {
    //   if (formErrors[1].innerHTML) formErrors[1].innerHTML = "";
    // });
    // difficulty.addEventListener("blur", (e) => {
    //   if (
    //     Number(e.target.value.trim()) < 1 ||
    //     Number(e.target.value.trim()) > 100 ||
    //     e.target.value.trim() === "" ||
    //     isNaN(Number(e.target.value.trim()))
    //   )
    //     formErrors[2].innerHTML = "enter difficulty level between 1 and 100";
    // });

    // difficulty.addEventListener("input", () => {
    //   if (formErrors[2].innerHTML) formErrors[2].innerHTML = "";
    // });

    form.addEventListener("submit", (e) => {
        let flag = 0;
        for (let i = 0; i < formErrors.length; i++) {
            formErrors[i].innerHTML = "";
        }
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

    toggleContainer.addEventListener("click", () => {
        if (impCheckbox.checked) {
            toggleBtn.style.left = "4px";
            toggleContainer.style.backgroundColor = "#ccc";
        } else {
            toggleBtn.style.left = "28px";
            toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
        }
        impCheckbox.checked = !impCheckbox.checked;
    });

    resetBtn.addEventListener("click", () => {
        toggleBtn.style.left = "4px";
        toggleContainer.style.backgroundColor = "#ccc";
        for (let i = 0; i < formErrors.length; i++) {
            formErrors[i].innerHTML = "";
        }
    });

    /** for question update form */
    if (impCheckbox.checked) {
        toggleBtn.style.left = "28px";
        toggleContainer.style.backgroundColor = "rgba(144, 0, 240, 0.76)";
    }

    if (window.location.href.indexOf("new") === -1) {
        resetBtn.style.display = "none";
    } else {
        const courseName = document.getElementsByClassName("course_name");
        const courseId = document.getElementsByClassName("course_id");
        const coursesItemContainer = document.getElementsByClassName(
            "courses_items_container"
        );

        coursesItemContainer[0].innerHTML = "";
        const url = window.location.href;
        const courseIndex = url.indexOf("course");
        const partialUrl = url.substr(0, courseIndex + 6);
        const laterUrl = url.substr(courseIndex);
        for (let i = 0; i < courseName.length; i++) {
            const completeUrl =
                partialUrl + "/" + courseId[i].innerText + "/question/sub/new";
            const cid = /(\d+)/.exec(laterUrl)[1];
            if (cid === courseId[i].innerText) {
                coursesItemContainer[0].innerHTML =
                    coursesItemContainer[0].innerHTML +
                    "<div class='courses_items active'>" +
                    "<img alt='list_style_image' src='/static/images/list_style_image.svg' /> " +
                    "<a class='course_link'>" +
                    courseName[i].innerText +
                    "</a>" +
                    "</div>";
            } else {
                coursesItemContainer[0].innerHTML =
                    coursesItemContainer[0].innerHTML +
                    "<div class='courses_items'>" +
                    "<img alt='list_style_image' src='/static/images/list_style_image.svg' /> " +
                    "<a href='" +
                    completeUrl +
                    "' class='course_link'>" +
                    courseName[i].innerText +
                    "</a>" +
                    "</div>";
            }
        }
    }
})();
