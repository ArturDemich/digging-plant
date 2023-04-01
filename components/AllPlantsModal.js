import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { connect, useDispatch } from "react-redux";
import shortid from "shortid";
import { setShowAllPlantsM } from "../state/dataSlice";


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
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
        marginTop: 10,
        justifyContent: 'space-between',
        gap: 50
    },
    buttonModal: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#45aa45",
        minWidth: 100,
        textAlignVertical: 'center',
        alignSelf: 'center',
        height: 35,
        elevation: 3,
        justifyContent: 'center'
    },

    buttonClose: {
        borderRadius: 3,
        height: 35,
        elevation: 3,
        minWidth: 100,
        backgroundColor: "red",
        marginEnd: 5,
        justifyContent: 'center',

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
    productName: {
        fontWeight: 600,
        alignSelf: 'flex-start',
        fontSize: 14,
    },
    characteristicName: {
        fontWeight: 500,
        alignSelf: 'flex-start',
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
    infoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#b0acb0',
    },
    orderInfoBlock: {
        flexDirection: 'row'
    },
    orderNames: {
        alignSelf: 'center',
        maxWidth: '92%',
        padding: 3,

    },
    qtyInfo: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 700,
    },
    listOrders: {
        width: '100%',
    },
    textClient: {
        fontSize: 11,
        fontWeight: 500,
    },
    textNumOrder: {
        fontSize: 12,
        fontWeight: 700,
    },
})

function AllPlantsModal({ showAllPlantsM, product, characteristic, ordersPlant, show, close }) {
    const dispatch = useDispatch()
    const [showM, setShowM] = useState(show)
    console.log(show)

    function renderOrdersInfo({ item }) {

        return (
            <View style={styles.infoBlock}>
                <View style={styles.orderInfoBlock}>
                    <View style={styles.orderNames}>
                        <Text style={styles.textNumOrder}>{item.orderNo}</Text>
                        <Text style={styles.textClient}>{item.customerName}</Text>
                    </View>
                    <Text style={styles.qtyInfo}>- {item.qty} шт</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        //onChangeText={setQty}
                        //value={String(qty)}
                        inputMode='numeric'
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => close()}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.productName}> {product.name} </Text>
                    <Text style={styles.characteristicName}> {characteristic.name} </Text>
                    <View style={styles.listOrders}>
                        <FlatList
                            data={ordersPlant}
                            renderItem={renderOrdersInfo}
                            keyExtractor={() => shortid.generate()}
                        />
                    </View>
                    <View style={styles.modalRow}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => close()}
                        >
                            <Text style={styles.textStyle}>Ні</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonModal}
                            onPress={() => close()}
                        >
                            <Text style={styles.textStyle}>Всі!</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>

    )
}

const mapStateToProps = state => {
    return {
        showAllPlantsM: state.showAllPlantsM
    }
}

export default connect(mapStateToProps)(AllPlantsModal)