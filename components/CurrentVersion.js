import {  Text} from "react-native";
import Constants from 'expo-constants';


const CurrentVersion = () => {
    const ver = Constants.manifest.version

    return (
        <Text>V {ver}</Text>
    )
}

export default CurrentVersion