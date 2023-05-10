import Checkbox from "expo-checkbox"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native"
import { DataService } from "../state/dataService"




function RenderNotifi({ notifi }) {
const {item} = notifi

const updateNotifi = async() => {
    const res = await DataService.updateNotifi('ggg', item.message_id, 'read')
    console.log(res)
}
console.log('RNotifi', item)

    return (
        <View style={styles.renderRow}>
            <View style={styles.renderBlock}>
                <TouchableOpacity 
                    onPress={() => updateNotifi()}
                >
                    {item.message_status === 'new' ? 
                        <Ionicons name="eye-outline" size={24} color="black" /> :
                            <Ionicons name="eye-sharp" size={24} color="black" />
                    }
                </TouchableOpacity> 
                <Text style={styles.renderText}>{item.message_body}</Text>
            </View>
            <Ionicons name="md-trash-outline" size={24} color="black" />
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