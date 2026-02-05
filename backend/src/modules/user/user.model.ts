import { Schema, model } from "mongoose";
import { ROLES } from "../../constants/roles"

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },

    // để auth dùng (user tạo từ CRUD có thể chưa có password)
    passwordHash: { type: String, default: null },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
