import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const NavBar = () => {
    return (
        <View style={styles.navbarContainer}>
            <View style={styles.navbar}>
                {Array(5).fill(null).map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.navButton,
                            index === 2 && styles.navButtonCenter, // Botón central más grande
                        ]}
                    >
                        {/* Puedes agregar íconos o texto dentro de los botones aquí */}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        height: '6%',
        width: '100%',
        backgroundColor: '#1A2B3C',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    navButton: {
        width: 60,
        height: 60,
        borderRadius: 30, 
        backgroundColor: 'white',
        borderWidth: 7,
        borderColor: '#1A2B3C',
        justifyContent: 'center',
        alignItems: 'center',
        top: -50,
    },
    navButtonCenter: {
        width: 80, 
        height: 80,
        borderRadius: 45,
    },
});

export default NavBar;