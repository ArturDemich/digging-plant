import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, TextInput } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getDigStorages, getStep, getTokenThunk } from '../state/dataThunk'


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

function LoginScreen({ navigation, digStorages, token }) {
    console.log(token, digStorages)
    const dispatch = useDispatch()
    const [login, onChangeText] = useState('')
    const [password, onChangeNumber] = useState('')

    useEffect(() => {
        token.length === 1 && digStorages.length === 0 ? callData() : null
        digStorages.length > 0 ? checkStorages() : null
    }, [token, digStorages])

    const callData = () => {
        dispatch(getDigStorages(token[0].token))
        dispatch(getStep(token[0].token))
    }

    const checkStorages = () => {
        if (digStorages.length == 1) {
            navigation.navigate('Поле', {
                title: digStorages[0].name,
                token: token[0].token,
                storageId: digStorages[0].id
            })

        } else if (digStorages.length > 1) {
            navigation.navigate('Всі поля', {
                title: 'Загрузка',
                token: token[0].token
            })

        }
    }

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

const mapStateToProps = (state) => ({
    digStorages: state.digStorages,
    token: state.token
})

export default connect(mapStateToProps)(LoginScreen)

