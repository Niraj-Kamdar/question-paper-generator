window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var header = document.getElementById("header");
  var ofset = 50;
  if (
    window.pageYOffset > ofset ||
    document.body.scrollTop > ofset ||
    document.documentElement.scrollTop > ofset
  ) {
    header.classList.add("py-2");
    header.classList.remove("py-3");
    // header.style.background = "#9000F0";
  } else {
    header.classList.add("py-3");
    header.classList.remove("py-2");
    header.style.background = null;
  }
}

window.onload = function () {
  //   console.log(document.getElementById("loader_container").style.display);
  document.getElementById("loader_container").style.display = "none";
  document.getElementById("header").style.zIndex = 1;
  //   console.log("loaded");
  const index1 = window.location.href.indexOf("/login");
  const index2 = window.location.href.indexOf("/register");
  if (index1 !== -1 || index2 !== -1) {
    var x = document.getElementById("content");
    x.style.visibility = "hidden";
    x.classList.add("hidden");
    x.style.height = "0px";
  }

  //   var loginbtn = document.getElementById("show_login");
  //   loginbtn.addEventListener("click", () => {
  //     var x = document.getElementById("content");
  //     // window.location.href.startsWith("/login");
  //     const index1 = window.location.href.indexOf("/login");
  //     const index2 = window.location.href.indexOf("/register");
  //     if (index1 !== -1 || index2 !== -1) {
  //       x.style.visibility = "visible";
  //       document.getElementsByClassName("overlape")[0].style.marginLeft = "0%";
  //       document.getElementsByClassName("img1")[0].style.marginLeft = "0%";
  //       document.getElementsByClassName("col2")[0].style.width = "85%";
  //       document.getElementById("footer").style.display = "block";
  //       document.getElementById("footercontent").style.marginLeft = "0%";
  //       x.style.height = "auto";
  //       setTimeout(() => {
  //         x.classList.remove("hidden");
  //       }, 500);
  //       setTimeout(() => {
  //         const index1 = window.location.href.indexOf("/login");
  //         const index2 = window.location.href.indexOf("/register");
  //         const index3 = window.location.href.indexOf("localhost:");
  //         if (index3 !== -1 && (index1 !== -1 || index2 !== -1)) {
  //           window.location.href = "http://localhost:5000/";
  //         } else if (index3 === -1 && (index1 !== -1 || index2 !== -1)) {
  //           if (index1 !== -1)
  //             window.location.href = window.location.href.substr(0, index1);
  //           else window.location.href = window.location.href.substr(0, index2);
  //         }
  //       }, 1000);
  //     } else if (window.location.href.match(new RegExp("/", "g")).length === 3) {
  //       x.classList.add("hidden");
  //       setTimeout(() => {
  //         document.getElementsByClassName("overlape")[0].style.marginLeft =
  //           "-30%";
  //         document.getElementsByClassName("img1")[0].style.marginLeft = "-30%";
  //         document.getElementsByClassName("col2")[0].style.width = "55%";
  //         document.getElementById("footer").style.display = "none";
  //         document.getElementById("footercontent").style.marginLeft = "30%";
  //       }, 500);
  //       setTimeout(() => {
  //         x.style.height = "0px";
  //       }, 1000);
  //       setTimeout(() => {
  //         if (window.location.href.match(new RegExp("/", "g")).length === 3) {
  //           window.location.href += "login";
  //         }
  //       }, 1500);
  //     }
  //   });
};

