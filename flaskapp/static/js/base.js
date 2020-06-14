(function(){
    const dropdownContainer = document.getElementsByClassName("dropdown_container")[0];
    const dropdownTitle = dropdownContainer.firstElementChild;
    const rdropdownMoreTitle = document.getElementsByClassName("dropdown_container_2")[0].firstElementChild;
    const profilePage = document.getElementsByClassName("profile_page");
    let dropFlag = false;
    let startDropX = 0;
    let startDropY = 0;

    function handleQuestionNav(e) {
        let target = {};
        let classList = {};
        let children = {};
        if (Array.from(e.target.classList).includes("fa")) {
            target = e.target.parentNode;
        }else {
            target = e.target;
        }
        classList = target.lastElementChild.classList;
        children = target.parentNode.children;
        if (Array.from(target.lastElementChild.classList).includes("fa-caret-down")) {
            for (let i = 1; i < children.length; i++) {
                children[i].style.display = "block";
            }
            classList.remove("fa-caret-down");
            classList.add("fa-caret-up");
        } else {
            for (let i = 1; i < children.length; i++) {
                children[i].style.display = "none";
            }
            classList.remove("fa-caret-up");
            classList.add("fa-caret-down");
        }
    }
    dropdownContainer.addEventListener("mouseenter", function () {
        const classList = dropdownTitle.lastElementChild.classList;
        if (!Array.from(classList).includes("fa-caret-up")) {
            classList.remove("fa-caret-down");
            classList.add("fa-caret-up");
        }
    });

dropdownContainer.addEventListener("mouseleave", function (e) {
  const target = e.target;
  const classList = dropdownTitle.lastElementChild.classList;
  classList.remove("fa-caret-up");
  classList.add("fa-caret-down");
  target.lastElementChild.style.display = "";
});

dropdownTitle.addEventListener("touchstart", function (e) {
  let touchObj = {};
  touchObj = e.changedTouches[0];
  startDropX = touchObj.pageX;
  startDropY = touchObj.pageY;
});

dropdownTitle.addEventListener("touchmove", function (e) {
  let touchObj = {};
  touchObj = e.changedTouches[0];
  if (
    !(Math.abs(touchObj.pageX - startDropX) <= 10) ||
    !(Math.abs(touchObj.pageY - startDropY) <= 10)
  ) {
    dropFlag = true;
  }
});

dropdownTitle.addEventListener("touchend", function (e) {
  let touchObj = {};
  let target = {};
  let dropdownItemsContainer = {};
  let classList = {};
  let display = "";
  touchObj = e.changedTouches[0];
  e.preventDefault();
  try {
    target = touchObj.target;
    if (
      !(Math.abs(touchObj.pageX - startDropX) <= 10) ||
      !(Math.abs(touchObj.pageY - startDropY) <= 10)
    ) {
      return;
    }
  } catch (e) {
    target = dropdownTitle;
    if (dropFlag) return;
  } finally {
    dropdownItemsContainer = target.nextElementSibling;
    display = window
      .getComputedStyle(dropdownItemsContainer)
      .getPropertyValue("display");
    classList = target.lastElementChild.classList;
    if (display === "block") {
      dropdownItemsContainer.style.display = "none";
      classList.remove("fa-caret-up");
      classList.add("fa-caret-down");
    } else {
      dropdownItemsContainer.style.display = "block";
      classList.remove("fa-caret-down");
      classList.add("fa-caret-up");
    }
  }
});


    rdropdownMoreTitle.addEventListener("click", handleQuestionNav);

    for (let i = 0; i < profilePage.length; i++) {
  profilePage[i].addEventListener("touchstart", function (e) {
    if (window.location.href === e.target.parentNode.href) e.preventDefault();
    e.target.style.boxShadow = "none";
  });

  profilePage[i].addEventListener("touchend", function (e) {
    e.target.style.boxShadow = "0 0 10px 2px #ffffff";
  });

  profilePage[i].addEventListener("mouseenter", function (e) {
    e.target.firstElementChild.style.boxShadow = "";
  });

  profilePage[i].addEventListener("click", function (e) {
    if (window.location.href === e.target.parentNode.href) e.preventDefault();
  });
}
})();