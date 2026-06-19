require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function getCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
     You are an AI social media caption writer.

Analyze the uploaded image and create a catchy, engaging, and creative caption suitable for Instagram, Facebook, or LinkedIn.

Rules:
- Caption must be based only on visible image content.
- Keep it short and impactful (1-2 sentences).
- Use a friendly and natural tone.
- Add relevant emojis when suitable.
- Do not use hashtags unless specifically requested.
- Do not explain the image.
- Return only the final caption.

Example Output:
☕ Starting the day with good vibes and even better coffee.
      `,
    },
  });

  console.log(response.text);
  return response.text;
}

module.exports = getCaption;
