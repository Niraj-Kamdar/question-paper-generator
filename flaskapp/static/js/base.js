const exploreItems = document.getElementsByClassName("explore_items");
const mainContainer = document.getElementById("main_container");
mainContainer.style.paddingTop = "100px"; // for all pages except question list
document.body.style.overflowY = "auto"; //for all pages except question list

const homeLink = document.getElementById("home_link");
const courseLink = document.getElementById("course_link");
const profileLink = document.getElementsByClassName("user")[0];
let rootUrl = "";
profileLink.addEventListener("click", () => {
  if (rootUrl + "account" !== window.location.href)
    window.location.href = rootUrl + "account";
});
const length = window.location.href.match(new RegExp("/", "g"));

if (length !== 3) {
  let index = window.location.href.indexOf("/", 0);
  index = window.location.href.indexOf("/", index + 1);
  index = window.location.href.indexOf("/", index + 1);
  rootUrl = window.location.href.substr(0, index + 1);
  homeLink.setAttribute("href", rootUrl + "home");
}

let courseUrl = rootUrl + "course/";
if (window.location.href !== courseUrl) {
  courseLink.setAttribute("href", courseUrl);
} else {
  courseLink.removeAttribute("href");
}

// for question pages
if (exploreItems.length) {
  const add_items = document.getElementsByClassName("add_items");
  const nav_links = document.getElementsByClassName("nav_link");
  const url = window.location.href;
  let option = "";
  const index1 = url.indexOf("new");
  const index2 = url.indexOf("sub");
  if (index2 !== -1) option = "Subjective Question";
  else option = "Multiple Choice Question";
  let flag = false;
  // assigning active class
  for (let i = 0; i < add_items.length; i++) {
    if (add_items[i].innerText === option && index1 !== -1) {
      add_items[i].classList.add("active");
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

  // assigning links to side nav
  const index = url.indexOf("question");
  const partialUrl = url.substr(0, index + 8 + 1);
  if (partialUrl + "mcq/" !== url) nav_links[0].href = partialUrl + "mcq/";
  else nav_links[0].removeAttribute("href");
  if (partialUrl + "sub/" !== url) nav_links[1].href = partialUrl + "sub/";
  else nav_links[1].removeAttribute("href");
  if (partialUrl + "mcq/new/" !== url)
    nav_links[2].href = partialUrl + "mcq/new/";
  else nav_links[2].removeAttribute("href");
  if (partialUrl + "sub/new/" !== url)
    nav_links[3].href = partialUrl + "sub/new/";
  else nav_links[3].removeAttribute("href");

  // for question list page
  if (index1 === -1) {
    document.body.style.overflowY = "hidden";
    const flashes = document.getElementsByClassName("flashes");
    if (flashes.length) {
      // console.log("yup");
      setTimeout(() => {
        flashes[0].style.display = "none";
      }, 1000);
    }
    mainContainer.style.paddingTop = "100px";
  }
}
