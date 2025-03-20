"use server";

import bcrypt from "bcrypt";
import { DEFAULT_PASSWORD } from "../constants";

// Instead of re-exporting the constant directly, provide it through an async function
export async function getDefaultPassword() {
  return DEFAULT_PASSWORD;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
