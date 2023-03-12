import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setCurrentFild } from '../state/dataSlice'
//import { filterOrders } from '../state/actions'
import { filterOrders, getDataFromEndpoint } from '../state/dataThunk'


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


function MainScreen({ navigation, dataArray, route }) {

    return (

        <View style={styles.container}>
            <TouchableOpacity  >
                <Text style={styles.button} title='Викопка' onPress={() => {
                    navigation.navigate('Всі поля', {
                        title: 'Викопка', steps: {
                            needDig: "80b807a8-aed1-11ed-836a-00c12700489e",
                            digStart: "80b807a4-aed1-11ed-836a-00c12700489e"
                        }
                    })

                }}>
                    Викопка
                </Text>
                <Text style={styles.button} title='Загрузка' onPress={() => {
                    navigation.navigate('Всі поля', {
                        title: 'Загрузка', steps: {
                            digEnd: "80b807a6-aed1-11ed-836a-00c12700489e",
                            takenOn: "80b807a5-aed1-11ed-836a-00c12700489e"
                        }
                    })

                }}>
                    Загрузка
                </Text>

            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    dataArray: state.data
})

export default connect(mapStateToProps)(MainScreen)

