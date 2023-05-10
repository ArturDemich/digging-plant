import Checkbox from "expo-checkbox"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native"
import { DataService } from "../state/dataService"
import { useEffect } from "react"
import { deleteNotifiThunk, getNotifiThunk, updateNotifiThunk } from "../state/dataThunk"
import { useDispatch } from "react-redux"




function RenderNotifi({ notifi }) {
    const { item } = notifi
    const dispatch = useDispatch()

    const updateNotifi = async () => {
        if (item.message_status === 'new') {
            console.log(item.message_status)
            await dispatch(updateNotifiThunk('ggg', item.message_id, 'read'))
        } else if (item.message_status === 'read') {
            await dispatch(updateNotifiThunk('ggg', item.message_id, 'new'))
        }
        await dispatch(getNotifiThunk('lll'))
    }

    const deleteNotifi = async () => {
        await dispatch(deleteNotifiThunk('lll', item.message_id))
        await await dispatch(getNotifiThunk('lll'))
    }

    useEffect(() => {

    })

    console.log('RNotifi', item)

    return (
        <View style={styles.renderRow}>
            <View style={styles.renderBlock}>
                <TouchableOpacity
                    onPress={() => updateNotifi()}
                >
                    {item.message_status === 'new' ?
                        <Ionicons name="eye-outline" size={24} color="black" /> :
                        item.message_status === 'read' ?
                            <Ionicons name="eye-sharp" size={24} color="black" /> : null
                    }
                </TouchableOpacity>
                <Text style={styles.renderText}>{item.message_body}</Text>
            </View>
            <TouchableOpacity
                onPress={() => deleteNotifi()}
            >
                <Ionicons name="md-trash-outline" size={24} color="black" />
            </TouchableOpacity>

        </View>

    )
}

export default RenderNotifi


const styles = StyleSheet.create({
    renderRow: {
        flexDirection: 'row',
        marginTop: 10,
        paddingTop: 5,
        justifyContent: 'space-between',
        minWidth: 180,
        borderTopWidth: 1.5,
        borderTopColor: '#b0acb0',
    },
    renderBlock: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    renderCheckBox: {
        height: 23,
        width: 23,
    },
    renderText: {
        maxWidth: '80%'
    },
})