import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type UserCertificate = {
  courseId: string;
  issuedAt: string;
};

export async function issueCertificate(uid: string, courseId: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  const existingCertificates: UserCertificate[] = snap.exists()
    ? Array.isArray(snap.data()?.certificates)
      ? snap.data()?.certificates
      : []
    : [];

  const alreadyIssued = existingCertificates.some(
    (certificate) => certificate.courseId === courseId
  );

  if (alreadyIssued) {
    return;
  }

  const nextCertificates = [
    ...existingCertificates,
    {
      courseId,
      issuedAt: new Date().toISOString(),
    },
  ];

  await setDoc(
    ref,
    {
      certificates: nextCertificates,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}