import mongoose from 'mongoose';

import { UserType } from '../types';

const UserSchema = new mongoose.Schema<UserType>({
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

export default mongoose.model<UserType>('user', UserSchema);
