const editBtns = Array.from(document.getElementsByClassName("edit"));
const cancelBtns = Array.from(document.getElementsByClassName("cancel"));
const saveBtns = Array.from(document.getElementsByClassName("save"));
let buffer = new Array(editBtns.length);
for (let i = 0; i < buffer.length; i++) {
  buffer[i] = [];
}
editBtns.forEach(node => {
  const id = node.classList[1];
  const contentArray = Array.from(
    document.getElementsByClassName("content_" + id)
  );
  const newContentArray = Array.from(
    document.getElementsByClassName("newContent_" + id)
  );
  const len = contentArray.length;
  node.addEventListener("click", e => {
    for (let i = 0; i < len; i++) {
      contentArray[i].style.display = "none";
      newContentArray[i].style.display = "inline-block";
      newContentArray[i].value = contentArray[i].innerHTML.trim();
      buffer[editBtns.indexOf(node)].push(contentArray[i].innerHTML.trim());
    }
  });
});
cancelBtns.forEach(node => {
  const id = node.classList[1];
  const contentArray = Array.from(
    document.getElementsByClassName("content_" + id)
  );
  const newContentArray = Array.from(
    document.getElementsByClassName("newContent_" + id)
  );
  const len = contentArray.length;
  node.addEventListener("click", e => {
    for (let i = 0; i < len; i++) {
      contentArray[i].style.display = "inline-block";
      newContentArray[i].style.display = "none";
      contentArray[i].innerHTML = buffer[cancelBtns.indexOf(node)][i];
    }
  });
});
