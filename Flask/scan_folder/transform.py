import cv2
import numpy as np
import os

# Function to calculate sharpness using the Laplacian method (variance)
def calculate_sharpness(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian = cv2.Laplacian(gray, cv2.CV_64F)
    variance = laplacian.var()  # Variance of Laplacian: a higher value means sharper
    return variance

# Function to calculate image entropy (measure of information content)
def calculate_entropy(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
    hist /= hist.sum()  # Normalize
    entropy = -np.sum(hist * np.log2(hist + 1e-10))  # Avoid log(0)
    return entropy

# Function to calculate image noise using standard deviation
def calculate_noise(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    noise = np.std(gray)  # Standard deviation of pixel intensities as noise measure
    return noise

# Function to calculate edge density using Canny edge detector
def calculate_edge_density(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)  # Canny edge detection
    edge_density = np.sum(edges) / (edges.shape[0] * edges.shape[1])  # Proportion of edge pixels
    return edge_density

# Function to evaluate image quality based on multiple metrics
def evaluate_image_quality(image):
    sharpness = calculate_sharpness(image)
    entropy = calculate_entropy(image)
    noise = calculate_noise(image)
    edge_density = calculate_edge_density(image)

    # Combine the metrics into a single quality score (weights can be adjusted)
    quality_score = sharpness + entropy + edge_density - noise  # Higher is better
    return quality_score

# Function to read images from a directory
def read_images_from_directory(directory):
    images = []
    filenames = []
    
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        
        # Check if file is an image
        if filename.lower().endswith(('png', 'jpg', 'jpeg', 'bmp', 'tiff')):
            img = cv2.imread(file_path)
            if img is not None:
                images.append(img)
                filenames.append(file_path)  # Store the full file path
    return images, filenames

# Function to get the best quality image file path
def get_best_image(directory):
    # Read images from the specified directory
    images, filenames = read_images_from_directory(directory)

    image_scores = []
    
    for img in images:
        quality_score = evaluate_image_quality(img)
        image_scores.append(quality_score)
    
    # Find the image with the highest quality score (max)
    best_image_index = np.argmax(image_scores)  # Get index of the image with the highest score
    best_image_file_path = filenames[best_image_index]  # Return the file path of the best image
    
    # Print the file path of the best image
    print(f"The file path of the best quality image is: {best_image_file_path}")
    
    return best_image_file_path
