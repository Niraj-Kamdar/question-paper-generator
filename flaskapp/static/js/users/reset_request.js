(function () {
    const flashWarning = document.getElementsByClassName("flashes_warning");
    if (flashWarning.length) {
        setTimeout(() => {
            flashWarning[0].style.display = "none";
        }, 1000);
    }
})();
