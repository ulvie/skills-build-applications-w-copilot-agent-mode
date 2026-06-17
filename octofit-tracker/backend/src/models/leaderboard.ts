import mongoose, { Schema, Document } from 'mongoose'

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId
  score: number
  rank?: number
  updatedAt: Date
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number },
  updatedAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema)
