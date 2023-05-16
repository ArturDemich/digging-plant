import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, SafeAreaView, TextInput, ActivityIndicator } from 'react-native'
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
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        borderRadius: 3,
    },
    containerView: {
        alignItems: "center",
        backgroundColor: "#dbdcdd",
        borderRadius: 7,
        padding: 15,
        elevation: 10,
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})

function LoginScreen({ navigation, digStorages, token }) {
    const dispatch = useDispatch()
    const [login, onChangeLogin] = useState('')
    const [password, onChangePass] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        token.length === 1 && digStorages.length === 0 ? callData() : null
        digStorages.length > 0 ? checkStorages() : null
    }, [token, digStorages])

    const callData = async () => {
        await dispatch(getDigStorages(token[0].token))
        await dispatch(getStep(token[0].token))
        setLoading(false)
    }

    const checkStorages = () => {
        if (digStorages.length == 1) {
            navigation.navigate('Поле', {
                title: digStorages[0].name,
                token: token[0],
                storageId: digStorages[0].id
            })

        } else if (digStorages.length > 1) {
            navigation.navigate('Всі поля', {
                title: 'Загрузка',
                token: token[0]
            })

        }
    }

    const getToken = async () => {
        setLoading(true)
        onChangeLogin('')
        onChangePass('')
        await dispatch(getTokenThunk(login, password))        
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#45aa45" />
                </View> :
                <View style={styles.containerView}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLogin}
                    value={login}
                    placeholder="Введіть користувача"
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePass}
                    value={password}
                    placeholder="Введіть пароль"
                    secureTextEntry={true}
                    placeholderTextColor={'gray'}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => getToken()}
                >
                    <Text style={styles.text}> Увійти </Text>
                </TouchableHighlight>
            </View>}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    digStorages: state.digStorages,
    token: state.token
})

export default connect(mapStateToProps)(LoginScreen)

