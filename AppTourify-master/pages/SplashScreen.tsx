import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Image, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Configurar la animación de rotación
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 2,
                duration: 5000, // Duración de un giro completo (en milisegundos)
                useNativeDriver: true,
            })
        );

        // Iniciar la animación de rotación
        spinAnimation.start();

        // Cambiar a la pantalla principal después de 3 segundos
        setTimeout(() => {
            spinAnimation.stop();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], 
            });
        }, 3000);
    }, [navigation, spinValue]);

    // Interpolación para girar 360 grados
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.background}>
            <Animated.Image 
                source={require('../assets/logo.png')} // Cambia el path a tu imagen de logo
                style={[styles.logo, { transform: [{ rotate: spin }] }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    logo: {
        width: width * 0.4,
        height: height * 0.4,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
