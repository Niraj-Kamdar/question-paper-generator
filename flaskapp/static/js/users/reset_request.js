(function () {
  {
    const flash = document.getElementsByClassName("flashes_warning")[0];
    if (flash) {
      document.body.style.overflowY = "hidden";
      document.getElementById("opacity_container").style.display = "block";
      setTimeout(() => {
        flash.style.display = "none";
        document.body.style.overflowY = "";
        document.getElementById("opacity_container").style.display = "";
      }, 1000);
    }
  }
})();
