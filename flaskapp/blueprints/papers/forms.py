import re
from collections import defaultdict
from string import ascii_uppercase

from wtforms import IntegerField
from wtforms.form import BaseForm
from wtforms.validators import DataRequired, ValidationError

from flaskapp.models import Course, Unit
from flaskapp.utils import CognitiveEnum, DifficultyEnum


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
        data = {}
        validators = {}
        fields = defaultdict(list)
        flatten_data = defaultdict(list)

        flatten_data["units"].extend([0] * len(units))
        flatten_data["cognitive"].extend([0] * len(CognitiveEnum.__members__))
        flatten_data["difficulty"].extend([0] * len(DifficultyEnum.__members__))
        flatten_data["questions"].extend([0] * sum(questions))

        for unit in units:
            field = f"Unit:{unit.chapter_no:02d}"
            fields["units"].append(field)
            data.update({field: IntegerField(field, validators=[DataRequired()])})
        for c_level in CognitiveEnum.__members__:
            fields["cognitive"].append(c_level)
            data.update({c_level: IntegerField(c_level, validators=[DataRequired()])})
        for d_level in DifficultyEnum.__members__:
            fields["difficulty"].append(d_level)
            data.update({d_level: IntegerField(d_level, validators=[DataRequired()])})
        for question in questions:
            for subquestion in range(question):
                field = f"Que.{question}.{ascii_uppercase[subquestion]}"
                fields["questions"].append(field)
                data.update({field: IntegerField(field, validators=[DataRequired()])})

        for constraint in fields:
            validators[constraint] = IsSumOf(*fields[constraint])

        data.update(
            {
                "total_marks": IntegerField(
                    total_marks, validators=[DataRequired(), *validators.values()]
                )
            }
        )
        self.form = BaseForm(data)
        self.total_marks = total_marks
        self.course = course
        self.fields = fields
        self.flatten_data = flatten_data
        self.unit_field_regex = re.compile(r"Unit:(\d\d)")
        self.question_field_regex = re.compile(r"Que.(\d+).([A-Z])")

    @property
    def data(self):
        for constraint in self.fields:
            for field in self.fields[constraint]:
                field_attr = getattr(self.form, field)
                self.flatten_data[constraint][self.translate(constraint, field)] = int(
                    field_attr.data
                )
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
