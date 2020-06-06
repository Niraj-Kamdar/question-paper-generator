import re
from collections import defaultdict
from string import ascii_uppercase

from flask import request
from wtforms import IntegerField
from wtforms.form import BaseForm
from wtforms.validators import DataRequired
from wtforms.validators import ValidationError

from flaskapp.models import Course
from flaskapp.models import Unit
from flaskapp.utils import CognitiveEnum
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
            expected_sum = sum(map(lambda fieldname: form[fieldname], self.fieldnames))
        except KeyError:
            raise ValidationError(
                field.gettext("Invalid field name in {}.").format(
                    ", ".join(self.fieldnames)
                )
            )
        if field.data != expected_sum:
            message = self.message
            if message is None:
                message = field.gettext(
                    "Field must be equal to {}.".format(expected_sum)
                )

            raise ValidationError(message)


class MarkDistributionForm:
    def __init__(self, course_id, questions, total_marks):
        course = Course.query.filter(Course.id == course_id).first()
        units = Unit.query.filter(Unit.course == course).all()

        form_fields = {}
        validators = [[]] * 4
        flatten_data = defaultdict(list)

        flatten_data["units"].extend([0] * len(units))
        flatten_data["cognitive"].extend([0] * len(CognitiveEnum.__members__))
        flatten_data["difficulty"].extend([0] * len(DifficultyEnum.__members__))
        flatten_data["questions"].extend([0] * sum(questions))

        for unit in units:
            field = f"Unit:{unit.chapter_no:02d}"
            form_fields.update(
                {field: IntegerField(field, validators=[DataRequired()])}
            )
            validators[0].append(field)
        for c_level in CognitiveEnum.__members__:
            form_fields.update(
                {c_level: IntegerField(c_level, validators=[DataRequired()])}
            )
            validators[1].append(c_level)
        for d_level in DifficultyEnum.__members__:
            form_fields.update(
                {d_level: IntegerField(d_level, validators=[DataRequired()])}
            )
            validators[2].append(d_level)
        for question in questions:
            for subquestion in range(question):
                field = f"Que.{question}.{ascii_uppercase[subquestion]}"
                form_fields.update(
                    {field: IntegerField(field, validators=[DataRequired()])}
                )
                validators[3].append(field)

        for i, validator in enumerate(validators):
            validators[i] = IsSumOf(*validator)

        form_fields.update(
            {
                "total_marks": IntegerField(
                    "total_marks", validators=[DataRequired(), *validators]
                )
            }
        )
        self.form = BaseForm(form_fields)
        self.flatten_data = flatten_data
        self.form._fields["total_marks"].process_data(total_marks)
        self.course = course
        self.unit_field_regex = re.compile(r"Unit:(\d\d)")
        self.question_field_regex = re.compile(r"Que.(\d+).([A-Z])")

    @property
    def data(self):
        for field in self.form._fields:
            if "Unit" in field:
                field_attr = self.form._fields[field.data]
                self.flatten_data["unit"][self.translate("unit", field)] = int(
                    field_attr
                )
            elif "Que" in field:
                field_attr = self.form._fields[field.data]
                self.flatten_data["unit"][self.translate("unit", field)] = int(
                    field_attr
                )
            elif field in CognitiveEnum.__members__:
                field_attr = self.form._fields[field.data]
                self.flatten_data["cognitive"][
                    self.translate("cognitive", field)
                ] = int(field_attr)
            elif field in DifficultyEnum.__members__:
                field_attr = self.form._fields[field.data]
                self.flatten_data["difficulty"][
                    self.translate("difficulty", field)
                ] = int(field_attr)
        return self.flatten_data

    def translate(self, constraint, field):
        if constraint == "cognitive":
            return CognitiveEnum.__members__[field].value
        if constraint == "difficulty":
            return DifficultyEnum.__members__[field].value
        if constraint == "units":
            return int(self.unit_field_regex.search(field).group(1))
        if constraint == "questions":
            matched = self.question_field_regex.search(field)
            return int(matched.group(1)) + ord(matched.group(2)) - ord("@")

    def validate_on_submit(self):
        return request.POST and self.form.validate()
