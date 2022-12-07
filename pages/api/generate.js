import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const basePromptPrefix = `
This is a chat with Mark Zuckerberg, the founder of Meta.
Explain me the following data structures or algorithms with the title below. Make sure the explanation goes in-depth on the topic with use cases in Meta.

Title:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 300,
  })

  const basePromptOutput = baseCompletion.data.choices.pop()

  // I build Prompt #2.
  const secondPrompt = `
  Take the table of contents and title of the data structures or algorithms below and generate a blog post written in the style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

  Title: ${req.body.userInput}

  Table of Contents: ${basePromptOutput.text}

  Blog Post:
  `

  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
    // I also increase max_tokens.
    max_tokens: 1000,
  })

  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop()

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput })
}

export default generateAction
