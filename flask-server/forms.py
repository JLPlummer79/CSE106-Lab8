from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired

#To add a new Student
class AddStudentForm(FlaskForm):
    studentName = StringField('Student', 
                              validators =[DataRequired()])
    grade = FloatField('Grade',
                       validators= [DataRequired()])
    submit = SubmitField('Add New Student')
    

#Find a student grade
class FindStudent(FlaskForm):
    studentName = StringField('Student',
                              validators= [DataRequired()])
    submit = SubmitField('Find Student')

#Edit a student grade
class EditGrade(FlaskForm):
    studentName = StringField('Student',
                              validators=[DataRequired()])
    newGrade = FloatField('Grade',
                          validators=[DataRequired()])
    submit = SubmitField('Edit Student')

#Delete a student from db
class DeleteStudentRecord(FlaskForm):
    studentName = StringField('Student',
                              validators=[DataRequired()])
    submit = SubmitField('Delete Student')
    