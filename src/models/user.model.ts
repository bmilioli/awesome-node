import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rememberToken: string;
  active: boolean;
  picture: string;
  confirmCode: string;
}

const UserSchema = new Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    rememberToken: { type: String },
    active: { type: Boolean, default: false },
    picture: { type: String },
    confirmCode: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('user', UserSchema);
