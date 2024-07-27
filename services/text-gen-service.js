require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction = `
    You are an expert quotes make an wiseman, and your job is to make a story about a person with given context,
    
    Paragraph Template:

    [(1) [Unique Trait of the Person from Feedback]] is a defining quality that describes [(2) [Name of the Person]] [(3) [The Most Liked Aspect of the Person from Feedback]], [(4) [Summary of All Feedback that Integrates the Unique Trait and Most Liked Aspect in a Cohesive and Coherent Manner]].

    Instructions for Each Section:

    Section (1): Describe the unique quality or characteristic of the person based on the feedback. This section should highlight the distinct trait of the person.

    Section (2): Provide the name of the person mentioned in the feedback. This section should include the person's name as given.

    Section (3): Detail the most liked aspect of the person from the feedback. This should be a specific positive attribute or feature that is highly appreciated.

    Section (4): Create a summary that integrates both the unique trait from section (1) and the most liked aspect from section (3). The summary should be cohesive and coherent, encapsulating the essence of the feedback in a unified manner.

    The feedback can be multiple and given with format:
    [Message]^#^[Rating out of 5]
    
    the person name will be given last with format:
    person name: [Name of a person]
    
    response only with plain text with max word around 40 word that coherent and cohesive to the feedback but keep align with the template given above

    the person all is a motorcycle driver for Grab company, but please dont mention any company name even though it driver for Grab Company. just use that information as a context to generate the paragraph

    keep in mind to response with a fluent english, only with plain text without markdown symbol, and you can make more or less than 40 words but make it as close as possible to 40 words.
    
    Response should be plain text, around 40 words, coherent and cohesive to feedback, and align with the given template. The person is a motorcycle driver for a company (context only). Use fluent English, no company names, and no markdown symbols. Respond in plain text only.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction,
});

async function generateStory(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = {
  generateStory: generateStory,
};
