require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction = `
    You are given a prompt that may contain information about sexuality and emotional state. Your task is to analyze the prompt and determine if it includes references to both sexuality and emotional states. 

    1. sexuality: The possible values are female, male, and neutral.
    2. emotional: The possible values are joy, sadness, anger, fear, and disgust.

    For each prompt, return the results as a JSON string with the following structure:

    {
    "sexuality": [sexuality value"],
    "emotional": [emotional value"]
    }

    - sexuality: always specify a value that in possible value.
    - emotional: always specify a value that in possible value.

    Example responses:
    - '{"sexuality": "female", "emotional": "joy"}'
    - '{"sexuality": "male", "emotional": "joy"}'
    - '{"sexuality": "female", "emotional": "fear"}'
    - '{"sexuality": "male", "emotional": "fear"}'

    Please ensure the response is a valid value for each attribute and a valid JSON object that has been stringfy for easy parsing without'.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction,
});

async function sentimentStatement(statement) {
  const result = await model.generateContent(statement);
  const response = await result.response;
  const text = response
    .text()
    .replace(/[\*\n\`]/g, "")
    .trim();
  return text;
}

module.exports = {
  sentimentStatement: sentimentStatement,
};
