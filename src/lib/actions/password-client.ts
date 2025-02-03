"use client";

import { hashPasswordAction, verifyPasswordAction } from "./password-actions";

export async function handlePasswordHash(password: string) {
  return hashPasswordAction(password);
}

export async function handlePasswordVerify(
  password: string,
  hashedPassword: string
) {
  return verifyPasswordAction(password, hashedPassword);
}
