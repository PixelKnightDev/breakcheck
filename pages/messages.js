import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'
// import confetti from 'canvas-confetti' // ✅ Add this import


  const messages = [
  {
    id: 1,
    date: "January 15, 2024",
    message: "im pratyush1",
    time: "2:30 PM"
  },
  {
    id: 2,
    date: "January 20, 2024",
    message: "im pratyush2",
    time: "7:45 PM"
  },
  {
    id: 3,
    date: "February 14, 2024",
    message: "im pratyush3",
    time: "12:00 AM"
  },
  {
    id: 4,
    date: "March 10, 2024",
    message: "im pratyush4",
    time: "6:15 PM"
  },
  {
    id: 5,
    date: "March 25, 2024",
    message: "im pratyuush... Will you go out with me? 🌹",
    time: "9:30 PM"
  }
]


export default function Messages() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  const goHome = () => router.push('/')
  const goToGames = () => router.push('/games')

  const triggerConfetti = async () => {
  const confetti = (await import('canvas-confetti')).default
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 },
    angle: 60,
  })
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 },
    angle: 120,
  })
}


  const handleNext = () => {
    triggerConfetti()
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, messages.length - 1))
    }, 800)
  }

  const currentMsg = messages[currentIndex]

  return (
    <>
      <Head>
        <title>Love Messages 💌</title>
        <meta name="description" content="Special messages for someone special" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="messages-page">
        <div className="messages-header-page">
          <div>
          <button onClick={goHome} className="back-btn-page">← Back Home</button>
          </div>
          <h1>💌 Love Messages</h1>
          {/* <button onClick={goToGames} className="games-btn-page">🎮 Games</button> */}
        </div>

        <div className="messages-container">
          <div className="single-message-card">
            <div className="">
              {/* <div className="message-header">
                <span className="message-date">{currentMsg.date}</span>
                <span className="message-time">{currentMsg.time}</span>
              </div> */}
              <div className="message-content">
                {currentMsg.message}
              </div>
            </div>
          </div>

          <div className="yes-btn-container">
            {currentIndex < messages.length - 1 ? (
              <button onClick={handleNext} className="yes-btn">Yes 💖</button>
            ) : (
              <div className="end-text">
                <p>That's all for now... but there's more to come 💫</p>
              </div>
            )}
          </div>

          <div className="messages-footer">
            <div className="love-quote">
              <p>"Every love story is beautiful, but ours is my favorite" 💖</p>
            </div>
            <div className="action-buttons">
              <button onClick={goHome} className="home-btn-messages">💕 Answer the Question</button>
              <button onClick={goToGames} className="games-btn-messages">🎮 Play Games Together</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
