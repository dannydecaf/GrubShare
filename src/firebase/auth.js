import auth from '@react-native-firebase/auth';

// Register new user
export const registerUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
    return userCredential.user;
  } catch (error) {
    let errorMessage = 'Something went wrong!';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'That email address is already in use!';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'That email address is invalid!';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'The password is too weak!';
    }
    throw new Error(errorMessage);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in!');
    return userCredential.user;
  } catch (error) {
    let errorMessage = 'Failed to sign in!';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email address!';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password!';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'That email address is invalid!';
    }
    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error('Failed to sign out:', error);
    throw new Error('Failed to sign out!');
  }
};
