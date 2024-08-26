import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme'; // Import the styles from the theme
import { loginUser } from '../firebase/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            navigation.navigate('Home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }]}>Login</Text>
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
            {error ? <Text style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</Text> : null}
            <TouchableOpacity style={{ padding: 16, backgroundColor: '#fff', borderRadius: 4, alignItems: 'center' }} onPress={handleLogin}>
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.text, { textAlign: 'center', marginTop: 16 }]}>Don't have an account? Register here</Text>
            </TouchableOpacity>
        </View>
    );
}
