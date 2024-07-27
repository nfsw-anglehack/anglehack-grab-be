require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction = `
    You are given a prompt that may contain information about sexuality and emotional state. Your task is to analyze the prompt and determine if it includes references to both sexuality and emotional states.

    1. sexuality: The availabe values are female or male.
    2. emotional: The availabe values are joy, sadness, anger, fear, or disgust.
    For each prompt, return the results as a JSON string with the following structure:

    {"sexuality": "[female | male | neutral]", "emotional": "[joy | sadness | anger | fear | disgust]"}
    sexuality: always specify a value that is a availabe value for sexuality. If the input doesn't clearly match any availabe value, choose the closest availabe value.
    emotional: always specify a value that is a availabe value for emotional. If the input doesn't clearly match any availabe value, choose the closest availabe value.
    Ensure the response is a valid value for each attribute in JSON and a valid JSON object that has been stringified for easy parsing.

    force it to only value that available, dont cross use for value in sexuality to emotional or vice versa, or pick neutral.
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
    .replace(/[\*\n]/g, "")
    .trim();
  return text;
}

module.exports = {
  sentimentStatement: sentimentStatement,
};
