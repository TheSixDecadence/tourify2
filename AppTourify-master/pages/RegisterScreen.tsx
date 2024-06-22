import React, { useRef, useState } from 'react';
import { Image, Dimensions, ImageBackground, Animated, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const RegisterScreen = ({ navigation }) => {

  //Constantes que uso principalmente para controlar las validaciones
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmVerify, setPasswordConfirmVerify] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  //Animaciones
  const scaleAnim = useRef(new Animated.Value(1)).current;

  //Funciones de validaciones
  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);
    setNameError('');

    const regex = /\d/;
    if (regex.test(nameVar)) {
      setNameError('El nombre contiene números.');
    } else if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVar)) {
      setEmailError('El correo no es válido.');
    } else if (emailVar.length > 1) {
      setEmailVerify(true);
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    setPasswordError('');

    if (passwordVar.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else if (passwordVar.length > 1) {
      setPasswordVerify(true);
    }
  }

  const handlePasswordConfirm = (e) => {
    const passwordConfirmVar = e.nativeEvent.text;
    setPasswordConfirm(passwordConfirmVar);
    setPasswordConfirmVerify(false);
    setPasswordConfirmError('');

    if (passwordConfirmVar !== password) {
      setPasswordConfirmError('Las contraseñas no coinciden.');
    } else if (passwordConfirmVar.length > 1) {
      setPasswordConfirmVerify(true);
    }
  }

  //Funcion para validar el formulario
  const isFormValid = () => {
    return nameVerify && emailVerify && passwordVerify && passwordConfirmVerify && !nameError && !emailError && !passwordError && !passwordConfirmError;
  }

  //Funciones de animaciones
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

  //Renderizado
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <Text style={styles.labelTitle}>TOURIFY</Text>
        
        <Text style={styles.label}>Ingresa tu nombre:</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
            placeholderTextColor="#B0B0B0"
            onChange={handleName}
          />
          {name.length >= 1 && !nameError && (
            <MaterialIcons 
              name="check-circle" 
              size={20} 
              color="green" 
              style={styles.icon} 
            />
          )}
          {nameError && (
            <MaterialIcons 
              name="error" 
              size={20} 
              color="red" 
              style={styles.icon} 
            />
          )}
        </View>
        {nameError && (
          <Text style={styles.errorText}>{nameError}</Text>
        )}

        <Text style={styles.label}>Ingresa tu correo:</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Correo" 
            placeholderTextColor="#B0B0B0"
            onChange={handleEmail}
          />
          {email.length >= 1 && !emailError && (
            <MaterialIcons
              name="check-circle"
              size={20}
              color="green"
              style={styles.icon}
            />
          )}
          {emailError && (
            <MaterialIcons
              name="error"
              size={20}
              color="red"
              style={styles.icon}
            />
          )}
        </View>
        {emailError && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <Text style={styles.label}>Ingresa tu contraseña:</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            placeholderTextColor="#B0B0B0" 
            secureTextEntry 
            onChange={handlePassword}
          />
          {password.length >= 1 && !passwordError && (
            <MaterialIcons
              name="check-circle"
              size={20}
              color="green"
              style={styles.icon}
            />
          )}
          {passwordError && (
            <MaterialIcons
              name="error"
              size={20}
              color="red"
              style={styles.icon}
            />
          )}
        </View>
        {passwordError && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <Text style={styles.label}>Repite tu contraseña:</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña repetida" 
            placeholderTextColor="#B0B0B0" 
            secureTextEntry 
            onChange={handlePasswordConfirm}
          />
          {passwordConfirm.length >= 1 && !passwordConfirmError && (
            <MaterialIcons
              name="check-circle"
              size={20}
              color="green"
              style={styles.icon}
            />
          )}
          {passwordConfirmError && (
            <MaterialIcons
              name="error"
              size={20}
              color="red"
              style={styles.icon}
            />
          )}
        </View>
        {passwordConfirmError && (
          <Text style={styles.errorText}>{passwordConfirmError}</Text>
        )}
        
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.buttonContainer}
          disabled={!isFormValid()}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.buttonContainer}
        >
          <Animated.View style={[styles.buttonSecondary, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.buttonTextSecondary}>¿Ya tienes una cuenta?</Text>
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
  logoContainer: {
    alignItems: 'center',
    top: 120
  },
  logo: {
    width: width * 0.3,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: '#E0E1DD',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: -200
  },
  labelTitle: {
    color: '#1B263B',
    fontWeight: 'bold',
    fontSize: 24,
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
    marginBottom: 5,
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
    textAlign: 'center',
  },
  buttonTextSecondary: {
    color: '#E0E1DD',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    marginLeft: 20,
    color: 'red',
    bottom: 10,
  }
});

export default RegisterScreen;

