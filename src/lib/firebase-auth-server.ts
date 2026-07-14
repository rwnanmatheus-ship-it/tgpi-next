type FirebaseAccount = {
  localId?: string;
  email?: string;
  emailVerified?: boolean;
};

type FirebaseLookupResponse = {
  users?: FirebaseAccount[];
  error?: {
    message?: string;
  };
};

export type VerifiedFirebaseUser = {
  uid: string;
  email: string;
  emailVerified: boolean;
};

function getBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") || "";

  if (!authorization.startsWith("Bearer ")) {
    throw new Error("Missing Firebase ID token.");
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    throw new Error("Missing Firebase ID token.");
  }

  return token;
}

export async function requireFirebaseUser(
  request: Request
): Promise<VerifiedFirebaseUser> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY.");
  }

  const idToken = getBearerToken(request);
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    }
  );

  const data = (await response.json()) as FirebaseLookupResponse;
  const account = data.users?.[0];

  if (!response.ok || !account?.localId) {
    throw new Error(data.error?.message || "Invalid Firebase ID token.");
  }

  return {
    uid: account.localId,
    email: account.email || "",
    emailVerified: Boolean(account.emailVerified),
  };
}
