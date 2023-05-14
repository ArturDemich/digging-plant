import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { useCallback, useEffect, useState, useRef } from 'react';
import { FlatList, Modal, StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { DataService } from '../state/dataService';
import { getNotifiThunk } from '../state/dataThunk';
import RenderNotifi from './RenderNotifi';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function Notification({ notifiState }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    //const [notifications, setNotifications] = useState([]) 
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

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

    useEffect(() => {
        schedulePushNotification(notifiState)
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

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
                        {notifiState.length > 0 ?
                            <FlatList
                                data={notifiState}
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
                    value={notifiState.length}
                />
            </TouchableOpacity>
        </View>

    )
}

const mapStateToProps = state => {
    return {
        notifiState: state.notifications
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

async function schedulePushNotification(notifi) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: notifi[0].message_body,
        },
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}