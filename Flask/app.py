import cv2
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import numpy as np
from sqlalchemy import func
from datetime import datetime
from flask_cors import CORS
from PIL import Image
import base64
import tensorflow as tf
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from PIL import ImageOps
import os
from flask import Flask, request, jsonify, render_template, send_from_directory
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import cv2
import tensorflow as tf
from lime.lime_image import LimeImageExplainer
from threading import Thread
import time

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///skinvision.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '@jwt_secret_access'
db = SQLAlchemy(app)
jwt = JWTManager(app)
x =12.000
CORS(app)

# Define models
class Hospital(db.Model):
    __tablename__ = 'hospitals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True,nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(100), nullable=True)
    termsAccepted = db.Column(db.Boolean())
    patients = db.relationship('Patient', secondary='hospital_patient', backref=db.backref('hospitals', lazy=True))
    tokens = db.relationship('Token', backref='hospitals', uselist=False)
    doctors = db.relationship('Doctors', backref='hopitals', lazy=True)
    managers = db.relationship('Managers', backref='hospitals', lazy=True)
class Doctors(db.Model):
    __tablename__ = 'doctors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password=db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)

class Managers(db.Model):
    __tablename__ = 'managers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password=db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String(100), nullable=False)
    prescribed_disease = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    diagnosed_at = db.Column(db.DateTime, nullable=True)
    records = db.relationship('Record', backref='patient', lazy=True)

class Record(db.Model):
    __tablename__ = 'records'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    disease = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    treatment = db.Column(db.Text, nullable=True)

class HospitalPatient(db.Model):
    __tablename__ = 'hospital_patient'
    hospital_id = db.Column(db.String, db.ForeignKey('hospitals.id'), primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), primary_key=True)

class Token(db.Model):
    __tablename__ = 'token'
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, default=25)
    hospital_id = db.Column(db.String, db.ForeignKey('hospitals.id'), unique=True)
    hospital = db.relationship('Hospital', back_populates='token')

# Create database tables
with app.app_context():
    db.create_all()

# JWT Helper Functions
def authorize_roles(*roles):
    def wrapper(fn):
        @jwt_required()
        def decorated(*args, **kwargs):
            claims = get_jwt()
            if claims["role"] not in roles:
                return jsonify(msg="Access denied"), 403
            return fn(*args, **kwargs)
        return decorated
    return wrapper

# Load your trained model
model = load_model("C:\\Users\\linzs\\Desktop\\Trial\\Flask\\keras_modelTM.h5")

progress = 0
conditions = [
    "Acne", "DrugEruption", "Eczema", "Lichen", "Psoriasis", 
    "SkinCancer", "Tinea", "Unknown_Normal", "Vitiligo", "Warts"
]
image_size = (224, 224)  
def preprocess_image(image_path):
    try:
        image = Image.open(image_path).convert("RGB")
        image = ImageOps.fit(image, image_size, Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        return np.expand_dims(normalized_image_array, axis=0)
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

class Analyzer:
    def __init__(self, file, hospital):
        self.file = file
        self.hospital = hospital
    
    def analyze(self):
        try:
             # Use the new preprocess_image function instead of manual resizing and normalization
            img_array = preprocess_image(self.file.stream)  # Use the new preprocess_image function
        
            if img_array is None:
             raise ValueError("Image preprocessing failed")

            condition = model_instance.process_image(img_array)

            self.hospital.token.count -= 1
            db.session.commit()

            result = {
                'condition': condition
            }
            return jsonify(result), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

class MyModel:
    def __init__(self, model):
        self.model = model

    def process_image(self, img_array):
        predictions = self.model.predict(img_array)
        pred_index = np.argmax(predictions[0])
        condition = conditions[pred_index]
        x = np.max(pred_index)
        return condition

model_instance = MyModel(model)

# Authentication Routes
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    #Check if hospital exists
    hospital = Hospital.query.filter_by(name=data['hospital_name']).first()
    if not hospital:
        return jsonify({"error": "Hospital not found"}), 404
    # Check if user is a doctor
    user = Doctors.query.filter_by(username=username).first()
    role = 'doctor'
    
    if not user:
        # Check if user is a manager
        user = Managers.query.filter_by(username=username).first()
        role = 'manager'
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id, additional_claims={"role": role})
    return jsonify(access_token=access_token)

# Register doctors and managers
@app.route('/register/doctor', methods=['POST'])
def register_doctor():
    try: 
        data = request.get_json()
        if not isinstance(data, list):
            return jsonify({"error": "Invalid input, expected a list of users"}), 400

        doctors = []
        for doctor_data in data:
            username = doctor_data["username"]
            name = doctor_data["name"]
            password = generate_password_hash(doctor_data["password"])
            hospital_id = doctor_data["hospital_id"]
            email = doctor_data["email"]

            #validate user data
            if not all([username, name, password, hospital_id, email]):
                return jsonify({"error": "Missing fields in one or more user entries"}), 400
            doctor = Doctors(name, username, password, email, hospital_id)
            doctors.append(doctor)
        db.session.bulk_save_objects(doctor)
        db.session.commit()
        return jsonify({"message": "Doctor registered successfully"}), 201
    except IntegrityError: 
        db.session.rollback()
        return jsonify({"error": "One or more usernames already exist"}), 400
    except Exception as e:
        return jsonify({"error", f"An errro occured: {str(e)}"}), 500


