import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import shortid from 'shortid';
import { DataService } from '../state/dataService';



function Notification() {
    const [show, setShow] = useState(false)
    const [notifications, setNotifications] = useState([])

    const notifi = [
        'Ggdjkadljsc lskjdkjfdksjcsldlk',
        'grellsld;cs;  ,djfhidjfsljdls',
        'sdhgsjgrhdsnjjk sjkhdfnskjd sjdfnjkhsd sfjkj',
        'ghfkdsijrejkljd ljskdfjskjd kljdkf',
        'Ggdjkadljsc lskjdkjfdksjcsldlk',
        'grellsld;cs;  ,djfhidjfsljdls',
        'sdhgsjgrhdsnjjk sjkhdfnskjd sjdfnjkhsd sfjkj',
        'ghfkdsijrejkljd ljskdfjskjd kljdkf',
        'Ggdjkadljsc lskjdkjfdksjcsldlk',
        'grellsld;cs;  ,djfhidjfsljdls',
        'sdhgsjgrhdsnjjk sjkhdfnskjd sjdfnjkhsd sfjkj',
        'ghfkdsijrejkljd ljskdfjskjd kljdkf',
        'Ggdjkadljsc lskjdkjfdksjcsldlk',
        'grellsld;cs;  ,djfhidjfsljdls',
        'sdhgsjgrhdsnjjk sjkhdfnskjd sjdfnjkhsd sfjkj',
        'ghfkdsijrejkljd ljskdfjskjd kljdkf',
        'Ggdjkadljsc lskjdkjfdksjcsldlk',
        'grellsld;cs;  ,djfhidjfsljdls',
        'sdhgsjgrhdsnjjk sjkhdfnskjd sjdfnjkhsd sfjkj',
        'ghfkdsijrejkljd ljskdfjskjd kljdkf'

    ]

    const getNotifi = async () => {
        const res = await DataService.getNotifi('ggg')
        setNotifications(res.data)
        console.log(res.data)

    }

    function renderNotifi({ item }) {

        return (
            <View style={styles.renderRow}>
                <View style={styles.renderBlock}>
                    <Checkbox
                        style={styles.renderCheckBox}
                    />
                    <Text style={styles.renderText}>{item.message_body}</Text>
                </View>
                <Ionicons name="md-trash-outline" size={24} color="black" />
            </View>

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
                            data={notifications}
                            renderItem={renderNotifi}
                            keyExtractor={() => shortid.generate()}
                        />


                        <Pressable
                            onPress={() => setShow(!show)}
                            style={styles.buttonModal}
                        >
                            <Text style={styles.modalText}>Закрити</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => getNotifi()}
                            style={styles.buttonModal}
                        >
                            <Text style={styles.modalText}>OK</Text>
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
        //justifyContent: "center",
        alignItems: "center",
        marginTop: '20%',

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
        elevation: 5,
        minHeight: '20%',
        maxHeight: '80%',
        minWidth: 300,
        gap: 5
    },


    renderRow: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'space-between',
        minWidth: 180

    },
    renderBlock: {
        flexDirection: 'row',
        gap: 5
    },
    renderCheckBox: {
        height: 23,
        width: 23,
    },
    renderText: {
        maxWidth: '90%'
    },


    buttonModal: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#45aa45",
        width: 80,
        textAlignVertical: 'center',
        alignSelf: 'center',
        height: 35,
        elevation: 3,
        justifyContent: 'center',
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
        textAlign: "center",
        alignSelf: 'center',
        color: 'snow',
        fontSize: 15,
        fontWeight: 700
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