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

    if(window.location.href.startsWith("http://localhost:5000/login") || window.location.href.startsWith("http://localhost:5000/register")){
        var x = document.getElementById('content');
        x.style.visibility = 'hidden';
        x.classList.add("hidden");
        x.style.height = "0px";
    }

    var loginbtn = document.getElementById("show_login");
    loginbtn.addEventListener("click", () => {
        var x = document.getElementById('content');
        window.location.href.startsWith("http://localhost:5000/login")
        if(window.location.href.startsWith("http://localhost:5000/login") || window.location.href.startsWith("http://localhost:5000/register")){
            x.style.visibility = 'visible';
            document.getElementsByClassName('overlape')[0].style.marginLeft = "0%";
            document.getElementsByClassName('img1')[0].style.marginLeft = "0%";
            document.getElementsByClassName('col2')[0].style.width = "85%";
            document.getElementById('footer').style.display = "block";
            document.getElementById('footercontent').style.marginLeft = "0%";
            x.style.height = "auto";
            setTimeout(() => {
                x.classList.remove("hidden");
            }, 500);
            setTimeout(() => {
                window.location.href = 'http://localhost:5000/';
            }, 1000);
        }
        else if(window.location.href.startsWith("http://localhost:5000/")){
            x.classList.add("hidden");
            setTimeout(() => {
                document.getElementsByClassName('overlape')[0].style.marginLeft = "-30%";
                document.getElementsByClassName('img1')[0].style.marginLeft = "-30%";
                document.getElementsByClassName('col2')[0].style.width = "55%";
                document.getElementById('footer').style.display = "none";
                document.getElementById('footercontent').style.marginLeft = "30%";
            }, 500);
            setTimeout(() => {
                x.style.height = "0px";
            }, 1000);
            setTimeout(() => {
                window.location.href = 'http://localhost:5000/login';
            }, 1500);
        }
    });
}