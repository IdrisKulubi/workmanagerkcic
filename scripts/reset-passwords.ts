import db from '../db/drizzle';
import { users } from '../db/schema';
import bcrypt from "bcrypt";
import { loadEnvConfig } from '@next/env';

// Load environment variables
loadEnvConfig(process.cwd());

async function resetAllPasswords() {
  try {
    console.log('Starting password reset process...');
    console.log('Database URL:', process.env.POSTGRES_URL ? 'Found' : 'Missing');
    
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD || 'Kcic@34', 10);
    console.log('Generated hashed password');
    
    await db
      .update(users)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date(),
        passwordLastChanged: new Date()
      });
    
    console.log('All passwords have been reset successfully');
  } catch (error) {
    console.error('Error resetting passwords:', error);
  } finally {
    process.exit();
  }
}

// Execute the function
console.log('Script started');
resetAllPasswords()
  .catch(error => {
    console.error('Failed to reset passwords:', error);
    process.exit(1);
  }); 