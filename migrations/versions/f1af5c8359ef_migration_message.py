"""Migration message

Revision ID: f1af5c8359ef
Revises: 
Create Date: 2020-06-16 18:29:40.924059

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1af5c8359ef'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('image_file', sa.String(length=20), nullable=False),
    sa.Column('password', sa.String(length=60), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('course',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('paper',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('mark', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.JSON(), nullable=False),
    sa.Column('cognitive_level', sa.JSON(), nullable=False),
    sa.Column('paper_format', sa.JSON(), nullable=False),
    sa.Column('paper_logo', sa.Text(), nullable=False),
    sa.Column('exam_date', sa.Date(), nullable=False),
    sa.Column('time_limit', sa.Text(), nullable=False),
    sa.Column('instructions', sa.JSON(), nullable=True),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['course.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('unit',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('chapter_no', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=True),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['course.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mcq_question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.Text(), nullable=False),
    sa.Column('mark', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.Enum('Easy', 'Medium', 'Hard', name='difficultyenum'), nullable=False),
    sa.Column('cognitive_level', sa.Enum('Knowledge', 'Comprehension', 'Application', name='cognitiveenum'), nullable=False),
    sa.Column('imp', sa.Boolean(), nullable=True),
    sa.Column('option1', sa.Text(), nullable=False),
    sa.Column('option2', sa.Text(), nullable=False),
    sa.Column('option3', sa.Text(), nullable=False),
    sa.Column('option4', sa.Text(), nullable=False),
    sa.Column('unit_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['unit_id'], ['unit.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.Text(), nullable=False),
    sa.Column('mark', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.Enum('Easy', 'Medium', 'Hard', name='difficultyenum'), nullable=False),
    sa.Column('cognitive_level', sa.Enum('Knowledge', 'Comprehension', 'Application', name='cognitiveenum'), nullable=False),
    sa.Column('imp', sa.Boolean(), nullable=True),
    sa.Column('unit_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['unit_id'], ['unit.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('question')
    op.drop_table('mcq_question')
    op.drop_table('unit')
    op.drop_table('paper')
    op.drop_table('course')
    op.drop_table('user')
    # ### end Alembic commands ###