@app.route('/register/manager', methods=['POST'])
def register_manager():
    try: 
        data = request.get_json()
        if not isinstance(data, list):
            return jsonify({"error": "Invalid input, expected a list of users"}), 400

        managers = []
        for manager_data in data:
            username = manager_data["username"]
            name = manager_data["name"]
            password = generate_password_hash(manager_data["password"])
            hospital_id = manager_data["hospital_id"]
            email = manager_data["email"]

            #validate user data
            if not all([username, name, password, hospital_id, email]):
                return jsonify({"error": "Missing fields in one or more user entries"}), 400
            doctor = Doctors(name, username, password, email, hospital_id)
            managers.append(doctor)
        db.session.bulk_save_objects(doctor)
        db.session.commit()
        return jsonify({"message": "Doctor registered successfully"}), 201
    except IntegrityError: 
        db.session.rollback()
        return jsonify({"error": "One or more usernames already exist"}), 400
    except Exception as e:
        return jsonify({"error", f"An errro occured: {str(e)}"}), 500

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    try:
        img_array = preprocess_image(file.stream)  # Use the new preprocess_image function
        
        if img_array is None:
            raise ValueError("Image preprocessing failed")

        condition = model_instance.process_image(img_array)

        result = {
            'condition': condition
        }
        print(result)
        return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/learn', methods=['POST'])
def learn():
    if 'file' not in request.files or 'label' not in request.form:
        return jsonify({"error": "File or label missing"}), 400

    file = request.files['file']
    label = request.form['label']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    try:
       
        img_array = preprocess_image(file.stream)  # Use the new preprocess_image function
        
        if img_array is None:
            raise ValueError("Image preprocessing failed")

        model_instance.train_on_image(img_array, label)

        return jsonify({"message": "Model updated successfully."})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# CRUD endpoints for Hospitals, Patients, and Records
@app.route('/hospitals', methods=['POST'])
def create_hospital():
    data = request.get_json()
    hospital = Hospital(id = data['id'], name=data['name'], email=data['email'], location=data['location'], level=data['level'])
    tokens = Token(hospital=hospital)
    db.session.add(hospital)
    db.session.add(tokens)
    db.session.commit()
    return jsonify({"message": "Hospital created successfully"}), 201

@app.route('/patients', methods=['POST'])
def create_patient():
    data = request.get_json()
    patient = Patient(name=data['name'], age=data['age'], location=data['location'],
                      prescribed_disease=data.get('prescribed_disease'), diagnosed_at=data.get('diagnosed_at'))
    db.session.add(patient)
    db.session.commit()
 
@app.route('/records', methods=['POST'])
def create_record():
    data = request.get_json()
    record = Record(patient_id=data['patient_id'], disease=data['disease'],
                    description=data['description'], treatment=data['treatment'])
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Record created successfully"}), 201

# Analytical insights endpoint
@app.route('/hospitals/<int:hospital_id>/insights', methods=['GET'])
def get_insights(hospital_id):
    hospital = Hospital.query.get(hospital_id)
    if not hospital:
        return jsonify({"error": "Hospital not found"}), 404

    insights = {
        "total_diseases_by_category": {},
        "diseases_by_location": {},
        "diseases_by_day": {},
        "most_common_disease": None
    }

    # Total diseases by category
    category_counts = db.session.query(Record.disease, func.count(Record.disease)).join(Patient).join(HospitalPatient)\
        .filter(HospitalPatient.hospital_id == hospital_id).group_by(Record.disease).all()
    insights["total_diseases_by_category"] = {disease: count for disease, count in category_counts}

    # Diseases by location
    location_counts = db.session.query(Patient.location, func.count(Patient.id)).join(HospitalPatient)\
        .filter(HospitalPatient.hospital_id == hospital_id).group_by(Patient.location).all()
    insights["diseases_by_location"] = {location: count for location, count in location_counts}

    # Diseases by days of the week
    day_counts = db.session.query(func.strftime('%w', Record.diagnosed_at), func.count(Record.id)).join(Patient)\
        .join(HospitalPatient).filter(HospitalPatient.hospital_id == hospital_id).group_by(func.strftime('%w', Record.diagnosed_at)).all()
    insights["diseases_by_day"] = {day: count for day, count in day_counts}

    # Most common disease
    most_common_disease = db.session.query(Record.disease, func.count(Record.disease)).join(Patient).join(HospitalPatient)\
        .filter(HospitalPatient.hospital_id == hospital_id).group_by(Record.disease).order_by(func.count(Record.disease).desc()).first()
    insights["most_common_disease"] = most_common_disease[0] if most_common_disease else None

    return jsonify(insights)
@app.route('/scan', methods=['GET'])
def scan():
    import scan_folder.scan 
    from scan_folder.tr4 import get_best_image
    file_path = get_best_image('C:\\Users\\linzs\\Desktop\\Trial\\Flask\\scan_folder\\datasets')
    print(file_path)
    try:
        img_array = preprocess_image(file_path.stream)  # Use the new preprocess_image function
        
        if img_array is None:
            raise ValueError("Image preprocessing failed")

        condition = model_instance.process_image(img_array)
        print(condition)

        if x < 0.1:
            return jsonify({ condition: 'Unknown'}), 200

        result = {
            'condition': condition,
        }
        return jsonify(result), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

