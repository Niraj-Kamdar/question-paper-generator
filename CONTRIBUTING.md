# How to contribute

I'm really glad you're reading this, because we need volunteer developers to help this project come to fruition.


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

You will need `python 3.6+` installed.

### Installing

After cloning/downloading this repository enable virtual environment for current project and install necessary packages from pipfile with following command

```console
pip install pipenv
pipenv install --dev
```

Note: If you just want to run this website use `pipenv install` without `--dev` 

### Running

Before running following commands make sure you are in virtual environment. If your virtual environment isn't activated then activate it using following command
```console
pipenv shell
```
If your environment is activated then run following command to start webserver.
```console
python app.py
```

### Migrating

When you change database schema i.e change model or add new models you have to perform following commands before running server. Ofcourse you have to activate venv as we have discussed above.

If your environment is activated then run following command to upgrade database.
```console
python manage.py db migrate -m "Migration message"
python manage.py db upgrade
```
In case your local repo don't contain migrations directory inside project base directory.Use following command to initialize database
```console
python manage.py db init
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

## Submitting changes

Please send a [GitHub Pull Request to question-paper-generator](https://github.com/Niraj-Kamdar/question-paper-generator/pull/new/master) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). When you send a pull request. We can always use more test coverage. Please follow our coding conventions (below) and make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:
```bash
    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."
```

## Coding conventions

Start reading our code and you'll get the hang of it. We optimize for readability:

  * We indent using four spaces
  * We ALWAYS put spaces after list items and method parameters (`[1, 2, 3]`, not `[1,2,3]`), around operators (`x += 1`, not `x+=1`), and around hash arrows.
  * This is open source software. Consider the people who will read your code, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers the goal is to make the ride as smooth as possible.
  * So that we can consistently serve images from the CDN, always use image_path or image_tag when referring to images. Never prepend "/images/" when using image_path or image_tag.
  * Also for the CDN, always use cwd-relative paths rather than root-relative paths in image URLs in any CSS. So instead of url('/images/blah.gif'), use url('../images/blah.gif').

Thanks,
Niraj Kamdar, SetNow developer
