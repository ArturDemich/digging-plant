import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableHighlight, View, FlatList, Pressable, Modal, Alert, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux';
import { filterAllPlants } from '../state/dataThunk';




function AllPlantsScreen({ filterPlants, route, orders, currentFild }) {
    //console.log('Allpalnt', filterPlants)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(filterAllPlants(orders, currentFild))
    }, [])

    const [isSelected, setSelection] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)


    function renderPlants({ item }) {
        // console.log('renderPlants', item)
        return (
            <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <Text style={styles.plantName}>{item.name}</Text>
                    <Text style={styles.characteristics}>{item.characteristics}</Text>
                    <Text style={styles.quantity}>к-сть: <Text style={styles.textStr}> {item.quantity}  шт</Text></Text>
                    <Text style={styles.status}>{'Викопано (готово до транспорту)'}</Text>
                    <TouchableHighlight
                        style={[styles.button, isSelected === true && styles.buttonPress]}
                        onPress={(el) => {
                            setSelection(!isSelected)
                            /*  dispatch(changeStatusDigPlant(filterPlants)) */
                            console.log(el)
                        }
                        } >
                        <Text style={styles.statusDig}>Змінити статус{item.statusDig}</Text>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        )
    }




    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Всі рослини викопані?</Text>
                        <View style={styles.modalRow}>
                            <Pressable
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Ні</Text>
                            </Pressable>
                            <Pressable
                                style={styles.buttonModal}
                                onPress={() => setSelection(!isSelected) ? true : setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Всі!</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>


            <Text style={styles.text}> Замовлення з поля {currentFild} </Text>
            <FlatList
                data={filterPlants}
                renderItem={renderPlants}
                keyExtractor={item => item.id.toString()}

            />
            <Pressable style={styles.statusButton} onPress={() => setModalVisible(true)} >
                <Text style={styles.textStatus} >Викопано! </Text>
            </Pressable>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        filterPlants: state.filterAllPlants,
        orders: state.filterOrders,
        currentFild: state.currentFild
    }
}



export default connect(mapStateToProps, null)(AllPlantsScreen)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 1,
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 14,
    },
    textStr: {
        fontWeight: 600,
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 3,
        paddingRight: 3,
    },
    plantName: {
        height: 'auto',
        width: 'auto',
        fontSize: 16,
        fontWeight: '500',
        paddingBottom: 3,
        //flex: 3,
        //paddingLeft: 10,
        // textAlignVertical: 'center',
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,

    },
    status: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    quantity: {
        height: 'auto',
        flex: 1,
        textAlignVertical: 'center',
    },
    statusDig: {
        height: 'auto',
        flex: 2,
        textAlignVertical: 'center',
        fontSize: 12,
        margin: 5

    },
    orderItems: {
        height: 50,
        lineHeight: 50,
        width: 200,
        flex: 2,
    },
    button: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "green",
        minWidth: "10%",
        textAlignVertical: 'center',
        margin: 2,


    },
    buttonPress: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "red",
        minWidth: "10%",
        textAlignVertical: 'center',
        margin: 2
    },
    statusButton: {
        borderRadius: 15,
        backgroundColor: "green",
        width: "35%",
        minHeight: 40,
        margin: 2,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    textStatus: {
        color: 'black',
        fontSize: 18,
    },

    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 10,
        //boxShadow: '0 7px 7px #0505061a',
        borderRadius: 5,
        margin: 5,
        elevation: 7,
        shadowColor: '#52006A',
        paddingTop: 7,
        paddingBottom: 7,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalRow: {
        flexDirection: 'row',

    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        minWidth: 90,
        backgroundColor: "#2196F3",
    },

    buttonClose: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        minWidth: 70,
        backgroundColor: "red",
        marginEnd: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
})