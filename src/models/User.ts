import mongoose from 'mongoose';

import { UserBase } from '../types';

const UserSchema = new mongoose.Schema<UserBase>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<UserBase>('user', UserSchema);
