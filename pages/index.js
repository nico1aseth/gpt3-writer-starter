import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import buildspaceLogo from '../assets/buildspace-logo.png'
import meta from '../assets/meta.png'

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true)

    console.log('Calling OpenAI...')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    })

    const data = await response.json()
    const { output } = data
    console.log('OpenAI replied...', output.text)

    setApiOutput(`${output.text}`)
    setIsGenerating(false)
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  }

  return (
    <div className='root'>
      <div className='bar'>
        <Image src={meta} />
      </div>
      <div className='container'>
        <div className='header'>
          <div className='header-title'>
            <h1>Learn DSA from Meta</h1>
          </div>
          <div className='header-subtitle'>
            <h2>
              Let Mark Zuckerberg explain data structures and algorithms to you
            </h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className='prompt-container'>
          <textarea
            placeholder=':)'
            className='prompt-box'
            value={userInput}
            onChange={onUserChangedText}
          />
          {/* New code I added here */}
          <div className='prompt-buttons'>
            <a
              className={isGenerating ? 'mark' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className='generate'>
                {isGenerating ? (
                  <span className='loader'></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          <br />
          {/* New code I added here */}
          {!apiOutput && (
            <div className='output'>
              <div className='output-content'>
                <p>
                  At Meta, we understand the importance of efficient data
                  structures, so that's why we rely on Binary Search Trees
                  (BSTs) as a tool in our arsenal. BSTs are data structures that
                  allow us to store data in an ordered tree-like fashion, and
                  they can be used for a variety of purposes.
                </p>
                <p>
                  First, Binary Search Trees can be used to store user data such
                  as profiles and preferences. By using a BST, we can quickly
                  search for users within a given range to recommend content to
                  them, or to display relevant content based on their
                  preferences. Additionally, BSTs can be used to store search
                  engine-like data that can be used to display search results in
                  an ordered manner.{' '}
                </p>
                <p>
                  The beauty of BSTs is that they are composed of nodes that
                  have a left and right pointer, as well as a data value. The
                  data stored in these nodes must conform to a certain rule,
                  which is that the left-side node must be less than the parent
                  node, and the right-side node must be greater than the parent
                  node. This means that data stored in a BST can be quickly
                  sorted and traversed in an efficient manner.{' '}
                </p>
                <p>
                  At Meta, we rely on BSTs to make sure that our data is quickly
                  and efficiently stored and retrieved without sacrificing
                  performance. By using BSTs, we can make sure that our users
                  get the best experience possible.
                </p>
              </div>
            </div>
          )}
          {apiOutput && (
            <div className='output'>
              <div className='output-content'>
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
        <footer className='author'>
          <p>Built with love by Nicolas</p>
        </footer>
      </div>
    </div>
  )
}

export default Home
