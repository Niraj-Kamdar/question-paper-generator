(function () {
  const addMCQ = document.getElementById("add_container").firstElementChild
    .nextElementSibling;
  const addSubjectiveQuestion = addMCQ.nextElementSibling;
  const viewMCQ = document.getElementById("explore_container").firstElementChild
    .nextElementSibling;
  const viewSubjectiveQuestion = viewMCQ.nextElementSibling;
  const navLinks = Array.from(document.getElementsByClassName("nav_link"));

  addMCQ.setAttribute("href",navLinks[2].getAttribute("href"));
  addSubjectiveQuestion.setAttribute("href",navLinks[3].getAttribute("href"));
  viewMCQ.setAttribute("href",navLinks[0].getAttribute("href"));
  viewSubjectiveQuestion.setAttribute("href",navLinks[1].getAttribute("href"));

  navLinks.forEach(function(node){
    if(node.href === window.location.href){
      node.parentElement.classList.add("active");
    }
    node.addEventListener('click',function(e){
      if(e.target.href===window.location.href){
        e.preventDefault();
      }
    })
  });
})();
