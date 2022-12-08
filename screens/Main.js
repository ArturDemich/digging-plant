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
        backgroundColor: '#f2f5f8'

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
        boxShadow: 'rgb(5 5 6 / 50%) 0px 7px 7px',
        elevation: 20,
        shadowColor: '#302f30'
        
    }
})


function MainScreen({ navigation, dataArray }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataFromEndpoint())
    }, [])

    // const dataArray = useSelector(state => state.data.fetchedData)
    console.log('main', dataArray)



    return (

        <View style={styles.container}>
            <Text style={styles.text}> Виберіть поле </Text>
            <TouchableOpacity  >
                <Text style={styles.button} title='Барвінок' onPress={() => {
                    navigation.navigate('Поле', { title: 'Барвінок' })
                    dispatch(setCurrentFild('Барвінок'))
                }} > Барвінок </Text>
                <Text style={styles.button} title='Перечин' onPress={() => {
                    navigation.navigate('Поле', { title: 'Перечин' })
                    dispatch(setCurrentFild('Перечин'))

                }} > Перечин </Text>
                <Text style={styles.button} title='Дубриничі' onPress={() => {
                    navigation.navigate('Поле', { title: 'Дубриничі' })
                    dispatch(setCurrentFild('Дубриничі'))
                }} > Дубриничі </Text>
                <Text style={styles.button} title='База' onPress={() => {
                    navigation.navigate('Поле', { title: 'Поле' })

                }} > База </Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    dataArray: state.data
})

export default connect(mapStateToProps)(MainScreen)

