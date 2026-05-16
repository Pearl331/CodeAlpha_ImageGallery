import { useState } from 'react';
import './App.css';

// Organised into separate folder categories just like a smartphone storage
const foldersData = {
  "Camera": [
    { id: 101, url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80', title: 'IMG_2026_0501.jpg' },
    { id: 102, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'IMG_2026_0505.jpg' },
    { id: 103, url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', title: 'IMG_2026_0512.jpg' }
  ],
  "Screenshots": [
    { id: 201, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', title: 'Screenshot_2026-05-14-06.png' },
    { id: 202, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80', title: 'Screenshot_2026-05-15-12.png' }
  ],
  "WhatsApp Images": [
    { id: 301, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', title: 'WA_Media_0023.jpeg' },
    { id: 302, url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', title: 'WA_Media_0194.jpeg' },
    { id: 303, url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80', title: 'WA_Media_0441.jpeg' }
  ],
  "Downloads": [
    { id: 401, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', title: 'download_asset_pack.jpg' },
    { id: 402, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', title: 'product_reference_v2.jpg' },
    { id: 403, url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', title: 'device_mockup_flat.jpg' },
    { id: 404, url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', title: 'wallpaper_nature_hd.jpg' }
  ]
};

function App() {
  const [selectedFolder, setSelectedFolder] = useState(null); // Active album view state
  const [currentIndex, setCurrentIndex] = useState(null); // Lightbox control state

  const openFolder = (folderName) => {
    setSelectedFolder(folderName);
  };

  const closeFolder = () => {
    setSelectedFolder(null);
  };

  const currentFolderImages = selectedFolder ? foldersData[selectedFolder] : [];

  return (
    <div className="app-container">
      <header className="gallery-header">
        <span className="brand-subtitle">SYSTEM STORAGE</span>
        <h1>FÁBRICA DE SENTIDOS</h1>
        <div className="header-line"></div>
      </header>

      {/* VIEW 1: ALBUMS DASHBOARD */}
      {!selectedFolder ? (
        <div className="folders-dashboard-grid">
          {Object.keys(foldersData).map((folderName) => {
            const totalItems = foldersData[folderName].length;
            const coverImage = foldersData[folderName][0].url; // Set first image as album thumbnail
            
            return (
              <div key={folderName} className="folder-card" onClick={() => openFolder(folderName)}>
                <div className="folder-thumbnail-wrapper">
                  <img src={coverImage} alt={folderName} className="folder-cover" />
                  <div className="folder-icon-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                </div>
                <div className="folder-details">
                  <h3>{folderName}</h3>
                  <p>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW 2: INSIDE SPECIFIC FOLDER GRID */
        <div className="folder-contents-view">
          <div className="folder-navigation-bar">
            <button className="back-albums-btn" onClick={closeFolder}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              <span>Back to Albums</span>
            </button>
            <h2 className="current-folder-title">{selectedFolder}</h2>
          </div>

          <div className="gallery-grid">
            {currentFolderImages.map((img, index) => (
              <div key={img.id} className="img-card" onClick={() => setCurrentIndex(index)}>
                <div className="img-wrapper">
                  <img src={img.url} alt={img.title} loading="lazy" />
                  <div className="card-overlay">
                    <div className="overlay-content">
                      <h3>{img.title}</h3>
                      <span className="category-tag">Click to expand</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL VIEW LIGHTBOX */}
      {currentIndex !== null && currentFolderImages[currentIndex] && (
        <div className="lightbox-backdrop" onClick={() => setCurrentIndex(null)}>
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <span className="image-counter">{currentIndex + 1} &mdash; {currentFolderImages.length} IN {selectedFolder.toUpperCase()}</span>
            <button className="close-btn" onClick={() => setCurrentIndex(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <button className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); setCurrentIndex((prevIndex) => (prevIndex - 1 + currentFolderImages.length) % currentFolderImages.length); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentFolderImages[currentIndex].url} alt={currentFolderImages[currentIndex].title} className="lightbox-img-fade" />
            <div className="lightbox-caption">
              <h3>{currentFolderImages[currentIndex].title}</h3>
            </div>
          </div>
          
          <button className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); setCurrentIndex((prevIndex) => (prevIndex + 1) % currentFolderImages.length); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;