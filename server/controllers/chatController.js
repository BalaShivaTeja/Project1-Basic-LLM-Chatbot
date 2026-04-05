import ChatSession from '../models/ChatSession.js';
import { sendChatCompletion, formatMessagesForAPI } from '../services/openaiService.js';

export const sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user.userId;

    let session;

    // Find or create session
    if (sessionId) {
      session = await ChatSession.findOne({ _id: sessionId, userId, isActive: true });
      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Session not found'
        });
      }
    } else {
      // Create new session
      session = new ChatSession({
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        messages: []
      });
    }

    // Add user message
    session.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Prepare messages for OpenAI (limit context to last 10 messages)
    const contextMessages = session.messages.slice(-10);
    const apiMessages = formatMessagesForAPI(contextMessages);

    // Get AI response
    const aiResponse = await sendChatCompletion(apiMessages);

    // Add AI response to session
    session.messages.push({
      role: 'assistant',
      content: aiResponse.message,
      timestamp: new Date()
    });

    await session.save();

    res.json({
      success: true,
      response: aiResponse.message,
      sessionId: session._id,
      usage: aiResponse.usage
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing chat message'
    });
  }
};

export const getSessions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const sessions = await ChatSession.getUserSessions(userId, { page, limit });

    // Add last message preview to each session
    const sessionsWithPreview = sessions.map(session => ({
      _id: session._id,
      title: session.title,
      lastMessage: session.messages.length > 0
        ? session.messages[session.messages.length - 1].content.substring(0, 100)
        : '',
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    }));

    res.json({
      success: true,
      sessions: sessionsWithPreview,
      page,
      limit
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat sessions'
    });
  }
};

export const getSessionHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    const session = await ChatSession.findOne({
      _id: sessionId,
      userId,
      isActive: true
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      session: {
        _id: session._id,
        title: session.title,
        messages: session.messages,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt
      }
    });
  } catch (error) {
    console.error('Get session history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching session history'
    });
  }
};

export const createSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title } = req.body;

    const session = new ChatSession({
      userId,
      title: title || 'New Chat',
      messages: []
    });

    await session.save();

    res.status(201).json({
      success: true,
      session: {
        _id: session._id,
        title: session.title,
        createdAt: session.createdAt
      }
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating chat session'
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    const session = await ChatSession.findOne({ _id: sessionId, userId });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Soft delete
    session.isActive = false;
    await session.save();

    res.json({
      success: true,
      message: 'Session deleted successfully'
    });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting session'
    });
  }
};

export default { sendMessage, getSessions, getSessionHistory, createSession, deleteSession };
