"use server";

import bcrypt from "bcrypt";

export const DEFAULT_PASSWORD = "Kcic@34";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
