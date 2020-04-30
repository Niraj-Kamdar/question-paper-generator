(function() {
const exploreItems = document.getElementsByClassName("explore_items");
const addItems = document.getElementsByClassName("add_items");
const sideUrl = window.location.href;
let option = "";
const index1 = sideUrl.indexOf("new");
const index2 = sideUrl.indexOf("sub");
let flag = false;
const addMCQ = document.getElementById("add_container")
                   .firstElementChild.nextElementSibling;
const addSubjectiveQuestion = addMCQ.nextElementSibling;
const viewMCQ = document.getElementById("explore_container")
                    .firstElementChild.nextElementSibling;
const viewSubjectiveQuestion = viewMCQ.nextElementSibling;
const nav_links = document.getElementsByClassName("nav_link");
const courseContainer = document.getElementById("course_container");
const rNavCourseName = []; // left side nav
const children = courseContainer.children;
const navCourseName =
    document.getElementsByClassName("course_link"); // right side links
function assignStaticLink(addMCQ, addSubjectiveQuestion, viewMCQ,
                          viewSubjectiveQuestion, url, flag) {
  const index = url.indexOf("question");
  const partialUrlQuestion = url.substr(0, index + 8 + 1);
  addMCQ.setAttribute("href", partialUrlQuestion + "mcq/new/");
  addSubjectiveQuestion.setAttribute("href", partialUrlQuestion + "sub/new/");
  viewMCQ.setAttribute("href", partialUrlQuestion + "mcq/");
  viewSubjectiveQuestion.setAttribute("href", partialUrlQuestion + "sub/");
  if (flag)
    return;
  [addMCQ, addSubjectiveQuestion, viewMCQ, viewSubjectiveQuestion].forEach(
      function(node) {
        node.addEventListener("click", (e) => {
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
            if (e.target.href === url)
              e.preventDefault();
          }
        });
      });
}

function assignDynamicLink(courseName, url, flag) {
  const courseIndex = url.indexOf("course");
  const laterUrl = url.substr(courseIndex);
  const cid = /(\d+)/.exec(laterUrl)[1];
  const subIndex = url.indexOf("sub");
  const newIndex = url.indexOf("new");

  for (let i = 0; i < courseName.length - 1; i++) {
    let completeUrl = "";
    const courseId = courseName[i].getAttribute("data-id");
    if (cid === courseId)
      courseName[i].classList.add("active");
    if (subIndex !== -1 && newIndex !== -1)
      completeUrl = "/course/" + courseId + "/question/sub/new/";
    else if (subIndex !== -1 && newIndex === -1)
      completeUrl = "/course/" + courseId + "/question/sub/";
    else if (subIndex === -1 && newIndex !== -1)
      completeUrl = "/course/" + courseId + "/question/mcq/new/";
    else
      completeUrl = "/course/" + courseId + "/question/mcq/";
    courseName[i].setAttribute("href", completeUrl);
    if (!flag) {
      courseName[i].addEventListener("click", (e) => {
        if (cid === courseId)
          e.preventDefault();
      });
    }
  }
}

if (index2 !== -1)
  option = "Subjective Question";
else
  option = "Multiple Choice Question";

for (let i = 0; i < addItems.length; i++) {
  if (addItems[i].innerText === option && index1 !== -1) {
    addItems[i].classList.add("active");
    flag = true;
  }
}
if (!flag) {
  for (let i = 0; i < exploreItems.length; i++) {
    if (exploreItems[i].innerText === option) {
      exploreItems[i].classList.add("active");
    }
  }
}

assignStaticLink(addMCQ, addSubjectiveQuestion, viewMCQ, viewSubjectiveQuestion,
                 window.location.href, true);

assignStaticLink(nav_links[2], nav_links[3], nav_links[0], nav_links[1],
                 window.location.href, false);

for (let i = 1; i < children.length; i++) {
  rNavCourseName.push(children[i]);
}
// console.log(courseName);
assignDynamicLink(rNavCourseName, window.location.href, true);

assignDynamicLink(navCourseName, window.location.href, false);
})();
