// This file contains shared configuration that doesn't need "use server"
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

export function getDefaultPassword() {
  return "Kcic@34";
}
