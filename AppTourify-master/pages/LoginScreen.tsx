import React, { useRef, useState } from 'react';
import { Animated, TextInput, Text, View, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';
import useAuth from '../hooks/useAuth';

const { width, height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading } = useAuth();
    const handleLogin = async () => {
        await login(email, password);
    };

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ImageBackground style={styles.background}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <View style={styles.container}>
                <Text style={styles.labelTitle}>TOURIFY</Text>
                <Text style={styles.label}>Ingresa tu correo:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Correo" 
                    placeholderTextColor="#B0B0B0"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Ingresa tu contraseña:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Contraseña" 
                    placeholderTextColor="#B0B0B0"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handleLogin}
                    style={styles.buttonContainer}
                >
                    <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
                        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Register')
                    }}
                    style={styles.buttonContainer}
                >
                    <Animated.View style={[styles.buttonSecondary, { transform: [{ scale: scaleAnim }] }]}>
                        <Text style={styles.buttonText}>¿Todavía no tienes una cuenta?</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#0D1B2A',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    logo: {
        width: width * 0.3,
        height: height * 0.2,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    container: {
        backgroundColor: '#E0E1DD',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    labelTitle: {
        color: '#1B263B',
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1B263B',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    input: {
        height: 40,
        borderColor: '#415A77',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        color: '#1B263B',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1B263B',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#203e4a',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#E0E1DD',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;

