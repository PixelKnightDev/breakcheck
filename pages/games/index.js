import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const games = [
  { 
    id: 'kiss-catch', 
    title: 'Catch the Kisses', 
    icon: '💋',
    description: 'Catch flying kisses to earn pecks!'
  },
  // { 
  //   id: 'love-quiz', 
  //   title: 'Love Quiz', 
  //   icon: '💕',
  //   description: 'Test our compatibility!'
  // },
  { 
    id: 'memory-match', 
    title: 'Memory Match', 
    icon: '🧠',
    description: 'Match romantic pairs!'
  },
  { 
    id: 'heart-clicker', 
    title: 'Heart Clicker', 
    icon: '💖',
    description: 'Click hearts as fast as you can!'
  }
]

export default function Games() {
  const router = useRouter()

  const selectGame = (gameId) => {
    router.push(`/games/${gameId}`)
  }

  const goHome = () => {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Choose Your Game</title>
        <meta name="description" content="Fun dating games to play together" />
      </Head>
      
      <div className="games-container">
        <header className="games-header">
          <h1>Choose Your Challenge! 💕</h1>
          <p>Pick a game to play together...</p>
          <button onClick={goHome} className="home-btn">
            🏠 Back Home
          </button>
        </header>

        <div className="games-grid">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => selectGame(game.id)}
            >
              <div className="game-icon">{game.icon}</div>
              <h3>{game.title}</h3>
              <p className="game-description">{game.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}