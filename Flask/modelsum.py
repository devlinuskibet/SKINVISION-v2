import tensorflow as tf

# Load the saved model (replace with your file path)
model_path = 'C:\\Users\\linzs\\Desktop\\Trial\\Flask\\keras_modelTM.h5'  # Replace with the path to your .keras or .h5 file
model = tf.keras.models.load_model(model_path)

# Print the model summary to inspect the layers
model.summary()

# Get the last layer of the model
last_layer = model.layers[-1]

# Print details of the last layer
print(f"Layer name: {last_layer.name}")
print(f"Layer type: {last_layer.__class__.__name__}")
print(f"Layer output shape: {last_layer.output_shape}")
print(f"Number of parameters in the last layer: {last_layer.count_params()}")
