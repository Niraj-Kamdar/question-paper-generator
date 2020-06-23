(function () {
  const deleteCourseBtn = document.getElementsByClassName("delete_course")[0];
  const deleteCourseBox = document.getElementsByClassName("delete_course_box");
  const deleteUnitBtn = document.getElementById("delete_unit");
  const deleteUnitBox = document.getElementsByClassName("delete_unit_box");
  const smallDeleteCourseBtn = document.getElementById("delete_course_small");
  const smallDeleteUnitBtn = document.getElementById("delete_unit_small");
  let courseId = document.getElementById("course_id");
  if (courseId) courseId = courseId.innerHTML;

  function deleteCoursesandUnits(deleteBtns, deleteBox, url) {
    let isVisible = false;
    deleteBtns.forEach(function (node) {
      node.addEventListener("click", function () {
        if (!isVisible) {
          isVisible = true;
          Array.from(deleteBox).forEach((node) => {
            node.style.display = "initial";
          });
        } else {
          isVisible = false;
          const selectedNodes = Array.from(deleteBox).filter(
            (node) => node.checked
          );
          const ids = selectedNodes
            .map((node) => {
              return node.parentNode.parentNode.lastElementChild.getAttribute(
                "data-id"
              );
            })
            .map((node) => Number(node));
          fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ids),
          })
            .then(function () {
              selectedNodes.forEach((node) => {
                const target = node.parentElement.parentElement;
                target.parentElement.removeChild(target);
              });
              Array.from(deleteBox).forEach((node) => {
                node.style.display = "";
              });
            })
            .catch(function (err) {
              document.getElementById(
                "page_display"
              ).firstElementChild.innerHTML = err;
            });
        }
      });
    });
  }
  deleteCourseBox &&
    deleteCourseBtn &&
    deleteCoursesandUnits(
      [smallDeleteCourseBtn, deleteCourseBtn],
      deleteCourseBox,
      "/course/delete/"
    );

  deleteUnitBox &&
    deleteUnitBtn &&
    deleteCoursesandUnits(
      [smallDeleteUnitBtn, deleteUnitBtn],
      deleteUnitBox,
      "/course/" + courseId + "/unit/delete/"
    );
})();
