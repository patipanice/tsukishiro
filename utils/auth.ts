import { auth, signInAnonymously } from "../config/firebase";

export async function authenticateAnonymously() {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log('User signed in anonymously:', user.uid);
    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}