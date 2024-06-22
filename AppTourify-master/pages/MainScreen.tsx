import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';

const MainMenuScreen = ({ navigation, route }) => {
    const { user, logout } = useAuth();

    // Mostrar en consola información del usuario
    console.log(user);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>¡Bienvenido, {user?.name || 'Usuario'}!</Text>
                <Text style={styles.userInfo}>Correo electrónico: {user?.email || 'No disponible'}</Text>
            </View>
            <Button title="Cerrar sesión" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a2f6c',
        padding: 20,
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#0a2f6c',
    },
    userInfo: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
});

export default MainMenuScreen;
