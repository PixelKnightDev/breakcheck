import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0})
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0})

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

  return (
    <>
    <head>
      <title>Will you go out with me?</title>
      <meta name="description" content="A cute way to ask someone out" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <div className='home-container'>
      <header>
        <h1>Hey cutie 🌹</h1>
        <p className='subheading'>I was just wondering if you wanted to...</p>
      </header>
      <section className='main-content'>
        <p>...go out with me?😊</p>
        <div
          className='button-group'
          style={{ position: 'relative', width: '100%', height: '200px' }} // enough height for button to move
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
        <div className='floating-emoji'><Image src="/cat.jpg" alt="Cute Cat" width={200} height={200}/></div>
      </div>
    </div>
    </>
  )
}