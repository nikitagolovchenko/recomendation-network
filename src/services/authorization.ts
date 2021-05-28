import { auth } from '../firebase';
import { db } from '../firebase';

export const authSignUp = async ({
  email,
  password,
  firstName,
  lastName,
}: UserInputs) => {
  const userCredential = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  let user = userCredential.user;
  let currentUser = auth.currentUser;

  currentUser?.updateProfile({
    displayName: `${firstName} ${lastName}`,
  });

  db.collection('users')
    .doc(user?.uid)
    .set({
      displayName: `${firstName} ${lastName}`,
      email: user?.email,
    });

  return {
    email: user?.email,
    displayName: `${firstName} ${lastName}`,
    uid: user?.uid,
  };
};

export const authSignIn = async ({ email, password }: UserLogin) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  let user = userCredential.user;

  return {
    email: user?.email,
    displayName: user?.displayName,
    uid: user?.uid,
  };
};

export const authSignOut = async () => {
  return auth.signOut();
};
