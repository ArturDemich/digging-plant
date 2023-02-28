import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableHighlight, View, FlatList, Pressable, Modal, Alert, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector, connect } from 'react-redux';




function PlantsScreen({ filterPlants, route }) {
    //console.log('palnt', filterPlants)

    const dispatch = useDispatch()

    const [isSelected, setSelection] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)

    const fild = route.params.title
    const clientName = route.params.clientName



    function renderPlants({ item }) {
        return (
            <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <Text style={styles.plantName}>{item.name}</Text>
                    <Text style={styles.characteristics}>{item.characteristics}</Text>
                    <View style={styles.info}>
                        <Text style={styles.quantity}>к-сть: <Text style={styles.textStr}> {item.quantity}  шт</Text></Text>
                        <Text style={styles.status}>{'Викопано (готово до транспорту)'}</Text>
                    </View>
                    <View style={styles.changeinfo}>
                        <Text style={styles.quantity}>
                            к-сть:
                            <TextInput
                                style={styles.input}
                                //onChangeText={onChangeNumber}
                                //value={number}
                                placeholder="0"
                                keyboardType="numeric"
                            />
                        </Text>
                        <TouchableHighlight
                            style={[styles.button, isSelected === true && styles.buttonPress]}
                            onPress={(el) => {
                                setSelection(!isSelected)
                                /* dispatch(changeStatusDigPlant(filterPlants)) */
                                //console.log(el)
                            }
                            } >
                            <Text style={styles.statusDig}>Змінити статус{item.statusDig}</Text>
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


            <Text style={styles.text}> Замовлення {clientName} з поля {fild} </Text>
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
        filterPlants: state.filterPlants
    }
}



export default connect(mapStateToProps, null)(PlantsScreen)




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
    },
    info: {
        flexDirection: 'row',
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,

    },
    quantity: {
        height: 'auto',
        flex: 2,
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
    orderItems: {
        height: 50,
        lineHeight: 50,
        width: 200,
        flex: 2,
    },
    changeinfo: {
        flexDirection: 'row'
    },
    statusDig: {
        height: 'auto',
        textAlignVertical: 'center',
        fontSize: 12,
        margin: 5
    },
    input: {
        height: 30,
        width: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    button: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "green",
        width: 130,
        textAlignVertical: 'center',
        //height: 'min-content',
        alignSelf: 'center',
        margin: 2
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
        //borderBottomWidth: 1,
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        //boxShadow: '0 7px 7px #0505061a',
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: '#52006A'
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