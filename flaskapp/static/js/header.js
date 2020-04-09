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
    header.classList.remove("py-4");
    header.style.background = "#9000F0";
  } else {
    header.classList.add("py-4");
    header.classList.remove("py-2");
    header.style.background = "";
  }
}
