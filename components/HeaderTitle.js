import { Text, View } from "react-native"
import Notification from "./Notification"



function HeaderTitle({ title, userName, navigation }) {
   
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }} >
            <View>
                <Text 
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                >{title}</Text>
                <Text 
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                >{userName}</Text>
            </View>
            <Notification />
        </View>
    )
}

export default HeaderTitle