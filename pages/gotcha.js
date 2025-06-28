import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Gotcha() {
  const router = useRouter()
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const navigateToGames = () => {
    router.push('/games')
  }

  return (
    <>
      <Head>
        <title>Gotcha!</title>
        <meta name="description" content="Haha! Got you!" />
      </Head>
      
      <div className="gotcha-container">
        <h1>BWAHAHA! GOTCHA! NOOB</h1>
        {showImage && (
          <div className="surprise-image">
            <div className="cat-emoji"><Image src='/okcat.jpg' alt='okaycat' width={200} height={200} /></div>
          </div>
        )}
        <button className="continue-btn" onClick={navigateToGames}>
          Continue to Games 🎮
        </button>
      </div>
    </>
  )
}