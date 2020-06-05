const sideNavigationContainer = document.getElementById(
  "side_navigation_container"
);
let sideTouchStartX = 0;
let sideTouchStartY = 0;
let preSidePageX = 0;
let sideI = 0;
let sideFlag = false;
let sNetDistance = 0;
const mainContainer = document.getElementById("main_container");

const initialLeft = parseInt(
  window.getComputedStyle(sideNavigationContainer).left
);

let mainTouchStartX = 0;
let mainTouchStartY = 0;
let preMainPageX = 0;
let mainI = 0;
let mainFlag = false;
let mNetDistance = 0;
let isHomePage = false;
let areAdditionalPages = false;
let isLogin = false;
let isQuestionPage = false;
let isCoursesPage = false;
const additionalPages = [
  "about-us",
  "help",
  "privacy-policy",
  "terms-of-service",
  "contact-us",
];
const url = window.location.href;
const sideNavigationItems = document.getElementsByClassName(
  "side_navigation_items"
);
const exploreContainer = document.getElementById("explore_container");
const addContainer = document.getElementById("add_container");
const courseContainer = document.getElementById("course_container");
const childrenLength = courseContainer.children.length;
const moreItemsContainer = sideNavigationItems[childrenLength + 13].parentNode;
const addMCQ = sideNavigationItems[childrenLength + 4];
const addQuestion = sideNavigationItems[childrenLength + 5];
const viewMCQ = sideNavigationItems[childrenLength + 1];
const viewQuestion = sideNavigationItems[childrenLength + 2];
const addCourse = sideNavigationItems[childrenLength + 6];
const removeCourse = sideNavigationItems[childrenLength + 7];
const course = sideNavigationItems[childrenLength + 9];
const aboutUs = sideNavigationItems[childrenLength + 10];
const help = sideNavigationItems[childrenLength + 11];
const contactUs = sideNavigationItems[childrenLength + 12];

const logIn = sideNavigationItems[childrenLength + 17];
const logOut = sideNavigationItems[childrenLength + 18];
const profilePage = document.getElementsByClassName("profile_page");
const topNavigationItems = document.getElementsByClassName(
  "top_navigation_items"
);
const isLoggedIn =
  document.getElementById("logged_in").innerText === "True" ? true : false;
const logo = document.getElementsByClassName("logo");
let startDropX = 0;
let startDropY = 0;
let dropFlag = false;
const dropdownContainer = document.getElementsByClassName(
  "dropdown_container"
)[0];
const dropdownTitle = dropdownContainer.firstElementChild;
const footerLinks = document.getElementsByClassName("fl");
const rDropdownexploreTitle = document.getElementById("explore_container")
  .firstElementChild;
const rDropdownAddTitle = document.getElementById("add_container")
  .firstElementChild;
const rdropdownMoreTitle = document.getElementsByClassName(
  "dropdown_container_2"
)[0].firstElementChild;
const rDropdownCourseTitle = document.getElementById("course_container")
  .firstElementChild;
const flash = document.getElementsByClassName("flashes_question")[0];

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

isHomePage = !!(
  url.match(new RegExp("/", "g")).length === 3 && url[url.length - 1] === "/"
);

isLogin =
  url.indexOf("login") !== -1 || url.indexOf("register") !== -1 ? true : false;

isQuestionPage = url.indexOf("question") !== -1 ? true : false;
isCoursesPage = url.match(/.+course\/$/) ? true : false;

for (let page of additionalPages) {
  const index = url.indexOf(page);
  if (index !== -1) {
    areAdditionalPages = true;
    break;
  }
}

