import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function HeartClicker() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [clickEffects, setClickEffects] = useState([])
  const heartRef = useRef(null)

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      setGameOver(true)
    }
  }, [timeLeft, gameActive])

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(15)
    setGameOver(false)
    setClickEffects([])
  }

  const handleHeartClick = (event) => {
    if (!gameActive) return

    setScore(prev => prev + 1)
    
    // Create click effect
    const rect = heartRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const newEffect = {
      id: Date.now() + Math.random(),
      x,
      y
    }
    
    setClickEffects(prev => [...prev, newEffect])
    
    // Remove effect after animation
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id))
    }, 1000)
  }

  const backToGames = () => {
    router.push('/games')
  }

  const getPerformanceMessage = () => {
    const cps = score / 15 // clicks per second
    if (cps >= 5) {
      return "Lightning fast! ⚡ You're a clicking master!"
    } else if (cps >= 3) {
      return "Great clicking speed! 🚀"
    } else if (cps >= 2) {
      return "Good effort! 👍"
    } else {
      return "Keep practicing! 💪"
    }
  }

  return (
    <>
      <Head>
        <title>Heart Clicker</title>
        <meta name="description" content="Click hearts as fast as you can!" />
      </Head>
      
      <div className="heart-clicker-container">
        <div className="game-header">
          <h1>Heart Clicker 💖</h1>
          <div className="game-stats">
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>
        </div>

        {!gameActive && !gameOver && (
          <div className="game-start">
            <p>Click the heart as many times as you can in 15 seconds!</p>
            <p>Show me how much you love me! 💕</p>
            <button onClick={startGame} className="start-btn">
              Start Clicking 💖
            </button>
          </div>
        )}

        {gameActive && (
          <div className="clicking-area">
            <div 
              ref={heartRef}
              className="clickable-heart"
              onClick={handleHeartClick}
            >
              💖
              {clickEffects.map(effect => (
                <div
                  key={effect.id}
                  className="click-effect"
                  style={{
                    left: effect.x,
                    top: effect.y
                  }}
                >
                  +1
                </div>
              ))}
            </div>
            <p className="click-instruction">Click the heart! 👆</p>
          </div>
        )}

        {gameOver && (
          <div className="game-over">
            <h2>Time&apos;s Up! ⏰</h2>
            <div className="final-score">
              <span className="score-number">{score}</span>
              <span className="score-label">clicks</span>
            </div>
            <p className="performance-message">
              {getPerformanceMessage()}
            </p>
            <p className="love-message">
              That&apos;s {score} reasons why you love me! 😘
            </p>
            <div className="game-over-buttons">
              <button onClick={startGame} className="play-again-btn">
                Click Again 🔄
              </button>
              <button onClick={backToGames} className="back-btn">
                Back to Games 🎮
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}