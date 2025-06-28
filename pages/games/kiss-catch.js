import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function KissCatch() {
  const router = useRouter()
  const [kisses, setKisses] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const gameAreaRef = useRef(null)
  const kissIntervalRef = useRef(null)

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      setGameOver(true)
      if (kissIntervalRef.current) {
        clearInterval(kissIntervalRef.current)
      }
    }
  }, [timeLeft, gameActive])

  useEffect(() => {
    if (gameActive) {
      kissIntervalRef.current = setInterval(() => {
        const newKiss = {
          id: Date.now() + Math.random(),
          x: Math.random() * 70 + 10, // Keep kisses within bounds
          y: Math.random() * 70 + 10,
          speed: Math.random() * 3 + 2
        }
        setKisses(prev => [...prev.slice(-8), newKiss]) // Limit max kisses
      }, 800)

      return () => {
        if (kissIntervalRef.current) {
          clearInterval(kissIntervalRef.current)
        }
      }
    }
  }, [gameActive])

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setKisses([])
  }

  const catchKiss = (kissId) => {
    setKisses(prev => prev.filter(kiss => kiss.id !== kissId))
    setScore(prev => prev + 1)
  }

  const backToGames = () => {
    router.push('/games')
  }

  return (
    <>
      <Head>
        <title>Catch the Kisses</title>
        <meta name="description" content="Catch flying kisses game" />
      </Head>
      
      <div className="kiss-catch-container">
        <div className="game-header">
          <h1>Catch the Kisses! 💋</h1>
          <div className="game-stats">
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>
        </div>

        {!gameActive && !gameOver && (
          <div className="game-start">
            <p>Catch as many kisses as you can in 30 seconds!</p>
            <p>Each kiss you catch = one peck you owe me! 😘</p>
            <button onClick={startGame} className="start-btn">
              Start Game 💋
            </button>
          </div>
        )}

        {gameActive && (
          <div className="game-area" ref={gameAreaRef}>
            {kisses.map((kiss) => (
              <div
                key={kiss.id}
                className="kiss"
                style={{
                  left: `${kiss.x}%`,
                  top: `${kiss.y}%`,
                  animationDuration: `${kiss.speed}s`
                }}
                onClick={() => catchKiss(kiss.id)}
              >
                💋
              </div>
            ))}
          </div>
        )}

        {gameOver && (
          <div className="game-over">
            <h2>Time&apos;s Up! 💕</h2>
            <p>You caught <strong>{score}</strong> kisses!</p>
            <p className="peck-message">
              That means you owe me <strong>{score} peck{score !== 1 ? 's' : ''}</strong>! 😘
            </p>
            <div className="game-over-buttons">
              <button onClick={startGame} className="play-again-btn">
                Play Again 🔄
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