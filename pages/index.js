import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0})
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0})
  
  // New state for messages feature
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Hardcoded password
  const correctPassword = "pookie123"

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return() => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNoClick = (event) => {
    event.preventDefault()
        
    const noButton = event.target
    const maxX = window.innerWidth - noButton.offsetWidth - 100
    const maxY = window.innerHeight - noButton.offsetHeight - 100
    const randomX = Math.floor((Math.random() * maxX))
    const randomY = Math.floor(Math.random() * maxY)
        
    setNoButtonPosition({ x: randomX/2, y: randomY })
    setIsNoButtonMoving(true)
  }

  const handleYesClick = () => {
    router.push('/gotcha')
  }

  // Updated function to route to messages page
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === correctPassword) {
      router.push('/messages') // Navigate to messages page
      setPasswordError('')
      setPassword('')
      setShowPasswordModal(false)
    } else {
      setPasswordError('Wrong password! Try again... 💔')
      setPassword('')
    }
  }

  const openPasswordModal = () => {
    setShowPasswordModal(true)
    setPasswordError('')
  }

  const closePasswordModal = () => {
    setShowPasswordModal(false)
    setPassword('')
    setPasswordError('')
  }

  return (
    <>
      <Head>
        <title>Will you go out with me?</title>
        <meta name="description" content="A cute way to ask someone out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className='home-container'>
        {/* Messages Button */}
        <button className="messages-btn" onClick={openPasswordModal}>
          📩 Open Messages
        </button>

        <header>
          <h1>Hey cutie 🌹</h1>
          <p className='subheading'>I was just wondering if you wanted to...</p>
        </header>
        
        <section className='main-content'>
          <p>...go out with me?😊</p>
          <div
            className='button-group'
            style={{ position: 'relative', width: '100%', height: '200px' }}
          >
            <button className='yes' onClick={handleYesClick} style={{ height: '60px'}}>
              yessssss✨
            </button>
            <button
              className='no'
              onClick={handleNoClick}
              style={
                isNoButtonMoving
                  ? {
                      height: '60px',
                      position: 'fixed',
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      transition: 'all 0.3s ease',
                      zIndex: 1000,
                    }
                  : { height: '60px'}
              }
            >
              nooooo😕
            </button>
          </div>
        </section>
        
        <div className="floating-img-container">
          <div className='floating-emoji'>
            <Image src="/cat.jpg" alt="Cute Cat" width={200} height={200}/>
          </div>
        </div>

        {/* Password Modal Only */}
        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="password-modal">
              <h2>🔒 Enter Password</h2>
              <p>These messages are for someone special...</p>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="password-input"
                  autoFocus
                />
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="modal-buttons">
                  <button type="submit" className="submit-btn">
                    Unlock 💝
                  </button>
                  <button type="button" onClick={closePasswordModal} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}