import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setCurrentFild } from '../state/dataSlice'
//import { filterOrders } from '../state/actions'
import { filterOrders, getDataFromEndpoint, getOrdersStep, getDigStorages } from '../state/dataThunk'


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2f5f8',
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginBottom: 60,
        marginTop: 15,
    },
    button: {
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "green",
        fontSize: 35,
        fontWeight: "500",
        minWidth: "63%",
        minHeight: 50,
        textAlignVertical: 'center',
        color: 'white',
        elevation: 20,
        shadowColor: '#302f30'

    }
})


function MainScreen({ navigation, dataArray, digStorages, route }) {
    const dispatch = useDispatch()

    useEffect(() => {
        //dispatch(getOrdersStep('80b807a6-aed1-11ed-836a-00c12700489e'))
        dispatch(getDataFromEndpoint())
        dispatch(getDigStorages())
    }, [])

    // const dataArray = useSelector(state => state.data.fetchedData)
    console.log('main', route.params.steps)

    function renderFildsButton({ item }) {

        return (
            <TouchableOpacity>
                <Text key={item.id} style={styles.button} title={item.name} onPress={() => {
                    navigation.navigate('Поле', { title: item.name })
                    dispatch(setCurrentFild(item.name))
                }} > {item.name} </Text>
            </TouchableOpacity>
        )
    }



    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Text style={styles.text}> Виберіть поле </Text>
                <FlatList
                    data={digStorages}
                    renderItem={renderFildsButton}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    dataArray: state.data,
    digStorages: state.digStorages
})

export default connect(mapStateToProps)(MainScreen)

