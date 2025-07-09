import { useRouter } from 'next/router'
import Head from 'next/head'

const storyEvents = [
  {
    id: 1,
    date: "1st ",
    title: "First Meeting 👋",
    description: "The day our eyes first met... I knew something special was about to begin.",
    icon: "✨"
  }
]

export default function OurStory() {
  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <Head>
        <title>Our Love Story 📖</title>
        <meta name="description" content="The timeline of our beautiful journey" />
      </Head>
      
      <div className="story-page">
        <div className="story-header">
          <button onClick={goBack} className="back-btn-story">
            ← Back
          </button>
          <h1>📖 Our Love Story</h1>
          {/* <button onClick={goHome} className="home-btn-story">
            🏠 Home
          </button> */}
        </div>

        <div className="story-container">
          <div className="story-intro">
            <p>Every great love story has a beginning... 💕</p>
          </div>

          <div className="timeline">
            {storyEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="timeline-marker">
                  <span className="timeline-icon">{event.icon}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">{event.date}</div>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="story-footer">
            <div className="story-quote">
              <p className="story-question">Will you write the next chapter with me? 🥺</p>
            </div>
            <button onClick={goHome} className="answer-btn">
              💕 Go Answer!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}