import jwt, { type SignOptions } from "jsonwebtoken";
import { Role } from "../../constants/roles";

export type JwtPayload = { sub: string; email: string; role: Role };

function getAccessSecret() {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("Missing JWT_ACCESS_SECRET in .env");
  return secret;
}

export function signAccessToken(payload: JwtPayload) {
  const secret = getAccessSecret();
  const expiresIn = (process.env.JWT_ACCESS_EXPIRES || "15m") as SignOptions["expiresIn"];
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyAccessToken(token: string) {
  const secret = getAccessSecret();
  return jwt.verify(token, secret) as JwtPayload & jwt.JwtPayload;
}
