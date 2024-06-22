import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

const titlebutton = () => {
    return (
        <TouchableOpacity>
            <View style={styles.containter}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}> Tourify</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containter: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        padding: 20,
        position: 'absolute', 
        top: 20, 
    },
    title: {
        fontSize: 30,
        color: '#fff',
        flex: 1,
        textAlign: 'left',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'center',
    },
});

export default titlebutton;
