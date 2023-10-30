from flask import Flask, jsonify, redirect, request, url_for
from flask_admin import Admin
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_admin.contrib.sqla import ModelView
from flask_login import LoginManager, current_user, login_user


app = Flask(__name__)
app.secret_key = "secret key"

app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
db = SQLAlchemy(app)

CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, resources={r"/index/*": {"origins": "*"}})
CORS(app, resources={r"/index": {"origins": "*"}})
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})
CORS(app, resources={r"/index": {"origins": "http://127.0.0.1:5500"}})

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class StudentView(ModelView):
    can_delete = False
    can_create = False
    can_edit = False
    

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    access = db.Column(db.String, nullable=False)

    def getAccess(self):
        return self.access
    
    def get_id(self):
        return self.id
    
    def check_password(self, password):
        return self.password == password
    
    def is_authenticated():
        return True
    
    def is_active():
        return True
    
    def is_anonymous():
        return False
    
    

    

class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    className = db.Column(db.String, nullable=False)
    teacherName = db.Column(db.String, nullable=False)
    time = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    studentName = db.Column(db.String, nullable=False)
    grades = db.Column(db.Integer, nullable=False)
    
    

with app.app_context():
    db.create_all()

admin = Admin(app, name='Admin', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Courses, db.session))


@login_manager.user_loader 
def load_user(user_id):
    return User.get_id(user_id)


@app.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
   
    userName = request_data.get("username")
    passWord = request_data.get("password")
   

    # print(current_user)
    # if current_user.getAccess() == 'Teacher':
    #     return redirect(url_for())
    # elif current_user.getAccess() == 'Student':
    #     return redirect(url_for())
    # elif current_user.getAccess() == 'Admin':
    #     return redirect(url_for('admin')) 
    user = User.query.filter_by(username=userName).first()
    print(user.get_id())
    if user is None or not user.check_password(passWord):
        return "index"
    login_user(user)
    access = user.getAccess()
    
    return jsonify({access: access})

app.run()