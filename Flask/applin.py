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

# Initialize Flask app with template folder pointing to the Frontend folder
app = Flask(__name__, template_folder='C:\\Users\\linzs\\Desktop\\Trial\\Frontend')

# Global variable to store progress (0 to 100)
progress = 0

# Load the trained model
model = load_model('C:\\Users\\linzs\\Desktop\\Trial\\Flask\\keras_modelTM.h5', compile=False)

# Define class names directly
class_names = [
    "Acne", "DrugEruption", "Eczema", "Lichen", "Psoriasis", 
    "SkinCancer", "Tinea", "Unknown_Normal", "Vitiligo", "Warts"
]

# Define image size for the model (224x224 for most models like MobileNet)
image_size = (224, 224)

# Function to preprocess the image
def preprocess_image(image_path):
    try:
        image = Image.open(image_path.stream).convert("RGB")
        image = ImageOps.fit(image, image_size, Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        return np.expand_dims(normalized_image_array, axis=0)
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

# Function to generate LIME explanation
def generate_lime_explanation(image_data, model):
    global progress
    # Create the LimeImageExplainer instance
    explainer = LimeImageExplainer()

    # Get explanation from LIME
    explanation = explainer.explain_instance(image_data[0], model.predict, top_labels=5, hide_color=0, num_samples=1000)

    # Update progress as the explanation is generated
    for i in range(101):
        time.sleep(0.1)  # Simulate a time-consuming process
        progress = i

    # Save the explanation visualization to a file
    explanation_image = explanation.get_image_and_mask(explanation.top_labels[0], positive_only=True, num_features=5, hide_rest=True)[0]
    lime_result_path = os.path.join('uploads', 'lime_explanation.jpg')
    cv2.imwrite(lime_result_path, explanation_image)
    
    progress = 100  # Mark progress as complete
    return lime_result_path

# Async function to handle LIME explanation generation in the background
def async_generate_lime(image_data):
    generate_lime_explanation(image_data, model)

# Route to handle the file upload and make predictions
@app.route('/analyze', methods=['POST'])
def predict():
    # global progress
    # if 'file' not in request.files:
    #     return jsonify({"error": "No file part"})
    
    # file = request.files['file']
    
    # if file.filename == '':
    #     return jsonify({"error": "No selected file"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    if file:
        # file_path = os.path.join('uploads', file.filename)
        # file.save(file_path)
        
        image_data = preprocess_image(file)
        
        if image_data is None:
            return jsonify({"error": "Failed to process the image."})

        predictions = model.predict(image_data)
        predicted_class_index = np.argmax(predictions, axis=1)[0]
        predicted_label = class_names[predicted_class_index]
        confidence_score = predictions[0][predicted_class_index]
        
        print(predicted_label)
        # # Generate LIME explanation asynchronously
        # Thread(target=async_generate_lime, args=(image_data,)).start()

        # Include uploaded image URL in the response
        return jsonify({
            "condition": predicted_label,
            # "confidence_score": float(confidence_score),
            # "lime_explanation_url": f"/uploads/lime_explanation.jpg",
            # "uploaded_image_url": f"/uploads/{file.filename}"  # Return the uploaded image URL
        })

# Route to check the progress
@app.route('/progress', methods=['GET'])
def get_progress():
    global progress
    return jsonify({"progress": progress})

# Route to serve the generated LIME explanation image
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    app.run(host='0.0.0.0', port=5000, debug=True)


