import mongoose from 'mongoose';

const ComplianceSchema = new mongoose.Schema({
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
  level: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String, // Utilise String au lieu de Number pour éviter le NaN
    required: false,
    default: "Not Implemented"
  },
  comment: {
    type: String, // Utilise String pour permettre des commentaires textuels
    required: false
  }
}, { timestamps: true });

const Compliance = mongoose.model('Compliance', ComplianceSchema);
export default Compliance;
