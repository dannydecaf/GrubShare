// Imports
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import { loginUser } from '../firebase/auth';

export default function LoginScreen() { // Main component for login screen
    const [email, setEmail] = useState(''); // State to store email input
    const [password, setPassword] = useState(''); // State to store password input
    const [error, setError] = useState(''); // State to store error messages
    const navigation = useNavigation(); // Hook to access navigation object for screen transitions

    // Function to handle login
    const handleLogin = async () => {
        try {
            await loginUser(email, password); // Attempts to log in user with the provided email and password
            navigation.navigate('Home'); // Navigates to Home screen on successful login
        } catch (err) {
            setError(err.message); // Sets the error state with error message if login fails
        }
    };

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }]}>Login</Text> {/* Screen title */}
            <TextInput
                value={email} // Email input value
                onChangeText={setEmail} // Updates email state when text changes
                keyboardType="email-address" // Keyboard type optimized for email input
                autoCapitalize="none" // Disables auto-capitalization for email input
                placeholder="Email" // Placeholder text
                placeholderTextColor="#9ca3af"
                style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginBottom: 12, backgroundColor: '#fff' }]}
            />
            <TextInput
                value={password} // Password input value
                onChangeText={setPassword} // Updates password state when text changes
                secureTextEntry // Hides text input for passwords
                placeholder="Password" // Placeholder text
                placeholderTextColor="#9ca3af"
                style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginBottom: 12, backgroundColor: '#fff' }]} // Styling for password input
            />
            {error ? <Text style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</Text> : null} {/* Displays error message if there's an error */}
            <TouchableOpacity style={{ padding: 16, backgroundColor: '#fff', borderRadius: 4, alignItems: 'center' }} onPress={handleLogin}> {/* Login button */}
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>Login</Text> {/* Button text */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}> {/* Navigation to the Register screen */}
                <Text style={[styles.text, { textAlign: 'center', marginTop: 16 }]}>Don't have an account? Register here</Text> {/* Link to the registration screen */}
            </TouchableOpacity>
        </View>
    );
}
