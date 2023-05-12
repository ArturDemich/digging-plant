import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { DataService } from '../state/dataService';
import { getNotifiThunk } from '../state/dataThunk';
import RenderNotifi from './RenderNotifi';



function Notification({ notifications }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    //const [notifications, setNotifications] = useState([])    

    useFocusEffect(
        useCallback(() => {
            dispatch(getNotifiThunk('kkk'))
            let getNotifiCyrcle = setTimeout(function get() {
                dispatch(getNotifiThunk('kkk'))
                getNotifiCyrcle = setTimeout(get, 900000)
            }, 900000)
            return () => { clearTimeout(getNotifiCyrcle) }
        }, [show])
    )

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
                        <Text style={styles.textStyle}>Повідомлення</Text>
                        {notifications.length > 0 ?
                            <FlatList
                                data={notifications}
                                renderItem={(notifi) => <RenderNotifi notifi={notifi} />}
                                keyExtractor={() => shortid.generate()}

                            /> :
                            <Text >Повідомлень немає</Text>
                        }


                        <TouchableOpacity
                            onPress={() => setShow(!show)}
                            style={styles.buttonModal}
                        >
                            <Text style={styles.modalText}>Закрити</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>



            <TouchableOpacity
                onPress={() => setShow(!show)}
                style={{ alignSelf: 'center' }}
            >

                <Ionicons name="notifications-outline" size={24} color="black" />
                <Badge
                    containerStyle={{ position: 'absolute', top: -5, right: -9 }}
                    badgeStyle={{ backgroundColor: '#45aa45' }}
                    value={notifications.length}
                />
            </TouchableOpacity>
        </View>

    )
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(Notification)


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
        gap: 5,
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
        fontWeight: 500,
        fontSize: 18,
    },
    modalText: {
        textAlign: "center",
        alignSelf: 'center',
        color: 'snow',
        fontSize: 15,
        fontWeight: 700
    },

})