import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    createdAt: { type: Date, default: () => new Date() }
});
export default mongoose.model('User', UserSchema);
