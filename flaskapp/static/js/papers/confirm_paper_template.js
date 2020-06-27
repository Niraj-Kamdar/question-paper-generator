(function() {
const totalQuestions = (Questions) =>
    Questions.map((obj) => Object.keys(obj))
        .map((subQuestion, index) => subQuestion.map(
                 (key) => "Q" + (index + 1) + key.toUpperCase()))
        .flatMap((subQuestions) => subQuestions);
const cognitiveLevels = (Questions) =>
    Questions
        .map((obj) => {
          const keys = Object.keys(obj);
          return keys.map((key) => obj[key]["cognitive"]);
        })
        .flatMap((arr) => arr);

const difficultyLevels = (Questions) =>
    Questions
        .map((obj) => {
          const keys = Object.keys(obj);
          return keys.map((key) => obj[key]["difficulty"]);
        })
        .flatMap((arr) => arr);

const marks = (Questions) =>
    Questions
        .map((obj) => {
          const keys = Object.keys(obj);
          return keys.map((key) => "Marks " + obj[key]["mark"]);
        })
        .flatMap((arr) => arr);

const units = (Questions) =>
    Questions
        .map((obj) => {
          const keys = Object.keys(obj);
          return keys.map((key) => "Unit " + obj[key]["unit"]);
        })
        .flatMap((arr) => arr);

const generateContent = (properties, className) => {
  const len = properties[0].length;
  const ini = [];
  for (let i = 0; i < len; i++) {
    ini[i] = "";
  }
  return properties
      .reduce(
          (acc, cur) => {
            return acc.map((val, index) => val + `<span class='${className}'>` +
                                           cur[index] + "</span>");
          },
          ini)
      .map((val) => "<div class='question_properties'>" + val + "</div>");
};

const subjectiveMarkDistribution =
    document.getElementById("subjective_mark_distribution");
const mcqMarkDistribution = document.getElementById("mcq_mark_distribution");
const generatePaper = document.getElementById("generate_paper");
const subjectiveDistribution = Object.values(markDistribution["sub"]);
const mcqDistribution = Object.values(markDistribution.mcq);
let [subQuestions, ...subProperties] = [
  totalQuestions,
  cognitiveLevels,
  difficultyLevels,
  marks,
  units,
].map((f) => f(subjectiveDistribution));
let [mcqs, ...mcqProperties] = [
  totalQuestions,
  cognitiveLevels,
  difficultyLevels,
  marks,
  units,
].map((f) => f(mcqDistribution));

subQuestions =
    subQuestions.map((val) => '<div class="subquestions_id">' + val + "</div>");

subProperties = generateContent(subProperties, "subjective_properties");

mcqs = mcqs.map((val) => '<div class="mcqs_id">' + val + "</div>");

mcqProperties = generateContent(mcqProperties, "mcq_properties");

subjectiveMarkDistribution.innerHTML =
    subQuestions.map((element, index) => element + subProperties[index])
        .reduce((acc, cur) => acc + cur);
mcqMarkDistribution.innerHTML =
    mcqs.map((element, index) => element + mcqProperties[index])
        .reduce((acc, cur) => acc + cur);

generatePaper.addEventListener("click", function() {
  const courseId = generatePaper.getAttribute("data-id");
  fetch(`/course/${courseId}/papers/confirm/template/`, {
    method : "post",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({status : "OK"}),
  })
      .then((val) => val.text())
      .then((paper) => {
        let index1 = paper.indexOf("<hr");
        const index2 = paper.lastIndexOf("<hr");
        index1 = paper.indexOf(">", index1);
        document.getElementById("template_display").innerHTML =
            paper.substr(index1 + 1, index2 - index1 - 1 + 1 - 1);
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "/static/css/papers/generate_paper.css");
        document.head.appendChild(link);
        const script = document.createElement("script");
        script.setAttribute("src", "/static/js/papers/generate_paper.js");
        document.body.appendChild(script);
      })
      .catch((e) => { console.log(e); });
});
})();
