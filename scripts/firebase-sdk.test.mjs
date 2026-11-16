import assert from "node:assert/strict";
import test from "node:test";
import { deleteApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

test("Firebase products register against the same application instance", async () => {
  const app = initializeApp({
    apiKey: "synthetic-firebase-test-key",
    projectId: "tgpi-audit-test",
    storageBucket: "tgpi-audit-test.appspot.com",
  }, "tgpi-sdk-dependencies");

  try {
    assert.equal(getAuth(app).app, app);
    assert.equal(collection(getFirestore(app), "test").path, "test");
    assert.equal(ref(getStorage(app), "test.txt").fullPath, "test.txt");
  } finally {
    await deleteApp(app);
  }
});
