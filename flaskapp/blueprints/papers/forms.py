import re
from collections import defaultdict
from string import ascii_uppercase

from flask import request
from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import DateField
from wtforms import FileField
from wtforms import IntegerField
from wtforms import StringField
from wtforms import SubmitField
from wtforms.form import BaseForm
from wtforms.validators import DataRequired
from wtforms.validators import ValidationError

from flaskapp.models import Course
from flaskapp.models import Unit
from flaskapp.utils import CognitiveEnum, QuestionTypeEnum
from flaskapp.utils import DifficultyEnum


class IsSumOf:
    """
    Compares if the sum of values of fields are equal to current field.

    :param fieldnames:
        The name of the other fields to compare to.
    :param message:
        Error message to raise in case of a validation error. Can be
        interpolated with `%(other_label)s` and `%(other_name)s` to provide a
        more helpful error.
    """

    def __init__(self, *fieldnames, message=None):
        self.fieldnames = fieldnames
        self.message = message

    def __call__(self, form, field):
        try:
            expected_sum = sum(
                map(lambda fieldname: form[fieldname].data, self.fieldnames))
        except KeyError:
            raise ValidationError(
                field.gettext("Invalid field name in {}.").format(", ".join(
                    self.fieldnames)))
        if field.data != expected_sum:
            message = self.message
            if message is None:
                message = field.gettext(
                    "Field must be equal to {}.".format(expected_sum))

            raise ValidationError(message)


class MarkDistributionForm:
    def __init__(self, course_id, questions, total_marks):
        course = Course.query.filter(Course.id == course_id).first()
        units = Unit.query.filter(Unit.course == course).all()

        question_translator = defaultdict(dict)
        form_fields = {}
        validators = defaultdict(list)
        flatten_data = defaultdict(list)

        flatten_data["unit"].extend([0] * len(units))
        flatten_data["cognitive"].extend([0] * len(CognitiveEnum.__members__))
        flatten_data["difficulty"].extend([0] *
                                          len(DifficultyEnum.__members__))
        flatten_data["question_type"].extend([0] * len(QuestionTypeEnum.__members__))
        flatten_data["question"].extend([0] * sum(questions))

        for unit in units:
            field = f"Unit:{unit.chapter_no:02d}"
            form_fields.update(
                {field: IntegerField(field, validators=[DataRequired()])})
            validators["unit"].append(field)
        for c_level in CognitiveEnum.__members__:
            form_fields.update(
                {c_level: IntegerField(c_level, validators=[DataRequired()])})
            validators["cognitive"].append(c_level)
        for d_level in DifficultyEnum.__members__:
            form_fields.update(
                {d_level: IntegerField(d_level, validators=[DataRequired()])})
            validators["difficulty"].append(d_level)
        for qtype in QuestionTypeEnum.__members__:
            form_fields.update({
                qtype: IntegerField(qtype, validators=[DataRequired()])
            })
            validators["question_type"].append(qtype)

        idx = 0
        for question_no, subquestions in enumerate(questions):
            for subquestion in range(subquestions):
                field = f"Que.{question_no + 1}.{ascii_uppercase[subquestion]}"
                form_fields.update(
                    {field: IntegerField(field, validators=[DataRequired()])})
                validators["question"].append(field)
                question_translator[question_no +
                                    1][ascii_uppercase[subquestion]] = idx
                idx += 1

        for i, validator in validators.items():
            validators[i] = IsSumOf(*validator)

        form_fields.update({
            "total_marks":
            IntegerField("total_marks",
                         validators=[DataRequired(),
                                     *validators.values()])  # *validators
        })

        self.form = BaseForm(form_fields)
        self.flatten_data = flatten_data
        self.course = course
        self.total_marks = total_marks
        self.unit_field_regex = re.compile(r"Unit:(\d\d)")
        self.question_field_regex = re.compile(r"Que.(\d+).([A-Z])")
        self.question_translator = question_translator

    @property
    def data(self):
        for constraint in self.fields:
            for field in self.fields[constraint]:
                self.flatten_data[constraint][self.translate(
                    constraint, field.name)] = int(field.data)
        return self.flatten_data

    @property
    def fields(self):
        fields = defaultdict(list)
        for field in self.form._fields:
            if "Unit" in field:
                fields["unit"].append(self.form._fields[field])
            elif "Que" in field:
                fields["question"].append(self.form._fields[field])
            elif field in CognitiveEnum.__members__:
                fields["cognitive"].append(self.form._fields[field])
            elif field in DifficultyEnum.__members__:
                fields["difficulty"].append(self.form._fields[field])
            elif field in QuestionTypeEnum.__members__:
                fields["question_type"].append(self.form._fields[field])
        return fields

    def translate(self, constraint, field):
        if constraint == "cognitive":
            return CognitiveEnum.__members__[field].value - 1
        if constraint == "difficulty":
            return DifficultyEnum.__members__[field].value - 1
        if constraint == "question_type":
            return QuestionTypeEnum.__members__[field].value - 1
        if constraint == "unit":
            return int(self.unit_field_regex.search(field).group(1)) - 1
        if constraint == "question":
            matched = self.question_field_regex.search(field)
            return self.question_translator[int(
                matched.group(1))][matched.group(2)]

    def validate_on_submit(self):
        self.form.process(request.form)
        self.form._fields["total_marks"].process_data(self.total_marks)
        return request.method == "POST" and self.form.validate()


class PaperLogoForm(FlaskForm):
    name = StringField("Paper name", validators=[DataRequired()])
    term = StringField("Term name", validators=[DataRequired()])
    exam_date = DateField("Date of the exam")
    time_limit = StringField("Time length", validators=[DataRequired()])
    picture = FileField("Upload logo for paper",
                        validators=[FileAllowed(["jpg", "png"])])
    submit = SubmitField("generate now")
