import mongoose from 'mongoose'

export const DEFAULT_MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase(mongoUrl: string = DEFAULT_MONGO_URL) {
  await mongoose.connect(mongoUrl)
  console.log('MongoDB connected to', mongoUrl)
  return mongoose.connection
}

export default connectDatabase
