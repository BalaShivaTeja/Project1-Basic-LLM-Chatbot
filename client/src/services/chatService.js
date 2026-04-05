import axios from 'axios';

const API_URL = '/api/chat';

export const sendMessage = async (message, sessionId) => {
  const response = await axios.post(API_URL, { message, sessionId });
  return response.data.reply;
};
