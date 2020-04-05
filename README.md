# question-paper-generator

[![GitHub Actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fatrox%2Fsync-dotenv%2Fbadge&label=build&logo=none)](https://actions-badge.atrox.dev/Niraj-Kamdar/question-paper-generator/goto)
[![codecov](https://codecov.io/gh/Niraj-Kamdar/question-paper-generator/branch/develop/graph/badge.svg)](https://codecov.io/gh/Niraj-Kamdar/question-paper-generator)
[![DeepSource](https://static.deepsource.io/deepsource-badge-light-mini.svg)](https://deepsource.io/gh/Niraj-Kamdar/question-paper-generator/?ref=repository-badge)
[![DeepScan grade](https://deepscan.io/api/teams/8090/projects/10244/branches/138920/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8090&pid=10244&bid=138920)
[![fork this repo](https://img.shields.io/github/forks/Niraj-Kamdar/question-paper-generator)](https://github.com/Niraj-Kamdar/question-paper-generator/fork)


This is a question paper generator website for the institute.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

You will need `python 3.6+` installed.

### Installing

After cloning/downloading this repository enable virtual environment for current project and install necessary packages from requirements.txt with following command

```console
python -m venv venv
cd venv
cd scripts
./activate
cd ../..
pip install -r requirements.txt
```

### Running

Before running following commands make sure you are in virtual environment. You can verify it by checking `(venv)` in the start. If your virtual environment isn't activated then activate it using following command
```console
cd venv
cd scripts
./activate
cd ../..
```
If your environment is activated then run following command to start webserver.
```console
python run.py
```

### Migrating

When you change database schema i.e change model or add new models you have to perform following commands before running server. Ofcourse you have to activate venv as we have discussed above.

If your environment is activated then run following command to upgrade database.
```console
python manage.py db migrate -m "Migration message"
python manage.py db upgrade
```

### Testing

You can run all tests with following command
```console
python -m unittest discover test
```
You can run any particular test using following command
```console
python -m unittest test.<filename without py>
```
For example if you want to run test_add_sub_question run followinf command
```console
python -m unittest test.test_add_sub_question
```

## Built With

* [Flask](http://flask.pocoo.org/) -  Flask is a microframework for Python based on Werkzeug and Jinja 2
