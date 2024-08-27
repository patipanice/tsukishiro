import { User } from "firebase/auth";
import { FieldValue } from "firebase/firestore";

interface CommentForm {
  id: string;
  message: string;
  isAnonymous: boolean;
  user: Pick<User, "email" | "uid" | 'photoURL' | 'displayName'> | null
  createdAt: FieldValue;
}

export type { CommentForm };
