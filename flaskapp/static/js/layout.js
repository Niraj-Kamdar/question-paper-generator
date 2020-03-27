window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    var header = document.getElementById("header");
    var ofset = 50;
    if (window.pageYOffset > ofset || document.body.scrollTop > ofset || document.documentElement.scrollTop > ofset) {
        header.classList.add("py-2");
        header.classList.remove("py-4");
        header.style.boxShadow = "0 0 50px 0px #888888";
        header.style.backgroundColor = "#e6e6e6";
    } else {
        header.classList.add("py-4");
        header.classList.remove("py-2");
        header.style.boxShadow = "0 0";
        header.style.backgroundColor = "#f2f2f2";
    }
}