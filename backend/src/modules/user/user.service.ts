import { isValidObjectId } from "mongoose";
import { UserModel } from "./user.model";

export const userService = {
  async list() {
    return UserModel.find().sort({ createdAt: -1 }).select("-passwordHash").lean();
  },

  async getById(id: string) {
    if (!isValidObjectId(id)) return null;
    return UserModel.findById(id).select("-passwordHash").lean();
  },

  async create(data: { name: string; email: string }) {
    const doc = await UserModel.create(data);
    const obj = doc.toObject();
    delete (obj as any).passwordHash;
    return obj;
  },

  async update(id: string, data: Partial<{ name: string; email: string }>) {
    if (!isValidObjectId(id)) return null;
    return UserModel.findByIdAndUpdate(id, data, { new: true })
      .select("-passwordHash")
      .lean();
  },

  async remove(id: string) {
    if (!isValidObjectId(id)) return false;
    const deleted = await UserModel.findByIdAndDelete(id).lean();
    return !!deleted;
  },
};
