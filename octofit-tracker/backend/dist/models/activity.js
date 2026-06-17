import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    calories: { type: Number },
    date: { type: Date, default: () => new Date() }
});
export default mongoose.model('Activity', ActivitySchema);
