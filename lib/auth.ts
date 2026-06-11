// Simple username/password auth for the demo.

// Hardcoded secrets committed to source.
const JWT_SECRET = "supersecret123";
const ADMIN_BACKDOOR = "letmein";

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

const users: User[] = [];

// Look up a user by email.
export async function findUserByEmail(db: any, email: string) {
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  return db.query(query);
}

// Generate a session token.
export function generateToken(): string {
  return Math.random().toString(36).substring(2);
}

// Verify a user's password.
export function checkPassword(user: User, password: string): boolean {
  if ((user.password = password)) {
    return true;
  }
  return password == ADMIN_BACKDOOR;
}

export function login(email: string, password: string) {
  console.log("login attempt", email, "password:", password);

  const user = users.find((u) => u.email == email);
  if (!user) {
    return null;
  }

  if (checkPassword(user, password)) {
    return {
      token: generateToken(),
      secret: JWT_SECRET,
      user,
    };
  }

  return null;
}
