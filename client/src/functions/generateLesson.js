// generateLesson.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your Gemini API Key
const API_KEY = "AIzaSyBuBc6Kxh4YrQlWan3RQlUrTMZ8YYziNbI";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

// Async function to generate lesson
async function generateLesson(LessonDetails) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // User inputs (replace with form data if using in frontend/backend)
  const course_topic = LessonDetails.topic;
  const target_audience = LessonDetails.target_audience;
  const difficulty = LessonDetails.difficulty;
  const duration = LessonDetails.duration;

  // Prompt
  const prompt = `
You are an expert instructional designer.

Create a structured lesson based on the following inputs:

Topic: ${course_topic}
Target Audience: ${target_audience}
Difficulty Level: ${difficulty}
Duration: ${duration}

Please generate the following:

1. Prerequisites
2. Lesson Title & Description
3. Key Concepts based on difficulty level
4. Topics that to learn based on the key concepts
5. Learning Goals / Objectives
6. Activities (at least 2)
7. Examples (at least 2)
8. References (if applicable)

Use clear formatting and plain English.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text; 
    // console.log("Generated Lesson:\n", text);
  } catch (error) {
    alert("Error generating lesson:", error);
  }
}

export default generateLesson ;
