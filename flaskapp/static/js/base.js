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

    //close side nav
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

      // mainContainer.style.paddingTop = "100px"; // for all pages except question list

      mainContainer.addEventListener("touchstart", function (e) {
        let touchObj = {};
        if (window.innerWidth > 868) return; //do not process if screen width is greater than 768
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
        if (window.innerWidth > 868) return;
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
          window.innerWidth > 868
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
    const sideNavigationItems = document.getElementsByClassName(
      "side_navigation_items"
    );
    //disable links if href and window location is same for side navigation links
    for (let i = 0; i < sideNavigationItems.length; i++) {
      sideNavigationItems[i].addEventListener("click", (e) => {
        if (
          e.target.href === window.location.href ||
          e.target.href + "/" === window.location.href //for course/
        )
          e.preventDefault();
      });
    }
  }
  {
    const topNavigationItems = document.getElementsByClassName(
      "top_navigation_items"
    );

    //disable links if href and window location is same for top navigation links
    for (let i = 0; i < topNavigationItems.length; i++) {
      topNavigationItems[i].addEventListener("click", function (e) {
        if (
          e.target.parentNode.href === window.location.href ||
          e.target.parentNode.href + "/" === window.location.href //for course/
        )
          e.preventDefault();
      });
    }
  }
  {
    const profilePage = document.getElementsByClassName("profile_page");

    for (let i = 0; i < profilePage.length; i++) {
      profilePage[i].addEventListener("click", function (e) {
        if (window.location.href === e.target.parentNode.href)
          e.preventDefault();
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
  {
    const dropdownContainer = document.getElementsByClassName(
      "dropdown_container"
    )[0];
    const dropdownTitle = dropdownContainer.firstElementChild;

    dropdownContainer.lastElementChild.style.display = "none";

    dropdownContainer.addEventListener("mouseenter", function (e) {
      const target = e.target;
      const classList = dropdownTitle.lastElementChild.classList;
      classList.remove("fa-caret-down");
      classList.add("fa-caret-up");
      target.lastElementChild.style.display = "";
    });

    dropdownContainer.addEventListener("mouseleave", function (e) {
      const target = e.target;
      const classList = dropdownTitle.lastElementChild.classList;
      classList.remove("fa-caret-up");
      classList.add("fa-caret-down");
      target.lastElementChild.style.display = "";
    });

    dropdownTitle.addEventListener("click", function (e) {
      let target = {};
      let dropdownItemsContainer = {};
      let classList = {};
      let display = "";
      if (Array.from(e.target.classList).includes("fa"))
        target = e.target.parentNode;
      else target = e.target;
      dropdownItemsContainer = target.nextElementSibling;
      display = window.getComputedStyle(dropdownItemsContainer).display;
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
    });
  }

  {
    const dropdownTitle = document.getElementsByClassName(
      "dropdown_container_2"
    )[0].firstElementChild;

    dropdownTitle.addEventListener("click", function (e) {
      let target = {};
      let dropdownItemsContainer = {};
      let classList = {};
      if (Array.from(e.target.classList).includes("fa"))
        target = e.target.parentNode;
      else target = e.target;
      dropdownItemsContainer = target.nextElementSibling;
      classList = target.lastElementChild.classList;
      if (dropdownItemsContainer.style.display !== "block") {
        dropdownItemsContainer.style.display = "block";
        classList.remove("fa-caret-down");
        classList.add("fa-caret-up");
      } else {
        dropdownItemsContainer.style.display = "none";
        classList.remove("fa-caret-up");
        classList.add("fa-caret-down");
      }
    });
  }

  document.body.style.overflowY = "auto"; //for all pages except question list
})();
