(function () {
    document.getElementById("logo").addEventListener("click", () => {
        const url = window.location.href;
        let index = url.indexOf("/", 0);
        index = url.indexOf("/", index + 1);
        index = url.indexOf("/", index + 1);
        window.location.href = window.location.href.substr(0, index + 1);
    });
})();
