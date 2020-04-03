window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    var header = document.getElementById("header");
    var ofset = 50;
    if (window.pageYOffset > ofset || document.body.scrollTop > ofset || document.documentElement.scrollTop > ofset) {
        header.classList.add("py-2");
        header.classList.remove("py-4");
        header.style.background = "#9000F0";
    } else {
        header.classList.add("py-4");
        header.classList.remove("py-2");
        header.style.background = null;
    }
}

window.onload = function () {
    var loginbtn = document.getElementById("show_login");
    loginbtn.addEventListener("click", () => {
        var x = document.getElementById('content');
        if (x.classList.contains("hidden")) {
            document.getElementsByClassName('overlape')[0].style.marginLeft = "0%";
            document.getElementsByClassName('img1')[0].style.marginLeft = "0%";
            document.getElementsByClassName('col2')[0].style.width = "85%";
            document.getElementById('footer').style.display = "block";
            document.getElementById('footercontent').style.marginLeft = "0%";
            x.classList.remove("hidden");
            disp(x);
        } else {
            x.classList.add("hidden");
            setTimeout(() => {
                document.getElementsByClassName('overlape')[0].style.marginLeft = "-30%";
                document.getElementsByClassName('img1')[0].style.marginLeft = "-30%";
                document.getElementsByClassName('col2')[0].style.width = "55%";
                document.getElementById('footer').style.display = "none";
                document.getElementById('footercontent').style.marginLeft = "30%";
                console.log("500 ms done");
            }, 500);
            setTimeout(() => {
                disp(x)
                console.log("1000 ms done");
            }, 1000);
            setTimeout(() => {
                window.location.href='/login';
                console.log("1500 ms done");
            }, 2000);
        }
    });
}

function disp(x) {
    if (x.style.height != "0px") {
        x.style.height = "0px";
    } else {
        x.style.height = "auto";
    }
}