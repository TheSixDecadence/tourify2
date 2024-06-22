import React, { useRef } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import NavBar from '../components/navbar';
import TitleButton from '../components/titlebutton'; // Asegúrate de que el componente está exportado correctamente
// Importa las imágenes locales
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const MainMenu = ({ navigation }) => {

    const width = Dimensions.get('window').width;

    // Array de importaciones de imágenes locales
    const imagePaths = [
        image1,
        image2,
        image3,
    ];

    // La animación del botón
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
        <View style={styles.background}>
            <TitleButton/>
            <View style={styles.content}>
                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    autoPlayInterval={3000} // Cambia las imágenes cada 3 segundos
                    data={imagePaths}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItem}>
                            <Image source={item} style={styles.carouselImage} />
                        </View>
                    )}
                />
                <Text style={styles.Phrase}>"Descubre la magia de cada destino."</Text>
                <Text style={styles.Text}>Explora lo inexplorado, experimenta lo extraordinario y deja que tus viajes se conviertan en el lienzo de tu historia única</Text>            
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={styles.buttonContainer}
                >
                    <Animated.View style={[styles.buttonStart, { transform: [{ scale: scaleAnim }] }]}>
                        <Text style={styles.buttonText}>Explorar ahora →</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <NavBar/>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'repeat',
        backgroundColor: '#0D1B2A',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120, 
    },
    carouselItem: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    Phrase: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 200, 
    },
    Text: {
        color: "gray",
        fontSize: 20,
        textAlign: "center",
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
    },
    buttonStart: {
        backgroundColor: '#203e4a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default MainMenu;