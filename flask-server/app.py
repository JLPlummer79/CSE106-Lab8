from flask import Flask, request, render_template, url_for, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from forms import AddStudentForm, FindStudent, EditGrade, DeleteStudentRecord
#import uuid
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'         #Connectin URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False                    #reduce number of warnings in the terminal
app.config['SECRET_KEY'] ='1aa6b0b0cc00d17b40618d9c99218c59'            #for csrf token stuff        

db = SQLAlchemy(app)                                                   #instantiate database

#def generate_uuid():                                                            #generate a unique id key, not a requirement, but a good
#     return str(uuid.uuid4())


#SQLAlchemy that is the schema for a table,can have multiple classes i.e. multiple tables    
class Student(db.Model):                               #Primary keys are unique!                                
    name = db.Column(db.String(50), primary_key=True, nullable=False)               
    grade = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, name, grade):                                            #will help create the database
        self.name = name
        self.grade = grade

    def __repr__(self):
        return f'<Student {self.name}>'                                         #this gives each object a string to recognize it for debugging (student name)
    
@app.route('/')                      #displays all students in database
def index():
    
    students = Student.query.all()
    return render_template('index.html', title='Display',students=students)

@app.route('/student', methods=['GET','POST'])                                  #get single student
def student():
    form = FindStudent()
    if form.validate_on_submit():
        student = Student.query.get(form.studentName.data) 
        flash(f'{form.studentName.data} grade','success')
        return render_template('single_student.html', student=student) 
    return render_template('student.html', title='Search Student', form=form)

    
@app.route('/add', methods=['GET','POST'])                                      #add a student to database
def newStudent():
    form = AddStudentForm()
    if form.validate_on_submit():
        student = Student(name = form.studentName.data, grade= form.grade.data)
        db.session.add(student)
        db.session.commit()
        flash(f'New Student Added', 'success')
        #return redirect(url_for('index'))
    return render_template('add.html', title="Add New Student", form=form)

@app.route('/edit', methods=['GET','POST'])                                     #edit a student grade/add to database
def edit():
    form = EditGrade()
    if form.validate_on_submit():
        edit = Student.query.get(form.studentName.data)
        edit.grade = form.newGrade.data
        db.session.commit()
        flash(f'{edit.name} Grade Updated','success')
        #return redirect(url_for('index'))
    return render_template('edit.html', title="Edit Student", form=form)

@app.route('/delete', methods=['GET','POST'])                                   #delete student from database
def delete():
    form = DeleteStudentRecord()
    if form.validate_on_submit():
        frank=Student.query.get(form.studentName.data)
        db.session.delete(frank)
        db.session.commit()
        flash(f'{frank.name} Deleted', 'success')
        #return redirect(url_for('index'))
    return render_template('delete.html', title="Delete", form=form)



if __name__ == "__main__":
    app.run(debug=True, port=8080)