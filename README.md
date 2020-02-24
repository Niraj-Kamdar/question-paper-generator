# question-paper-generator
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

## Built With

* [Flask](http://flask.pocoo.org/) -  Flask is a microframework for Python based on Werkzeug and Jinja 2

