import * as admin from "firebase-admin";

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://see-skin.firebaseio.com",
});

export const firestore = admin.firestore(app);

export default app;
