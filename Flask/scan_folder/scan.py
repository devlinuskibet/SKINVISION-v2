import cv2
import os

# Folder where all the face datasets will be stored
datasets = '/home/madrigal/PROJECTS/MAJOR_PROJECTS/SKINVISION/AI_MODEL/virenv/model2/scan_folder/datasets'

# Sub-folder for a specific person (you can change 'max' to any name)
sub_data = 'max'

# Path to save the images
path = '/home/madrigal/PROJECTS/MAJOR_PROJECTS/SKINVISION/AI_MODEL/virenv/model2/scan_folder/datasets' 
best_file_path = ''

# Create the directory if it doesn't exist
if not os.path.isdir(path):
    os.mkdir(path)

# Defining the size of the images (rectangle area size)
(width, height) = (130, 100)

# Initialize webcam
webcam = cv2.VideoCapture(0)

# Get the webcam resolution (width and height)
frame_width = int(webcam.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(webcam.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Initial rectangle values
rect_x, rect_y, rect_w, rect_h = int(frame_width * 0.25), int(frame_height * 0.35), int(frame_width * 0.5), int(frame_height * 0.6)

# Initialize the image count
count = 1

# Flag to indicate whether to start capturing
capturing = False

# Mouse callback variables
dragging = False
resizing = False
start_x, start_y = -1, -1

# Mouse callback function
def mouse_callback(event, x, y, flags, param):
    global rect_x, rect_y, rect_w, rect_h, dragging, resizing, start_x, start_y

    if event == cv2.EVENT_LBUTTONDOWN:
        # Check if the mouse is within the rectangle
        if rect_x <= x <= rect_x + rect_w and rect_y <= y <= rect_y + rect_h:
            # Check if the mouse is close to the edges/corners for resizing
            if (abs(x - rect_x) <= 10 and abs(y - rect_y) <= 10):  # Top-left corner
                resizing = 'tl'
            elif (abs(x - (rect_x + rect_w)) <= 10 and abs(y - rect_y) <= 10):  # Top-right corner
                resizing = 'tr'
            elif (abs(x - rect_x) <= 10 and abs(y - (rect_y + rect_h)) <= 10):  # Bottom-left corner
                resizing = 'bl'
            elif (abs(x - (rect_x + rect_w)) <= 10 and abs(y - (rect_y + rect_h)) <= 10):  # Bottom-right corner
                resizing = 'br'
            elif rect_x < x < rect_x + rect_w and rect_y < y < rect_y + rect_h:
                dragging = True  # Start dragging the entire rectangle
                start_x, start_y = x, y
        else:
            # If click is outside the rectangle, create a new rectangle
            resizing = False
            dragging = False
            start_x, start_y = x, y
            rect_x, rect_y = x, y
            rect_w, rect_h = 0, 0

    elif event == cv2.EVENT_MOUSEMOVE:
        # Update the rectangle size or position based on the mouse movements
        if resizing:
            if resizing == 'tl':  # Top-left corner
                rect_w += rect_x - x
                rect_h += rect_y - y
                rect_x = x
                rect_y = y
            elif resizing == 'tr':  # Top-right corner
                rect_w = x - rect_x
                rect_h += rect_y - y
                rect_y = y
            elif resizing == 'bl':  # Bottom-left corner
                rect_w += rect_x - x
                rect_h = y - rect_y
                rect_x = x
            elif resizing == 'br':  # Bottom-right corner
                rect_w = x - rect_x
                rect_h = y - rect_y
            # Prevent negative dimensions
            if rect_w < 0:
                rect_w = 1
            if rect_h < 0:
                rect_h = 1
        elif dragging:
            # Update the rectangle position when dragging
            dx = x - start_x
            dy = y - start_y
            rect_x += dx
            rect_y += dy
            start_x, start_y = x, y

    elif event == cv2.EVENT_LBUTTONUP:
        # Stop dragging or resizing when mouse button is released
        dragging = False
        resizing = False

# Set the mouse callback function to the window
cv2.namedWindow('Webcam Feed')
cv2.setMouseCallback('Webcam Feed', mouse_callback)

# Start capturing images
while True:
        # Capture frame from webcam
        ret, im = webcam.read()

        if not ret:
            print("Failed to grab frame")
            break

        # Draw the green rectangle on the frame (but don't save it)
        cv2.rectangle(im, (rect_x, rect_y), (rect_x + rect_w, rect_y + rect_h), (0, 255, 0), 2)  # Green rectangle

        # Display the webcam feed with the rectangle on it
        cv2.imshow('Webcam Feed', im)

        # Wait for a key press
        key = cv2.waitKey(10) & 0xFF

        # If the Enter key is pressed, start capturing
        if key == 13:  # Enter key
            capturing = True
            print("Capturing started. Press 'Esc' to stop.")

        # Start capturing images only when the Enter key is pressed
        if capturing:
            # Ensure valid rectangle dimensions before cropping
            if rect_w > 0 and rect_h > 0:
                # Crop the image to focus on the area inside the green rectangle
                cropped_image = im[rect_y:rect_y + rect_h, rect_x:rect_x + rect_w]

                # Resize the cropped image to the desired dimensions
                face_resize = cv2.resize(cropped_image, (width, height))

                # Save the cropped and resized image in the specified path with original color
                cv2.imwrite('%s/%d.png' % (path, count), face_resize)
                count += 1

            # Stop after capturing 30 images
            if count > 100:
                print("Captured 30 images.")
            break 

        # Exit on pressing the 'Esc' key
        if key == 27:  # Escape key
            print("Exiting...")
            break
    
   
# Release the webcam and close the window
webcam.release()
cv2.destroyAllWindows()
