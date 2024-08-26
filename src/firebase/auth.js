import auth from '@react-native-firebase/auth';

// Register new user
export const registerUser = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  }
};

// Sign in a user
export const loginUser = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in!');
  } catch (error) {
    console.error(error);
  }
};

// Sign out a user
export const logoutUser = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error(error);
  }
};
