import React, { useState } from 'react';
import axios from 'axios';

function ElemAnalyzer() {
  const [image, setImage] = useState<File>();
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [heatmapImageUrl, setHeatmapImageUrl] = useState('');
  const [condition, setCondition] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files){
        return
    }
    setImage(e.target.files[0]);
    setOriginalImageUrl(URL.createObjectURL(e.target.files[0])); // Preview original image
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
      // Send the image to the Flask backend
      const response = await axios.post('http://127.0.0.1:5000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Set the condition and heatmap image data from response
      setCondition(response.data.condition);
      setHeatmapImageUrl(`data:image/jpeg;base64,${response.data.heatmap_image}`);
    } catch (error) {
      console.error("There was an error uploading the image!", error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Medical Diagnoser</h1>
      
      {/* Image Upload Section */}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} className='bg-white'>Analyze</button>
      
      {/* Display Original Image */}
      {originalImageUrl && (
        <div>
          <h2>Original Image</h2>
          <img src={originalImageUrl} alt="Original" width="300" />
        </div>
      )}
      
      {/* Display Heatmap Image and Condition */}
      {heatmapImageUrl && (
        <div>
          <h2>Grad-CAM Overlay</h2>
          <img src={heatmapImageUrl} alt="Grad-CAM" width="300" />
        </div>
      )}
      {condition && <h3 className='text-white'>Predicted Condition: {condition}</h3>}
    </div>
  );
}

export default ElemAnalyzer;
