import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const questions = [
  {
    question: "What's your ideal date?",
    options: ["Netflix & Chill 🍿", "Fancy Restaurant 🍽️", "Adventure Park 🎢", "Beach Picnic 🏖️"],
    correct: 1
  },
  {
    question: "Pick your favorite love song:",
    options: ["Perfect - Ed Sheeran 🎵", "All of Me - John Legend 💝", "Thinking Out Loud 💭", "Love Story - Taylor Swift 💕"],
    correct: 1
  },
  {
    question: "What's the most romantic gesture?",
    options: ["Surprise gifts 🎁", "Love letters 💌", "Quality time ⏰", "Acts of service 🤝"],
    correct: 2
  },
  {
    question: "Favorite romantic movie genre:",
    options: ["Rom-Com 😂", "Drama 🎭", "Musical 🎶", "Classic Romance 🌹"],
    correct: 0
  },
  {
    question: "How do you show affection?",
    options: ["Physical touch 🤗", "Words of affirmation 💬", "Gift giving 🎀", "Quality time 👫"],
    correct: 3
  }
]

export default function LoveQuiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1)
      }else setScore(score+1)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const backToGames = () => {
    router.push('/games')
  }

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) {
      return "Perfect match! We're meant to be! 💖"
    } else if (percentage >= 60) {
      return "Pretty good compatibility! There's definitely something here! 💕"
    } else if (percentage >= 40) {
      return "We have some things in common! Let's get to know each other better! 😊"
    } else {
      return "Opposites attract, right? This could be interesting! 😉"
    }
  }

  if (showResult) {
    return (
      <>
        <Head>
          <title>Quiz Results</title>
        </Head>
        
        <div className="quiz-result">
          <h1>Quiz Complete! 💕</h1>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <p className="result-message">
            {getResultMessage()}
          </p>
          <div className="result-buttons">
            <button onClick={resetQuiz} className="retry-btn">
              Try Again 🔄
            </button>
            <button onClick={backToGames} className="back-btn">
              Back to Games 🎮
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Love Quiz</title>
        <meta name="description" content="Test your compatibility with this love quiz" />
      </Head>
      
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Love Quiz 💕</h1>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p>Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <div className="question-card">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`option-btn ${
                  selectedAnswer === index 
                    ? index === questions[currentQuestion].correct 
                      ? 'correct' 
                      : 'correct'
                    : ''
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}