import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  sub_category: {
    type: String,
    required: true
  },
  control_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  file_url: {
    type: String,
    required: true
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Document = mongoose.model('Document', DocumentSchema);
export default Document;
