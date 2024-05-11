const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  body: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  state: { type: String, enum: ['draft', 'published'], default: 'draft' },
  readCount: { type: Number, default: 0 },
  readingTime: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
