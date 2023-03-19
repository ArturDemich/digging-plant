import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getDigStorages, getStep } from '../state/dataThunk'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2f5f8',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginBottom: 100,
        marginTop: 15,
    },
    button: {
        marginTop: 15,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "green",
        fontSize: 35,
        fontWeight: "500",
        minWidth: "63%",
        minHeight: "11%",
        textAlignVertical: 'center',
        color: 'white',
        elevation: 20,
        shadowColor: '#302f30',
    }
})

const TOKEN_FOR_DRIVER = '85BB86DA0A80D47B39780CDBA04B6BD1'
const TOKEN_FOR_DIGER_B = '6F577D523246AF2DC71555986A32786E'
const TOKEN_FOR_DIGER_P = 'B8E57417FE0FAACEAC9FB0B6F3DD1D33'

function MainScreen({ navigation, digStorages }) {
    const dispatch = useDispatch()

    useEffect(() => {
        digStorages.length == 1 ?
            checkState(TOKEN_FOR_DIGER_P) :
            checkState(TOKEN_FOR_DRIVER)
    }, [digStorages])
    console.log('main', digStorages)

    const checkState = (token, stepsId, title) => {
        if (digStorages.length == 1) {
            navigation.navigate('Поле', {
                title: digStorages[0].name,
                token: token,
                storageId: digStorages[0].id
            })
            dispatch(getStep(token))
        } else if (digStorages.length > 1) {
            navigation.navigate('Всі поля', {
                title: 'Загрузка',
                token: token
            })
            dispatch(getStep(token))
        }
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity  >
                <Text style={styles.button} title='Викопка' onPress={() => dispatch(getDigStorages(TOKEN_FOR_DIGER_P))}>
                    Викопка
                </Text>
                <Text style={styles.button} title='Загрузка' onPress={() => dispatch(getDigStorages(TOKEN_FOR_DRIVER))}>
                    Загрузка
                </Text>

            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    digStorages: state.digStorages
})

export default connect(mapStateToProps)(MainScreen)

