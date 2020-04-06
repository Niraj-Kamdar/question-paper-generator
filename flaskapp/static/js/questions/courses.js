const flashes = document.getElementsByClassName("flashes");
if (flashes.length) {
    setTimeout(() => {
        flashes[0].style.display = "none";
    }, 1000);
}
// const addCourse = document.getElementById("add_course");

// addCourse.addEventListener("click", () => {
//   window.location.href = rootUrl + "course/new";
// });
