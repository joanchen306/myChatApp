var mongoose = require('mongoose');

var Chat = new mongoose.Schema({
  name: String,
  chat: String,
  sent_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', Chat);