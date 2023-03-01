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


function MainScreen({ navigation, dataArray }) {

    return (

        <View style={styles.container}>
            <TouchableOpacity  >
                <Text style={styles.button} title='Викопка' onPress={() => {
                    navigation.navigate('Викопка', { title: 'Викопка' })

                }}>
                    Викопка
                </Text>
                <Text style={styles.button} title='Загрузка' onPress={() => {
                    navigation.navigate('Загрузка', { title: 'Загрузка' })

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

