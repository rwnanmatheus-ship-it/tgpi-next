import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./firebase";

const storage = getStorage();

export async function uploadAvatar(file: File, uid: string) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User not authenticated.");
  }

  const storageRef = ref(storage, `avatars/${uid}`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
}