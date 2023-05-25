import { Text, View } from "react-native"
import Notification from "./Notification"



function HeaderTitle({ title, userName, navigation }) {

    return (
        <View style={{}} >
            <View>
                <Text
                    style={{ fontWeight: 700 }}
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                >{title}</Text>
                <Text
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                >{userName}</Text>
            </View>

        </View>
    )
}

export default HeaderTitle