if (isHomePage || (areAdditionalPages && !isLoggedIn) || isLogin) {
  exploreContainer.style.display = "none";
  addContainer.style.display = "none";
  courseContainer.style.display = "none";
  moreItemsContainer.style.display = "none";
  course.style.display = logOut.style.display = "none";
  addCourse.style.display = "none";
  removeCourse.style.display = "none";
  if (isLogin) {
    logIn.style.display = "none";
  }
} else {
  if (isQuestionPage) {
    addMCQ.style.display = addQuestion.style.display = "none";
    viewMCQ.style.display = viewQuestion.style.display = "none";
    course.style.display = "none";
    for (let i = 1; i < childrenLength; i++) {
      sideNavigationItems[i].style.display = "none";
    }
  }
  if (isCoursesPage) {
    course.style.display = "none";
    addCourse.style.display = "block";
  }
  aboutUs.style.display = help.style.display = contactUs.style.display = logIn.style.display =
    "none";
  for (let i = 1; i < moreItemsContainer.children.length; i++) {
    moreItemsContainer.children[i].style.display = "none";
  }
  if (addCourse.style.display) {
    addCourse.style.display = "";
    removeCourse.style.display = "";
  } else {
    addCourse.style.display = "none";
    removeCourse.style.display = "none";
  }
  if (addMCQ.style.display !== "none") {
    exploreContainer.style.display = "none";
    addContainer.style.display = "none";
    courseContainer.style.display = "none";
  }
}

for (let i = 0; i < sideNavigationItems.length; i++) {
  sideNavigationItems[i].addEventListener("click", (e) => {
    let url2 = url;
    let mcqIndex = -1;
    let subIndex = -1;
    let newIndex = -1;
    mcqIndex = url2.indexOf("/mcq");
    subIndex = url2.indexOf("/sub");
    newIndex = url2.indexOf("new");
    if (mcqIndex !== -1 && newIndex === -1) {
      url2 = url2.substr(0, mcqIndex + 4 + 1);
      if (url2 === e.target.href) {
        e.preventDefault();
      }
    } else if (subIndex !== -1 && newIndex === -1) {
      url2 = url2.substr(0, subIndex + 4 + 1);
      if (url2 === e.target.href) {
        e.preventDefault();
      }
    } else {
      if (
        e.target.href === window.location.href ||
        e.target.href + "home" === window.location.href ||
        e.target.href + "/" === window.location.href
      )
        e.preventDefault();
      if (e.target.getAttribute("href") === "/logout")
        window.history.pushState(null, null, "/");
    }
  });
}

