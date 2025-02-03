"use server";

import bcrypt from "bcrypt";
import { getDefaultPassword } from "../utils/password-config";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function getServerDefaultPassword() {
  return getDefaultPassword();
}
