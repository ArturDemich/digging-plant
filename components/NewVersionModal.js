import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { getNewVersion } from "../state/dataThunk";
import { useDispatch } from "react-redux";
import Constants from 'expo-constants';
import { StyleSheet } from "react-native";




function NewVersion() {
    const [show, setShow] = useState(false)
    const [version, setVersion] = useState()
    const dispatch = useDispatch()
    const ver = Constants.manifest.version

    const get = async () => {
        const data = await dispatch(getNewVersion()) 
        if(data?.version == ver) {
            setShow(true)
        }
        setVersion(data)
    }

    useEffect(() => {
        get()
    }, [])
    console.log('version modal',  version)
    return(
        <View>
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
                        >Все файно! Є нова версія!! </Text>
                        
                            <Text >Оновити зараз?</Text>
                        <View style={styles.btnBlock}>
                            <TouchableOpacity
                                onPress={() => setShow(!show)}
                                style={styles.buttonModal}
                            >
                                <Text
                                    style={styles.modalText}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                >Пізніше</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setShow(!show)}
                                style={styles.buttonModal}
                            >
                                <Text
                                    style={styles.modalText}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                >Оновити</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default NewVersion


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#a1a1a1a8',
        
    },
    modalView: {
        flex: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        alignItems: "center",
        //justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        //minHeight: '20%',
        //maxHeight: '80%',
        // minWidth: 300,
        height: 50,
        width: 280,
        //gap: 5,
    },

    btnBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between'

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