const OpenAI = require('openai');

let _openai = null;
const getClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set.');
  }
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
};

const getChatResponse = async (userMessage) => {
  const openai = getClient();
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    if (error.status === 429) {
      throw new Error('Rate limit reached. Please try again later.');
    }
    throw new Error(`OpenAI API error: ${error.message}`);
  }
};

module.exports = { getChatResponse };
