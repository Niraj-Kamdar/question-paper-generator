window.onscroll = function () {
    scrollFunction();
};

document.getElementById("logo").addEventListener("click", () => {
    const url = window.location.href;
    let index = url.indexOf("/", 0);
    index = url.indexOf("/", index + 1);
    index = url.indexOf("/", index + 1);
    window.location.href = window.location.href.substr(0, index + 1);
});

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
        header.style.background = null;
    }
}

window.onload = function () {
    //   console.log(document.getElementById("loader_container").style.display);
    document.getElementById("loader_container").style.display = "none";
    document.getElementById("header").style.zIndex = 1;
    //   console.log("loaded");
    const index1 = window.location.href.indexOf("/login");
    const index2 = window.location.href.indexOf("/register");
    if (index1 !== -1 || index2 !== -1) {
        var x = document.getElementById("content");
        x.style.visibility = "hidden";
        x.classList.add("hidden");
        x.style.height = "0px";
    }

    var loginbtn = document.getElementById("show_login");
    loginbtn.addEventListener("click", () => {
        var x = document.getElementById("content");
        // window.location.href.startsWith("/login");
        const index1 = window.location.href.indexOf("/login");
        const index2 = window.location.href.indexOf("/register");
        if (index1 !== -1 || index2 !== -1) {
            x.style.visibility = "visible";
            document.getElementsByClassName("overlape")[0].style.marginLeft = "0%";
            document.getElementsByClassName("img1")[0].style.marginLeft = "0%";
            document.getElementsByClassName("col2")[0].style.width = "85%";
            document.getElementById("footer").style.display = "block";
            document.getElementById("footercontent").style.marginLeft = "0%";
            x.style.height = "auto";
            setTimeout(() => {
                x.classList.remove("hidden");
            }, 500);
            setTimeout(() => {
                const index1 = window.location.href.indexOf("/login");
                const index2 = window.location.href.indexOf("/register");
                const index3 = window.location.href.indexOf("localhost:");
                if (index3 !== -1 && (index1 !== -1 || index2 !== -1)) {
                    window.location.href = "http://localhost:5000/";
                } else if (index3 === -1 && (index1 !== -1 || index2 !== -1)) {
                    if (index1 !== -1)
                        window.location.href = window.location.href.substr(0, index1);
                    else window.location.href = window.location.href.substr(0, index2);
                }
            }, 1000);
        } else if (window.location.href.match(new RegExp("/", "g")).length === 3) {
            x.classList.add("hidden");
            setTimeout(() => {
                document.getElementsByClassName("overlape")[0].style.marginLeft =
                    "-30%";
                document.getElementsByClassName("img1")[0].style.marginLeft = "-30%";
                document.getElementsByClassName("col2")[0].style.width = "55%";
                document.getElementById("footer").style.display = "none";
                document.getElementById("footercontent").style.marginLeft = "30%";
            }, 500);
            setTimeout(() => {
                x.style.height = "0px";
            }, 1000);
            setTimeout(() => {
                if (window.location.href.match(new RegExp("/", "g")).length === 3) {
                    window.location.href += "login";
                }
            }, 1500);
        }
    });
};

(function () {
    const aboutLink = document.getElementById("about_page_link");
    const helpLink = document.getElementById("help_page_link");
    const policyLink = document.getElementById("policy_page_link");
    const servicesLink = document.getElementById("services_page_link");
    // const profileLink = document.getElementsByClassName("user")[0];
    let index = window.location.href.indexOf("/", 0);
    index = window.location.href.indexOf("/", index + 1);
    index = window.location.href.indexOf("/", index + 1);
    const rootUrl = window.location.href.substr(0, index + 1);

    let aboutUrl = rootUrl + "about-us";
    if (window.location.href !== aboutUrl) {
        aboutLink.setAttribute("href", aboutUrl);
    } else {
        aboutLink.removeAttribute("href");
    }

    let helpUrl = rootUrl + "help";
    if (window.location.href !== helpUrl) {
        helpLink.setAttribute("href", helpUrl);
    } else {
        helpLink.removeAttribute("href");
    }

    let policyUrl = rootUrl + "privacy-policy";
    if (window.location.href !== policyUrl) {
        policyLink.setAttribute("href", policyUrl);
    } else {
        policyLink.removeAttribute("href");
    }

    let servicesUrl = rootUrl + "terms-of-service";
    if (window.location.href !== servicesUrl) {
        servicesLink.setAttribute("href", servicesUrl);
    } else {
        servicesLink.removeAttribute("href");
    }
})();
