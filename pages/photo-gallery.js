import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

const photos = [
  {
    id: 1,
    src: "/photo1.jpg",
    caption: "Our first coffee date ☕💕",
    date: "January 2024"
  },
  {
    id: 2,
    src: "/photo2.jpg",
    caption: "That beautiful sunset walk 🌅",
    date: "February 2024"
  },
  {
    id: 3,
    src: "/photo3.jpg",
    caption: "Movie night cuddles 🎬",
    date: "March 2024"
  },
  {
    id: 4,
    src: "/photo4.jpg",
    caption: "Beach day adventures 🏖️",
    date: "April 2024"
  },
  {
    id: 5,
    src: "/photo5.jpg",
    caption: "Dancing in the kitchen 💃",
    date: "May 2024"
  },
  {
    id: 6,
    src: "/photo6.jpg",
    caption: "Weekend farmers market 🥕",
    date: "June 2024"
  }
]

export default function PhotoGallery() {
  const router = useRouter()
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const goHome = () => {
    router.push('/')
  }

  const goBack = () => {
    router.back()
  }

  const openModal = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  return (
    <>
      <Head>
        <title>Our Photo Gallery 📸</title>
        <meta name="description" content="Beautiful memories captured in photos" />
      </Head>
      
      <div className="gallery-page">
        <div className="gallery-header">
          <button onClick={goBack} className="back-btn-gallery">
            ← Back
          </button>
          <h1>📸 Our Beautiful Moments</h1>
          <button onClick={goHome} className="home-btn-gallery">
            🏠 Home
          </button>
        </div>

        <div className="gallery-container">
          <div className="gallery-intro">
            <p>Every picture tells our story... 💕</p>
          </div>

          <div className="photos-grid">
            {photos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="photo-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(photo)}
              >
                <div className="photo-container">
                  <Image 
                    src={photo.src} 
                    alt={photo.caption}
                    width={300}
                    height={300}
                    className="gallery-photo"
                  />
                  <div className="photo-overlay">
                    <div className="photo-info">
                      <p className="photo-caption">{photo.caption}</p>
                      <p className="photo-date">{photo.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="photo-modal-overlay" onClick={closeModal}>
            <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-photo-btn" onClick={closeModal}>×</button>
              <Image 
                src={selectedPhoto.src} 
                alt={selectedPhoto.caption}
                width={600}
                height={600}
                className="modal-photo"
              />
              <div className="modal-photo-info">
                <h3>{selectedPhoto.caption}</h3>
                <p>{selectedPhoto.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}