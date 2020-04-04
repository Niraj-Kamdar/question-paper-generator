const explore_items = document.getElementsByClassName("explore_items");
const mainContainer = document.getElementById("main_container");
mainContainer.style.paddingTop = "8%"; // for all pages except question list
document.body.style.overflowY = "auto"; //for all pages except question list
// for question pages
if (explore_items) {
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
    for (let i = 0; i < explore_items.length; i++) {
      if (explore_items[i].innerText === option) {
        explore_items[i].classList.add("active");
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
    if (flashes.length) mainContainer.style.paddingTop = "70px";
    else mainContainer.style.paddingTop = "100px";
  }
}
