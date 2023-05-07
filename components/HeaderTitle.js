import { Text, View } from "react-native"
import Notification from "./Notification"



function HeaderTitle({ title, userName, navigation }) {

    console.log(navigation)
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '82%' }} >
            <View>
                <Text>{title}</Text>
                <Text>{userName}</Text>
            </View>
            <Notification />
        </View>
    )
}

export default HeaderTitle