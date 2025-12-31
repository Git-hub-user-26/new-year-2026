import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css';

function Gallery() {
  // Add your image URLs here
  const [photos] = useState([
    {
      id: 1,
      url: 'https://via.placeholder.com/400x300/ff6b9d/ffffff?text=Our+Memory+1',
      caption: 'Our beautiful moment together'
    },
    {
      id: 2,
      url: 'https://via.placeholder.com/400x300/c44569/ffffff?text=Our+Memory+2',
      caption: 'Always smiling with you'
    },
    {
      id: 3,
      url: 'https://via.placeholder.com/400x300/f8b500/ffffff?text=Our+Memory+3',
      caption: 'Making memories every day'
    },
    {
      id: 4,
      url: 'https://via.placeholder.com/400x300/ff6348/ffffff?text=Our+Memory+4',
      caption: 'Love and laughter'
    },
    {
      id: 5,
      url: 'https://via.placeholder.com/400x300/aa96da/ffffff?text=Our+Memory+5',
      caption: 'Forever grateful for you'
    },
    {
      id: 6,
      url: 'https://via.placeholder.com/400x300/ff9ff3/ffffff?text=Our+Memory+6',
      caption: 'You make everything better'
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="gallery-container">
      <Link to="/home" className="back-btn">← Back to Home</Link>
      
      <div className="gallery-header">
        <h1>📸 Our Beautiful Memories 📸</h1>
        <p>Every picture tells our story</p>
      </div>

      <div className="photo-grid">
        {photos.map(photo => (
          <div 
            key={photo.id} 
            className="photo-card"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.url} alt={photo.caption} />
            <div className="photo-overlay">
              <p>{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedPhoto(null)}>&times;</span>
            <img src={selectedPhoto.url} alt={selectedPhoto.caption} />
            <p>{selectedPhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
