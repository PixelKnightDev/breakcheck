import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Gotcha() {
  const router = useRouter()
  const [showImage, setShowImage] = useState(false)
  const [showMemoriesModal, setShowMemoriesModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const navigateToGames = () => {
    router.push('/games')
  }

  const openMemoriesModal = () => {
    setShowMemoriesModal(true)
  }

  const closeMemoriesModal = () => {
    setShowMemoriesModal(false)
  }

  const openPhotoGallery = () => {
    router.push('/photo-gallery')
  }

  const openTimeline = () => {
    router.push('/our-story')
  }

  const goHome = () => {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Gotcha!</title>
        <meta name="description" content="Haha! Got you!" />
      </Head>
      
      <div className="gotcha-container">
        <h4>Awwww my pookiee honeypieeee sweeitee sugarplumss mwaahh ♥️</h4>
        {showImage && (
          <div className="surprise-image">
            <div className="cat-emoji">
              <Image src='/okcat.jpg' alt='okaycat' width={200} height={200} />
            </div>
          </div>
        )}
        <div className="gotcha-buttons">
          <button className="continue-btn" onClick={navigateToGames}>
            Continue to Games 🎮
          </button>
          <button className="memories-btn-gotcha" onClick={openMemoriesModal}>
            💕 Our Memories
          </button>
          {/* <button className="home-btn-gotcha" onClick={goHome}>
            🏠 Back Home
          </button> */}
        </div>

        {/* Memories Modal */}
        {showMemoriesModal && (
          <div className="modal-overlay">
            <div className="memories-modal">
              <h2>💕 Our Memories</h2>
              <p>What would you like to explore?</p>
              <div className="memories-options">
                <button onClick={openPhotoGallery} className="memory-option-btn">
                  <div className="option-icon">📸</div>
                  <div className="option-title">Photo Gallery</div>
                  <div className="option-desc">See our beautiful moments</div>
                </button>
                <button onClick={openTimeline} className="memory-option-btn">
                  <div className="option-icon">📖</div>
                  <div className="option-title">Memory lane</div>
                  <div className="option-desc">Timeline of our journey</div>
                </button>
              </div>
              <button onClick={closeMemoriesModal} className="close-memories-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}