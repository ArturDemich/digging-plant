import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableHighlight, View, FlatList, Pressable, Modal, Alert, TextInput, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux';
import shortid from 'shortid';
import ButtonsBar from '../components/ButtonsBar';
import { getGroupOrdersThunk } from '../state/dataThunk';




function AllPlantsScreen({ route, orders, currentFild, steps, groupOrders, currentStep }) {
    //console.log('Allpalnt', filterPlants)
    const [isSelected, setSelection] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)

    const { storageId, token } = route.params

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getGroupOrdersThunk(currentStep, storageId, token.token))

    }, [currentStep])



    console.log('allPr', groupOrders)


    function renderPlants({ item }) {
        console.log('renderPlants', currentStep)
        let qty = 0
        item.orders.forEach(elem => qty += elem.qty)
        return (
            <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <Text style={styles.plantName}>{item.product.name}</Text>
                    <Text style={styles.characteristics}>{item.characteristic.name}</Text>
                    <View style={styles.info}>
                        <Text style={styles.quantity}> всього: <Text style={styles.textStr}> {qty} шт</Text></Text>
                    </View>
                    <View style={styles.changeinfo}>
                        <View style={styles.orderInfoBlock}>
                            {item.orders.map(elem => (
                                <Text key={shortid.generate()} style={styles.orderInfo}> {elem.orderNo}: <Text style={styles.orderQty}>{elem.qty} шт</Text> </Text>
                            ))}
                        </View>
                        <TouchableHighlight
                            style={[styles.button, isSelected === true && styles.buttonPress]}
                            onPress={(el) => {
                                setSelection(!isSelected)
                                console.log(el)
                            }
                            } >
                            <Text style={styles.statusDig}>{currentStep.nextStepName}{item.statusDig}</Text>
                        </TouchableHighlight>
                    </View>
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


            <Text style={styles.text}> Всі рослини з поля {currentFild} </Text>
            {groupOrders.length == 0 ?
                <View style={styles.costLineWrapper}>
                    <Text style={styles.noneData}>В цьому полі немає рослин з таким сатусом</Text>
                </View> :
                <FlatList
                    data={groupOrders}
                    renderItem={renderPlants}
                    keyExtractor={() => shortid.generate()}

                />
            }

            <ButtonsBar storageId={storageId} token={token} />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.stepOrders,
        currentFild: state.currentFild,
        steps: state.steps,
        groupOrders: state.groupOrders,
        currentStep: state.currentStep
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
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        paddingBottom: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: '#52006A'
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
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,

    },
    info: {
        flexDirection: 'row',
    },
    quantity: {
        height: 'auto',
        textAlignVertical: 'center',
        alignSelf: 'center',

    },
    status: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    changeinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderInfoBlock: {
        flexDirection: 'column',
        marginTop: 3,
    },
    orderInfo: {
        margin: 3,
        fontSize: 12,
        color: 'gray',
        fontWeight: 500,
    },
    orderQty: {
        fontWeight: 800,
        color: '#6a6161',
        fontSize: 13,
    },
    input: {
        height: 30,
        width: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        alignSelf: 'flex-start',

    },
    noneData: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 900,
        color: 'gray',
    },






    statusDig: {
        height: 'auto',
        maxWidth: 130,
        textAlignVertical: 'center',
        fontSize: 13,
        color: 'white',
        fontWeight: 700,
        margin: 5
    },

    button: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#45aa45",
        minWidth: 100,
        textAlignVertical: 'center',
        alignSelf: 'center',
        margin: 2,
        height: 'auto',
        elevation: 3
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