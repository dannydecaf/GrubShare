import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Register with:", email, password);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-addresses"
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
