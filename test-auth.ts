import { signUpUser } from './src/lib/actions/auth';
import prisma from './src/lib/prisma';

async function test() {
  const formData = new FormData();
  formData.append('name', 'Digester Test');
  formData.append('email', 'test2@test.com');
  formData.append('password', 'password123');

  try {
    const res = await signUpUser(undefined, formData);
    console.log("Result:", res);
  } catch (error) {
    console.error("Test Caught Error:", error);
  }
}

test();
