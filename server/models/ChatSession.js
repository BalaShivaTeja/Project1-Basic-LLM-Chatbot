import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant']
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  messages: [messageSchema],
  title: {
    type: String,
    default: 'New Chat',
    maxlength: 100
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
chatSessionSchema.index({ userId: 1, createdAt: -1 });
chatSessionSchema.index({ userId: 1, isActive: 1 });

// Method to populate user data
chatSessionSchema.methods.populateUser = function() {
  return this.populate('userId', 'username email');
};

// Static method to get user sessions
chatSessionSchema.statics.getUserSessions = function(userId, { page = 1, limit = 10 } = {}) {
  return this.find({ userId, isActive: true })
    .sort({ updatedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select('title messages createdAt updatedAt');
};

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);

export default ChatSession;
