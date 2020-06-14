(function () {
  const exploreContainer = document.getElementById("explore_container");
  const addContainer = document.getElementById("add_container");
  const courseContainer = document.getElementById("course_container");
  const rDropdownexploreTitle = exploreContainer.firstElementChild;
  const rDropdownAddTitle = addContainer.firstElementChild;
  const rDropdownCourseTitle = courseContainer.firstElementChild;
  const navLinks = Array.from(document.getElementsByClassName("nav_link"));

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

  navLinks.forEach(function(node){
    if(node.href === window.location.href){
      node.parentElement.classList.add("active");
    }
    node.addEventListener('click',function(e){
      if(e.target.href===window.location.href){
        e.preventDefault();
      }
    });
  });

  rDropdownexploreTitle.addEventListener("click", handleQuestionNav);
  rDropdownAddTitle.addEventListener("click", handleQuestionNav);
  rDropdownCourseTitle.addEventListener("click", handleQuestionNav);
})();
