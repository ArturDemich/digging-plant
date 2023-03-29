import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, useDispatch } from "react-redux";
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

function AllPlantsModal({ showAllPlantsM, product, characteristic, ordersPlant }) {
    const dispatch = useDispatch()

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={showAllPlantsM}
            onRequestClose={() => {
                dispatch(setShowAllPlantsM(!showAllPlantsM));
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}> {product.name} </Text>
                    <View style={styles.modalRow}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => dispatch(setShowAllPlantsM(!showAllPlantsM))}
                        >
                            <Text style={styles.textStyle}>Ні</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonModal}
                            onPress={() => dispatch(setShowAllPlantsM(!showAllPlantsM))}
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