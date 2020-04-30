(function () {
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
    } else {
      header.classList.add("py-3");
      header.classList.remove("py-2");
      header.style.background = null;
    }
  }

  window.onload = function () {
    document.getElementById("loader_container").style.display = "none";
    document.getElementById("header").style.zIndex = 1;

    const index1 = window.location.href.indexOf("/login");
    const index2 = window.location.href.indexOf("/register");
    if (index1 !== -1 || index2 !== -1) {
      var x = document.getElementById("content");
      x.style.visibility = "hidden";
      x.classList.add("hidden");
      x.style.height = "0px";
    }
  };
})();
