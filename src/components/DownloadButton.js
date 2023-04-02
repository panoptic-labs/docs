import React from 'react';
import './DownloadButton.css';

const DownloadButton = ({ imageUrl, fileName }) => {
  async function downloadImage() {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="download-container">
      <div className="image-container">
        <img src={imageUrl} alt="Panoptic Roadmap 2023" />
        <button onClick={downloadImage} className="download-button">
            &#x2913; Download
        </button>
      </div>
    </div>
  );
  
};

export default DownloadButton;
