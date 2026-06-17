import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() }
});
export default mongoose.model('Team', TeamSchema);
