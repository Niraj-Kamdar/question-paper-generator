# question-paper-generator

![Python application](https://github.com/Niraj-Kamdar/question-paper-generator/workflows/Python%20application/badge.svg)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Niraj-Kamdar/question-paper-generator)
[![codecov](https://codecov.io/gh/Niraj-Kamdar/question-paper-generator/branch/develop/graph/badge.svg)](https://codecov.io/gh/Niraj-Kamdar/question-paper-generator)
[![DeepSource](https://static.deepsource.io/deepsource-badge-light-mini.svg)](https://deepsource.io/gh/Niraj-Kamdar/question-paper-generator/?ref=repository-badge)
[![DeepScan grade](https://deepscan.io/api/teams/8090/projects/10244/branches/138920/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8090&pid=10244&bid=138920)
[![CodeFactor](https://www.codefactor.io/repository/github/niraj-kamdar/question-paper-generator/badge)](https://www.codefactor.io/repository/github/niraj-kamdar/question-paper-generator)

There are many schools and colleges that take frequent exams and creating a
perfect balanced paper for all these exams are a difficult task. Most of the
teachers already have a long question bank for the courses he is teaching. So,
we are providing a system where s/he can generate a random paper with
constraints specified by him/her. We currently support four such constraints:

1. Difficulty level (Easy, Medium, Hard)
2. Cognitive level (Application, Knowledge, Comprehension)
3. Unit wise mark distribution
4. Question Type (Subjective, Objective)

The system also stores all previously generated papers so that teachers can
access it anytime. The system is designed to not repeat previously asked
questions. The system also provides an option to email generated paper in PDF
format to the examiner.

The purpose of this system is to automate the existing manual system by the help
of computerized equipment, fulfilling their requirements, so that their valuable
data/information can be stored for a longer period with easy accessing and
manipulation of the same.

## Contributors

[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/0)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/0)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/1)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/1)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/2)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/2)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/3)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/3)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/4)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/4)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/5)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/5)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/6)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/6)[![](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/images/7)](https://sourcerer.io/fame/Niraj-Kamdar/Niraj-Kamdar/question-paper-generator/links/7)

## Links

- [Website](https://setnow.herokuapp.com) - Official question paper generator
  website of this project.
- [Prototype](https://xd.adobe.com/view/20664204-9248-4810-6df3-8d5bee31da72-5657/) -
  Adobe XD prototypes of the UI/UX.
- [Coverage Report](https://codecov.io/gh/Niraj-Kamdar/question-paper-generator) -
  code coverage report for the project
- [Python Analyser](https://deepsource.io/gh/Niraj-Kamdar/question-paper-generator/?ref=repository-badge) -
  Code analysis report for the back-end
- [Javascript Analyser](https://deepscan.io/dashboard/#view=project&tid=8090&pid=10244&bid=138920) -
  Code analysis report for the front-end
- [Contributing](https://github.com/Niraj-Kamdar/question-paper-generator/blob/develop/CONTRIBUTING.md) -
  Contributing guidelines for the project
- [Code Of Conduct](https://github.com/Niraj-Kamdar/question-paper-generator/blob/develop/CODE_OF_CONDUCT.md) -
  Code of conduct guidelines for the project

## Built With

- [Flask](http://flask.pocoo.org/) - Flask is a microframework for Python based
  on Werkzeug and Jinja 2
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) -
  Flask-SQLAlchemy is an extension for Flask that adds support for SQLAlchemy
  ORM to your application.
- [Weasyprint](https://weasyprint.org/) - WeasyPrint is a smart solution helping
  web developers to create PDF documents.
- [Heroku](https://www.heroku.com/) - Heroku is a cloud platform as a service
  which host web app on internet.
- [Sentry](https://sentry.io/) - Application monitoring and error tracking
  software.
- [Sendinblue](https://www.sendinblue.com/) - SaaS for email marketing and
  transactional mail.
- [Jinja Templates](https://jinja.palletsprojects.com/en/2.11.x/) - templating
  language used with flask for frontend.

## Screenshots

- Home page  
  <kbd><img src="https://github.com/jeel2308/question-paper-generator/blob/develop/screenshots/homepage.png" alt="login" width="350"/></kbd>

- Paper generation  
  <kbd><img src="https://github.com/jeel2308/question-paper-generator/blob/develop/screenshots/mark_for_each_unit.png" alt="unit_wise" width="350"/></kbd>  
  <kbd><img src="https://github.com/jeel2308/question-paper-generator/blob/develop/screenshots/mark_for_difficulty.png" alt="difficulty_wise" width="350"/></kbd>  
  <kbd><img src="https://github.com/jeel2308/question-paper-generator/blob/develop/screenshots/mark_for_skills.png" alt="skill_wise" width="350"/></kbd>  
  <kbd><img src="https://github.com/jeel2308/question-paper-generator/blob/develop/screenshots/mark_for_subquestions.png" alt="subquestion_wise" width="350"/></kbd>

- Generated Paper  
  <kbd><img src="https://github.com/jeel2308/question-paper-generator/blob/develop/screenshots/paper.jpg" alt="paper" width="350" /></kbd>

- [Click here to watch demo](https://www.youtube.com/watch?v=L1AUgybPBLA&t=20s)
