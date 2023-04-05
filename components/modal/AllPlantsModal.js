import { memo, useRef, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { connect, useDispatch } from "react-redux";
import shortid from "shortid";
import { clearModalInput, setShowAllPlantsM } from "../../state/dataSlice";
import RenderModalOrders from "./RenderModalOrders";


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
    listOrders: {
        width: '100%',
    },

})

function allPlantsModal({ plant, show, close }) {
    const { product, characteristic, orders } = plant
    const [currentQty, setCurrentQty] = useState({})
    const [trigger, setTrigger] = useState(false)
    const dispatch = useDispatch()



    useState(() => {

    }, [])
    console.log('modalka')

    /* dispatch(setNextStepThunk(
        token[0].token,
        storageId,
        currentStep.id,

        productId,
        characteristicId,
        unitId,

        orderId,
        Number(qty)
    )) */



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
                            data={orders}
                            renderItem={(orders) => <RenderModalOrders orders={orders} plant={plant} trigger={trigger} cancelTrigger={() => setTrigger(false)} />}
                            keyExtractor={() => shortid.generate()}
                        />
                    </View>
                    <View style={styles.modalRow}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => {
                                dispatch(clearModalInput())
                                close()
                            }}
                        >
                            <Text style={styles.textStyle}>Ні</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonModal}
                            onPress={() => {
                                setTrigger(true)
                                close()
                            }}
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

    }
}
const AllPlantsModal = memo(allPlantsModal)

export default connect(mapStateToProps)(AllPlantsModal)