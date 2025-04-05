// /models/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // facultatif pour OAuth
  role: {
    type: String,
    enum: ['user', 'manager', 'admin'],
    default: 'user'
  },
  googleId: { type: String, unique: true, sparse: true },
  microsoftId: { type: String, unique: true, sparse: true },
  linkedinId: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now }
})

// Hashage du mot de passe si présent
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Vérification du mot de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)
