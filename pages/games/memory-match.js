import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const cardSymbols = ['💕', '💖', '💗', '💝', '💘', '💋', '🌹', '💐']

const createCards = () => {
  const cards = [...cardSymbols, ...cardSymbols].map((symbol, index) => ({
    id: index,
    symbol,
    flipped: false,
    matched: false
  }))
  return cards.sort(() => Math.random() - 0.5)
}

export default function MemoryMatch() {
  const router = useRouter()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    setCards(createCards())
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2 && !isChecking) {
      setIsChecking(true)
      const [firstIndex, secondIndex] = flippedCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]
      
      setMoves(prev => prev + 1)

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map((card, index) => 
              index === firstIndex || index === secondIndex 
                ? { ...card, matched: true }
                : card
            )
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map((card, index) => 
              index === firstIndex || index === secondIndex 
                ? { ...card, flipped: false }
                : card
            )
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1500)
      }
    }
  }, [flippedCards, cards, isChecking])

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameComplete(true)
    }
  }, [cards])

  const handleCardClick = (cardIndex) => {

    if (isChecking || cards[cardIndex].flipped || cards[cardIndex].matched || flippedCards.length >= 2) {
      return
    }

    setCards(prevCards => 
      prevCards.map((card, index) => 
        index === cardIndex ? { ...card, flipped: true } : card
      )
    )
    
    setFlippedCards(prev => [...prev, cardIndex])
    
    if (!gameStarted) {
      setGameStarted(true)
    }
  }

  const resetGame = () => {
    const newCards = createCards()
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameComplete(false)
    setGameStarted(false)
    setIsChecking(false)
  }

  const backToGames = () => {
    router.push('/games')
  }

  return (
    <>
      <Head>
        <title>Memory Match</title>
        <meta name="description" content="Match romantic pairs in this memory game" />
      </Head>
      
      <div className="memory-game-container">
        <div className="game-header">
          <h1>Memory Match 🧠💕</h1>
          <div className="game-stats">
            <span>Moves: {moves}</span>
            {gameStarted && !gameComplete && (
              <span>Matched: {cards.filter(card => card.matched).length / 2} / {cardSymbols.length}</span>
            )}
          </div>
        </div>

        {!gameStarted && (
          <div className="game-instructions">
            <p>Match the romantic pairs by flipping cards!</p>
            <p>Click any card to start playing 💕</p>
          </div>
        )}

        <div className="cards-grid">
          {cards.map((card, index) => (
            <div
              key={`${card.id}-${card.symbol}`}
              className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{ 
                cursor: (isChecking || card.flipped || card.matched || flippedCards.length >= 2) ? 'default' : 'pointer',
                opacity: card.matched ? 0.7 : 1
              }}
            >
              <div className="card-front">❓</div>
              <div className="card-back">{card.symbol}</div>
            </div>
          ))}
        </div>

        {gameComplete && (
          <div className="game-complete">
            <h2>Congratulations! 🎉</h2>
            <p>You completed the game in {moves} moves!</p>
            <p className="completion-message">
              {moves <= 12 ? "Amazing memory! 🧠✨" : 
               moves <= 20 ? "Great job! 👏" : 
               "You did it! Practice makes perfect! 💪"}
            </p>
            <div className="game-complete-buttons">
              <button onClick={resetGame} className="play-again-btn">
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
