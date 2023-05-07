import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import shortid from 'shortid';



function Notification() {
    const [show, setShow] = useState(false)

    const notifi = [
        'Ggdjkadljsc lskjdkjfdksjcsldlk',
        'grellsld;cs;  ,djfhidjfsljdls',
        'sdhgsjgrhdsnjjk sjkhdfnskjd sjdfnjkhsd sfjkj',
        'ghfkdsijrejkljd ljskdfjskjd kljdkf'
    ]

    function renderNotifi({ item }) {

        return (
            <Text>
                {item}
            </Text>
        )
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => setShow(!show)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={notifi}
                            renderItem={renderNotifi}
                            keyExtractor={() => shortid.generate()}
                        />


                        <Pressable
                            onPress={() => setShow(!show)}
                            style={styles.buttonClose}
                        >
                            <Text style={styles.modalText}>Закрити</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>



            <Pressable
                onPress={() => setShow(!show)}
                style={{ alignSelf: 'center' }}
            >
                <Ionicons name="notifications-outline" size={24} color="black" />
            </Pressable>
        </View>

    )
}

export default Notification


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