import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/core'
import { useCallback, useState} from 'react'
import { FlatList, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Badge } from 'react-native-elements'
import { connect, useDispatch } from 'react-redux'
import { getNotifiThunk } from '../state/dataThunk'
import RenderNotifi from './RenderNotifi'



function Notification({ notifiState, token }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const keyExtractor = useCallback((item) => (item.message_id.toString()), [])
    const renderItem = useCallback(({ item }) => {
        return <RenderNotifi notifi={item} token={token[0].token} />
    }, [])

    const onRefresh = async () => {
        setRefresh(true)
        await dispatch(getNotifiThunk(token[0].token))
        setRefresh(false)
    }

    useFocusEffect(
        useCallback(() => {
            token ? dispatch(getNotifiThunk(token[0].token)) : null         
        }, [show])
    )

    return (
        <View style={{ alignSelf: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => setShow(!show)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            style={styles.textStyle}
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                        >Повідомлення</Text>
                        {notifiState.length > 0 ?
                            <FlatList
                                data={notifiState}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refresh} />}
                            /> :
                            <Text >Повідомлень немає</Text>
                        }
                        <TouchableOpacity
                            onPress={() => setShow(!show)}
                            style={styles.buttonModal}
                        >
                            <Text
                                style={styles.modalText}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            >Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => setShow(!show)}
                style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: 32 }}
            >
                <Ionicons name="notifications-outline" size={23} color="black" />
                <Badge
                    containerStyle={{ position: 'absolute', top: 7, right: -4 }}
                    badgeStyle={{ backgroundColor: '#45aa45' }}
                    value={notifiState.length}
                />
            </TouchableOpacity>
        </View>

    )
}

const mapStateToProps = state => {
    return {
        notifiState: state.notifications,
        token: state.token
    }
}

export default connect(mapStateToProps)(Notification)


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
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

