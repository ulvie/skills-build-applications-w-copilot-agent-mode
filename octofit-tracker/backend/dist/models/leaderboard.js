import mongoose, { Schema } from 'mongoose';
const LeaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number },
    updatedAt: { type: Date, default: () => new Date() }
});
export default mongoose.model('Leaderboard', LeaderboardSchema);
