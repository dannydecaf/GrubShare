// Imports
import auth from '@react-native-firebase/auth';

// Function to register new user with email and password
export const registerUser = async (email, password) => {
  try {
    // Attempt to create new user account with email and password
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!'); // Log success message
    return userCredential.user; // Return newly created user object
  } catch (error) {
    // Handling errors during user registration
    let errorMessage = 'Something went wrong!'; // Default error message
    if (error.code === 'auth/email-already-in-use') { // Specific error handling for already used email
      errorMessage = 'That email address is already in use!';
    } else if (error.code === 'auth/invalid-email') { // Specific error handling for invalid email format
      errorMessage = 'That email address is invalid!';
    } else if (error.code === 'auth/weak-password') { // Specific error handling for weak password
      errorMessage = 'The password is too weak!';
    }
    throw new Error(errorMessage); // Throw error with the specific message
  }
};

// Function to log in existing user with email and password
export const loginUser = async (email, password) => {
  try {
    // Attempt to sign in the user with email and password
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in!'); // Log success message
    return userCredential.user; // Return logged-in user object
  } catch (error) {
    // Handling errors during login
    let errorMessage = 'Failed to sign in!'; // Default error message
    if (error.code === 'auth/user-not-found') { // Specific error handling for non-existent user
      errorMessage = 'No user found with this email address!';
    } else if (error.code === 'auth/wrong-password') { // Specific error handling for wrong password
      errorMessage = 'Incorrect password!';
    } else if (error.code === 'auth/invalid-email') { // Specific error handling for invalid email format
      errorMessage = 'That email address is invalid!';
    }
    throw new Error(errorMessage); // Throw error with the specific message
  }
};

// Function to log out current user
export const logoutUser = async () => {
  try {
    // Attempt to sign out current user
    await auth().signOut();
    console.log('User signed out!'); // Log success message
  } catch (error) {
    // Handling errors during logout
    console.error('Failed to sign out:', error); // Log error details
    throw new Error('Failed to sign out!'); // Throw an error with a message
  }
};
