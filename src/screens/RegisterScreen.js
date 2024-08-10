import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme'; // Import the styles from the theme

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        // Registration logic to be included here after Firebase is brought in
        // On successful registration, navigate to HomeScreen
        navigation.navigate('Home');
    };

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }]}>Register</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginBottom: 12, backgroundColor: '#fff' }]}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginBottom: 12, backgroundColor: '#fff' }]}
            />
            <TouchableOpacity style={{ padding: 16, backgroundColor: '#fff', borderRadius: 4, alignItems: 'center' }} onPress={handleRegister}>
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>Register</Text>
            </TouchableOpacity>
            {error ? <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</Text> : null}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.text, { textAlign: 'center', marginTop: 16 }]}>Already have an account? Login here</Text>
            </TouchableOpacity>
        </View>
    );
}
