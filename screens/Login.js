import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, TextInput } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getTokenThunk } from '../state/dataThunk'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2f5f8',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        color: 'white',
        fontWeight: "500",
    },
    button: {
        marginTop: 3,
        borderRadius: 5,
        backgroundColor: "#45aa45",
        width: 140,
        minHeight: 45,
        elevation: 5,
        display: "flex",
        justifyContent: "center",
    },
    input: {
        height: 40,
        width: 210,
        margin: 12,
        padding: 10,
        backgroundColor: "white",
        elevation: 1,
        borderRadius: 3,
    },
    containerView: {
        alignItems: "center",
        backgroundColor: "#dbdcdd",
        borderRadius: 7,
        padding: 15,
        elevation: 10,
    }
})

const TOKEN_FOR_DRIVER = '85BB86DA0A80D47B39780CDBA04B6BD1'
const TOKEN_FOR_DIGER_B = '6F577D523246AF2DC71555986A32786E'
const TOKEN_FOR_DIGER_P = 'B8E57417FE0FAACEAC9FB0B6F3DD1D33'

function LoginScreen() {
    const dispatch = useDispatch()
    const [login, onChangeText] = useState('')
    const [password, onChangeNumber] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={login}
                    placeholder="Введіть користувача"
                    inputMode='text'

                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={password}
                    placeholder="Введіть пароль"
                    secureTextEntry={true}

                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => dispatch(getTokenThunk(login, password))}
                >
                    <Text style={styles.text}> Увійти </Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
};



export default LoginScreen

