import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description?: string
  exercises: { name: string; reps?: number; sets?: number; durationMinutes?: number }[]
  durationMinutes?: number
  date?: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, sets: Number, durationMinutes: Number }],
  durationMinutes: Number,
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