(function () {
  {
    const sideNavigationContainer = document.getElementById(
      "side_navigation_container"
    ); //side nav

    // open side nav on click on bar button
    document
      .getElementById("bars_container")
      .addEventListener("click", function () {
        sideNavigationContainer.style.left = "0px";
        document.body.style.overflowY = "hidden";
      });

    //hide side nav on resizing
    window.addEventListener("resize", function () {
      if (window.innerWidth > 868) sideNavigationContainer.style.left = "";
      document.body.style.overflowY = "";
    });

    document
      .getElementById("close_link")
      .addEventListener("click", function (e) {
        e.preventDefault(); // prevent link from clicking
        sideNavigationContainer.style.left = "";
        document.body.style.overflowY = "";
      });

    {
      let sideTouchStartX = 0; // x coordinate of first touch of side nav
      let sideTouchStartY = 0; // y coordinate of first touch of side nav
      let preSidePageX = 0; // previous x coordinate for side nav

      let sideI = 0;

      let sideFlag = false;
      //listen for touch-start on side nav for closing

      sideNavigationContainer.addEventListener("touchstart", function (e) {
        let touchObj = {};
        touchObj = e.changedTouches[0]; // html element which has been touched
        sideTouchStartX = preSidePageX = touchObj.pageX; // x coordinate of touch
        sideTouchStartY = touchObj.pageY;
        // reset for every touch start event
        sideFlag = false;
        sideI = 0;
        // }
      });

      sideNavigationContainer.addEventListener("touchmove", function (e) {
        let touchObj = {};
        let distance = 0;
        let left = 0;
        if (sideFlag) return;
        touchObj = e.changedTouches[0];
        distance = touchObj.pageX - preSidePageX;
        if (sideI === 0) {
          let yDiff = 0;
          sideI++;
          yDiff = Math.abs(touchObj.pageY - sideTouchStartY);
          if (yDiff > Math.abs(distance)) {
            sideFlag = true; //mark flag if user has done swipe with angle > 45
            return;
          }
        }

        preSidePageX = touchObj.pageX;
        left = parseInt(sideNavigationContainer.style.left);
        if (left + distance <= 0) {
          sideNavigationContainer.style.left = `${left + distance}px`;
        } else sideNavigationContainer.style.left = "0px";
        e.preventDefault(); // to avoid scroll
        // }
      });

      sideNavigationContainer.addEventListener("touchend", function (e) {
        let touchObj = {};
        let distance = 0;

        if (sideFlag) return;
        touchObj = e.changedTouches[0];
        distance = touchObj.pageX - sideTouchStartX;

        if (-distance >= 40) {
          sideNavigationContainer.style.left = "";
          document.body.style.overflowY = "";
        } else {
          sideNavigationContainer.style.left = "0px";
          document.body.style.overflowY = "hidden";
        }
      });
    }
    {
      const mainContainer = document.getElementById("main_container"); //main page

      const initialLeft = parseInt(
        window.getComputedStyle(sideNavigationContainer).left
      ); //initial left style of side nav

      let mainTouchStartX = 0; // x coordinate of first touch of main page
      let mainTouchStartY = 0; // y coordinate of first touch of main page
      let preMainPageX = 0; // previous x coordinate for main page
      let mainI = 0;
      let mainFlag = false;

      mainContainer.addEventListener("touchstart", function (e) {
        let touchObj = {};
        if (window.innerWidth > 768) return; //do not process if screen width is greater than 768
        touchObj = e.changedTouches[0];
        e.preventDefault(); // to avoid click
        mainTouchStartX = touchObj.pageX;
        mainTouchStartY = touchObj.pageY;
        preMainPageX = touchObj.pageX;
        mainFlag = false;
        mainI = 0;
      });

      mainContainer.addEventListener("touchmove", function (e) {
        let touchObj = {};
        let distance = 0;
        let left = 0;
        if (mainFlag) return;
        if (window.innerWidth > 768) return;
        touchObj = e.changedTouches[0];
        distance = touchObj.pageX - preMainPageX;
        if (mainI === 0) {
          let yDiff = 0;
          mainI++;
          yDiff = Math.abs(touchObj.pageY - mainTouchStartY);
          if (yDiff > Math.abs(distance)) {
            //mark flag if user has done swipe with angle > 45
            mainFlag = true;
            return;
          }
        }
        if (mainTouchStartX > 100) return; // if user touched from screen at distance greater than 100px then do not process it
        e.preventDefault(); //avoid scroll
        preMainPageX = touchObj.pageX;
        left = parseInt(sideNavigationContainer.style.left || initialLeft);
        if (left + distance <= 0)
          sideNavigationContainer.style.left = `${left + distance}px`;
        else sideNavigationContainer.style.left = "0px";
      });

      mainContainer.addEventListener("touchend", function (e) {
        let touchObj = {};
        let distance = 0;
        e.preventDefault();
        if (
          mainTouchStartX > 100 ||
          sideNavigationContainer.style.left >= "0px" || //if already side nav is present at correct position
          mainFlag ||
          window.innerWidth > 768
        )
          return;

        // if (initialLeft > parseInt(sideNavigationContainer.style.left)) {
        //   sideNavigationContainer.style.left = `${initialLeft}px`;
        //   return;
        // }

        touchObj = e.changedTouches[0];
        distance = touchObj.pageX - mainTouchStartX;
        if (distance >= 40) {
          sideNavigationContainer.style.left = "0px";
          document.body.style.overflowY = "hidden";
        } else {
          sideNavigationContainer.style.left = "";
          document.body.style.overflowY = "";
        }
      });
    }
  }
  {
    const logo = document.getElementsByClassName("logo");

    for (let i = 0; i < logo.length; i++) {
      logo[i].addEventListener("click", function (e) {
        if (e.target.parentNode.href === window.location.href)
          e.preventDefault();
      });
    }
  }

  // const profileLink = document.getElementsByClassName("user")[0];
})();
