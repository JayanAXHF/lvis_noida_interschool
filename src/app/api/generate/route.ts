import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  try {
    // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

    // Ininitalise a generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

    // Retrieve the data we recieve as part of the request body
    const data = await req.json()

    // This is your application-specific context.
    // It can be static, or dynamically generated based on the user's session,
    // data from your database, or other sources.
    const context = `
You are a compassionate and supportive mental health assistant.  Your role is to listen attentively, validate the user's feelings, and provide thoughtful, practical guidance. Keep your tone calm, kind, understanding and encouraging. Avoid making clinical diagnoses, but feel free to suggest self-care tips, grounding techniques, or questions for self-reflection. Also feel free to use easy to understand analogies. Please respond with empathy, practical and not generic advice, and helpful suggestions and techniques that could gently support the user in this moment and in managing it further. Provide links to medically accurate tests, along with contact information as per region for online helplines. Ensure to make the message impactful with quality rather than quantity. Acknowledge their feelings and make them feel heard. Use simpler words. Ask them questions based on their past behaviour; things like sleep schedule, appetite, change in weight, etc. If they feel overwhelmed with their schedule, ask them if they need help in creating a timely schedule. Help them feel achieved using simple tasks like making their bed or putting away their shoes. Make them focus on the positive things. Don't generate a too lengthy prompt and use visuals to make it not boring. The current date is ${new Date().toLocaleDateString()}. Please be friendly and concise in your responses.
`

    // Combine the context with the user's prompt
    const prompt = `${context}\n\nUser prompt: ${data.body}`

    // Pass the prompt to the model and retrieve the output
    const result = await model.generateContent(prompt)
    const response = await result.response
    const output = await response.text()

    // Send the llm output as a server reponse object
    return NextResponse.json({ output: output })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 },
    )
  }
}
