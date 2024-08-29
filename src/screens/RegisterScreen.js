// Imports
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import { registerUser } from '../firebase/auth';

export default function RegisterScreen() { // Main component for register screen
    const [email, setEmail] = useState(''); // State to store email input
    const [password, setPassword] = useState(''); // State to store password input
    const [error, setError] = useState(''); // State to store error messages
    const navigation = useNavigation(); // Hook to access navigation object for screen transitions

    // Function to handle the registration action
    const handleRegister = async () => {
        try {
            await registerUser(email, password); // Attempts to register the user with provided email and password
            navigation.navigate('Home'); // Navigates to the Home screen on successful registration
        } catch (err) {
            setError(err.message); // Sets the error state with the error message if registration fails
        }
    };

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }]}>Register</Text> {/* Screen title */}
            <TextInput
                value={email} // Email input value
                onChangeText={setEmail} // Updates email state when text changes
                keyboardType="email-address" // Keyboard type optimized for email input
                autoCapitalize="none" // Disables auto-capitalization for email input
                placeholder="Email" // Placeholder text
                placeholderTextColor="#9ca3af" // Placeholder text color
                style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginBottom: 12, backgroundColor: '#fff' }]}
            />
            <TextInput
                value={password} // Password input value
                onChangeText={setPassword} // Updates password state when text changes
                secureTextEntry // Hides the text input for passwords
                placeholder="Password" // Placeholder text
                placeholderTextColor="#9ca3af" // Placeholder text color
                style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginBottom: 12, backgroundColor: '#fff' }]} 
            />
            <TouchableOpacity style={{ padding: 16, backgroundColor: '#fff', borderRadius: 4, alignItems: 'center' }} onPress={handleRegister}> {/* Register button */}
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>Register</Text> {/* Button text */}
            </TouchableOpacity>
            {error ? <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</Text> : null}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}> {/* Navigation to the Login screen */}
                <Text style={[styles.text, { textAlign: 'center', marginTop: 16 }]}>Already have an account? Login here</Text> {/* Link to the login screen */}
            </TouchableOpacity>
        </View>
    );
}
