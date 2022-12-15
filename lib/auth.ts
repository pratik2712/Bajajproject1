import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashpass = await hash(password, 12);
  return hashpass;
}

export async function verifyPassword(password: string, hashedpass: string) {
  const isvalid = await compare(password, hashedpass);
  return isvalid;
}
