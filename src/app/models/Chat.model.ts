import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the Chat document
interface IChat extends Document {
  command: string;
  response: string;
}

// Define the schema
const commandSchema: Schema<IChat> = new Schema(
  {
    command: { type: String, required: true, unique: true },
    response: { type: String, required: true },
  },
);

// Create the model or reuse the existing one
const Commands: Model<IChat> =
mongoose.models.Commands || mongoose.model<IChat>("Commands", commandSchema);

export default Commands;
