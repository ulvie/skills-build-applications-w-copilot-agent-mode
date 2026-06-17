import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    exercises: [{ name: String, reps: Number, sets: Number, durationMinutes: Number }],
    durationMinutes: Number,
    date: { type: Date, default: () => new Date() }
});
export default mongoose.model('Workout', WorkoutSchema);
