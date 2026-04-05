import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const sendChatCompletion = async (messages, options = {}) => {
  const {
    model = 'gpt-3.5-turbo',
    temperature = 0.7,
    maxTokens = 1000,
    retries = MAX_RETRIES
  } = options;

  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      });

      return {
        success: true,
        message: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      lastError = error;
      console.error(`OpenAI API error (attempt ${i + 1}/${retries}):`, error.message);

      // Don't retry on certain errors
      if (error.status === 401 || error.status === 403) {
        throw new Error('Invalid API key');
      }

      // Rate limiting - wait before retry
      if (error.status === 429) {
        await sleep(RETRY_DELAY * (i + 1));
        continue;
      }

      // If not last retry, wait and continue
      if (i < retries - 1) {
        await sleep(RETRY_DELAY);
        continue;
      }
    }
  }

  throw new Error(`Failed to get response from OpenAI: ${lastError.message}`);
};

export const formatMessagesForAPI = (sessionMessages) => {
  return sessionMessages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

export default { sendChatCompletion, formatMessagesForAPI };
