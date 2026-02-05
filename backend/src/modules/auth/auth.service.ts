import bcrypt from "bcrypt";
import { UserModel } from "../user/user.model";
import { signAccessToken } from "./jwt";
import { ROLES } from "../../constants/roles";

export const authService = {
  async register(input: { name: string; email: string; password: string }) {
    const existed = await UserModel.findOne({ email: input.email }).lean();
    if (existed) {
      const err: any = new Error("Email already exists");
      err.statusCode = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const doc = await UserModel.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: ROLES.USER,
    });

    const accessToken = signAccessToken({
      sub: String(doc._id),
      email: doc.email,
      role: doc.role,
    });

    return {
      accessToken,
      user: {
        id: String(doc._id),
        name: doc.name,
        email: doc.email,
        role: doc.role,
      },
    };
  },

  async login(input: { email: string; password: string }) {
    const user = await UserModel.findOne({ email: input.email });
    if (!user || !user.passwordHash) {
      const err: any = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) {
      const err: any = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const accessToken = signAccessToken({
      sub: String(user._id),
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
