import { db } from '../firebase';

export const fetchUsers = async (): Promise<User[]> => {
  const collection = await db.collection('users').get();
  let users: User[] = [];
  
  collection.forEach(doc => {
    const { displayName, email } = doc.data();

    const user: User = {
      uid: doc.id,
      displayName,
      email
    };


    users.push(user);
  });

  return users;
};