for (let i = 0; i < profilePage.length; i++) {
  if (isHomePage || areAdditionalPages || isLogin)
    profilePage[i].parentNode.style.display = "none";

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

if (isHomePage || (areAdditionalPages && !isLoggedIn)) {
  topNavigationItems[5].parentNode.parentNode.style.display = "none";
  topNavigationItems[1].style.display = topNavigationItems[9].style.display =
    "none";
} else if (isLogin) {
  topNavigationItems[5].parentNode.parentNode.style.display = "none";
  topNavigationItems[1].style.display = topNavigationItems[9].style.display = topNavigationItems[8].style.display =
    "none";
} else {
  topNavigationItems[2].style.display = topNavigationItems[3].style.display = topNavigationItems[8].style.display = topNavigationItems[4].style.display =
    "none";
}
for (let i = 0; i < topNavigationItems.length; i++) {
  topNavigationItems[i].addEventListener("click", function (e) {
    if (
      e.target.parentNode.href === window.location.href ||
      e.target.parentNode.href + "home" === window.location.href ||
      e.target.parentNode.href + "/" === window.location.href
    )
      e.preventDefault();
    if (e.target.parentNode.getAttribute("href") === "/logout")
      window.history.pushState(null, null, "/");
  });
}

for (let i = 0; i < logo.length; i++) {
  logo[i].addEventListener("click", function (e) {
    if (
      e.target.parentNode.href === window.location.href ||
      e.target.parentNode.href + "home" === window.location.href
    )
      e.preventDefault();
  });
}

for (let i = 0; i < footerLinks.length; i++) {
  footerLinks[i].addEventListener("click", (e) => {
    if (
      e.target.href === window.location.href ||
      e.target.href + "home" === window.location.href
    )
      e.preventDefault();
  });
}

rDropdownexploreTitle.addEventListener("click", handleQuestionNav);

rDropdownAddTitle.addEventListener("click", handleQuestionNav);

rdropdownMoreTitle.addEventListener("click", handleQuestionNav);

rDropdownCourseTitle.addEventListener("click", handleQuestionNav);

if (flash) {
  document.body.style.overflowY = "hidden";
  document.getElementById("opacity_container").style.display = "block";
  setTimeout(() => {
    flash.style.display = "none";
    document.body.style.overflowY = "";
    document.getElementById("opacity_container").style.display = "";
  }, 1000);
}

document
  .getElementById("bars_container")
  .addEventListener("click", function () {
    sideNavigationContainer.style.left = "0px";
    document.body.style.overflowY = "hidden";
  });

window.addEventListener("resize", function () {
  if (window.innerWidth > 960) sideNavigationContainer.style.left = "";
  document.body.style.overflowY = "";
});

document.getElementById("close_link").addEventListener("click", function (e) {
  e.preventDefault();
  sideNavigationContainer.style.left = "";
  document.body.style.overflowY = "";
});

sideNavigationContainer.addEventListener("touchstart", function (e) {
  let touchObj = {};
  touchObj = e.changedTouches[0];
  sideTouchStartX = preSidePageX = touchObj.pageX;
  sideTouchStartY = touchObj.pageY;

  sideFlag = false;
  sideI = 0;
  sNetDistance = 0;
});

sideNavigationContainer.addEventListener("touchmove", function (e) {
  let touchObj = {};
  let distance = 0;
  let left = 0;
  if (sideFlag) return;
  touchObj = e.changedTouches[0];
  distance = touchObj.pageX - preSidePageX;
  sNetDistance += distance;
  if (sideI === 0) {
    let yDiff = 0;
    sideI++;
    yDiff = Math.abs(touchObj.pageY - sideTouchStartY);
    if (yDiff > Math.abs(distance)) {
      sideFlag = true;
      return;
    }
  }

  preSidePageX = touchObj.pageX;
  left = parseInt(sideNavigationContainer.style.left);
  if (left + distance <= 0) {
    sideNavigationContainer.style.left = `${left + distance}px`;
  } else {sideNavigationContainer.style.left = "0px";}
  e.preventDefault();
});

sideNavigationContainer.addEventListener("touchend", function (e) {
  let touchObj = {};
  let distance = 0;

  if (sideFlag) return;
  try {
    touchObj = e.changedTouches[0];
    distance = touchObj.pageX - sideTouchStartX;
  } catch (e) {
    distance = sNetDistance;
  } finally {
    if (-distance >= 40) {
      sideNavigationContainer.style.left = "";
      document.body.style.overflowY = "";
    } else {
      sideNavigationContainer.style.left = "0px";
      document.body.style.overflowY = "hidden";
    }
  }
});

mainContainer.addEventListener("touchstart", function (e) {
  let touchObj = {};
  if (window.innerWidth > 960) return;
  touchObj = e.changedTouches[0];
  mainTouchStartX = touchObj.pageX;
  mainTouchStartY = touchObj.pageY;
  preMainPageX = touchObj.pageX;
  mainFlag = false;
  mainI = 0;
  mNetDistance = 0;
});

mainContainer.addEventListener("touchmove", function (e) {
  let touchObj = {};
  let distance = 0;
  let left = 0;
  if (mainFlag) return;
  if (window.innerWidth > 960) return;
  touchObj = e.changedTouches[0];
  distance = touchObj.pageX - preMainPageX;
  mNetDistance = mNetDistance + distance;
  if (mainI === 0) {
    let yDiff = 0;
    mainI++;
    yDiff = Math.abs(touchObj.pageY - mainTouchStartY);
    if (yDiff > Math.abs(distance)) {
      mainFlag = true;
      return;
    }
  }
  if (mainTouchStartX > 100) return;
  e.preventDefault();
  preMainPageX = touchObj.pageX;
  left = parseInt(sideNavigationContainer.style.left || initialLeft);
  if (left + distance <= 0){
    sideNavigationContainer.style.left = `${left + distance}px`;
  } else {
    sideNavigationContainer.style.left = "0px";
  }
});

mainContainer.addEventListener("touchend", function (e) {
  let touchObj = {};
  let distance = 0;
  if (
    mainTouchStartX > 100 ||
    sideNavigationContainer.style.left >= "0px" ||
    mainFlag ||
    window.innerWidth > 960
  )
    return;
  try {
    touchObj = e.changedTouches[0];

    distance = touchObj.pageX - mainTouchStartX;
  } catch (e) {
    distance = mNetDistance;
  } finally {
    if (distance >= 40) {
      sideNavigationContainer.style.left = "0px";
      document.body.style.overflowY = "hidden";
    } else {
      sideNavigationContainer.style.left = "";
      document.body.style.overflowY = "";
    }
  }
});

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
  )
    dropFlag = true;
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
    )
      return;
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
