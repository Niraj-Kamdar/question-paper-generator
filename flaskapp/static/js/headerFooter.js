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

const sideNavigationItems = Array.from(document.getElementsByClassName("side_navigation_items"));



const topNavigationItems = document.getElementsByClassName(
  "top_navigation_items"
);

const logo = document.getElementsByClassName("logo");


const footerLinks = document.getElementsByClassName("fl");



const flash = document.getElementsByClassName("flashes_question")[0];




sideNavigationItems.forEach(function(node){
  node.addEventListener('click',function(e){
    if(e.target.href === window.location.href || e.target.href + "home" === window.location.href){
      e.preventDefault();
    }
  });
});

for (let i = 0; i < topNavigationItems.length; i++) {
  topNavigationItems[i].addEventListener("click", function (e) {
    if (
      e.target.parentNode.href === window.location.href ||
      e.target.parentNode.href + "home" === window.location.href ||
      e.target.parentNode.href + "/" === window.location.href
    ) {
      e.preventDefault();
    }
    if (e.target.parentNode.getAttribute("href") === "/logout") {
      window.history.pushState(null, null, "/");
    }
  });
}

for (let i = 0; i < logo.length; i++) {
  logo[i].addEventListener("click", function (e) {
    if (
      e.target.parentNode.href === window.location.href ||
      e.target.parentNode.href + "home" === window.location.href
    ) {
      e.preventDefault();
    }
  });
}

for (let i = 0; i < footerLinks.length; i++) {
  footerLinks[i].addEventListener("click", (e) => {
    if (
      e.target.href === window.location.href ||
      e.target.href + "home" === window.location.href
    ) {
      e.preventDefault();
    }
  });
}



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
  ) {
    return;
  }
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


