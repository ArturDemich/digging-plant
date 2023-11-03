import { View, Text, StyleSheet, TouchableHighlight, PermissionsAndroid, Platform } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getGroupOrdersThunk, getOrdersStep, setNextStepGroupThunk, setOrderLabels } from '../state/dataThunk'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { clearDataChange } from '../state/dataSlice'
import * as FileSystem from 'expo-file-system'
import RNFS from 'react-native-fs'
import { useEffect } from 'react'



const styles = StyleSheet.create({
    containerNBTN: {
        elevation: 5,
        //shadowColor: '#d70000',
        //shadowOffset: { width: 0, height: 0 },
       //shadowOpacity: 0.9,
       // shadowRadius: 25, 
        position: 'absolute', 
        left: 12,
        bottom: 5
    },
    textBtn: {
        color: 'white',
        fontSize: 14,
        fontWeight: 900,   
    },
    buttonStep: {
        borderRadius: 10,
        backgroundColor: 'gray',
        height: 40,
        padding: 5,               
        opacity: 0.95,
        elevation: 5,
        shadowColor: '#d70000',
        shadowOffset: { width: 0, height: 0 },        
        shadowOpacity: 0.9,
        shadowRadius: 3, 
    },
    none: {
        display: 'none'
    }
})

const colorStepBtn = {
    green: {
        id: 'b5ffdb30-cdb0-11ed-836c-00c12700489e',
        name: 'Нове',
        color: '#00721B'
    },
    yellow: {
        id: 'b5ffdb2c-cdb0-11ed-836c-00c12700489e',
        name: 'В роботі',
        color: '#1FBB43'
    },
    pink: {
        id: 'b5ffdb2e-cdb0-11ed-836c-00c12700489e',
        name: 'Викопано',
        color: '#83E499'
    },
    red: {
        id: 'b5ffdb2d-cdb0-11ed-836c-00c12700489e',
        name: 'В дорозі',
        color: '#C2DBC7'
    },
    purple: {
        id: 'b5ffdb2f-cdb0-11ed-836c-00c12700489e',
        name: 'На Базі',
        color: '#A8AFAA'
    }
}

function PrintButton({ path, currentStorageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()

    useEffect(() => {
        requestExternalStoragePermission()
    }, [])

    async function requestExternalStoragePermission() {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Permission',
                message: 'App needs access to external storage to create a folder',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use external storage');
              createDirectory()
            } else {
              console.log('External storage permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
        
      }
      

    const createDirectory = async () => {
        const path = RNFS.DownloadDirectoryPath
        const folderName = '/printPdf'; // Назва папки, яку ви хочете створити
        const directoryInfo = await RNFS.exists(path + folderName );
        console.log('directoryInfo', path + folderName)
        if (!directoryInfo) {
          // Папка не існує, створюємо її
          RNFS.mkdir(path + folderName, { NSURLIsExcludedFromBackupKey: true })
            .then((success) => {
                if (success) {
                console.log('Папка успішно створена')
                } else {
                console.log('Помилка створення папки')
                }
            })
            .catch((error) => {
                console.error('Помилка створення папки:', error);
            })
          
        } else {
          console.log('Папка вже існує');
        }
      };

    const sendData = async () => {
        await dispatch(setOrderLabels(token[0].token, dataChange))
        await dispatch(clearDataChange())        
    }

 
    console.log('PrintButton', RNFS.ExternalStorageDirectoryPath )
    return (
        <View>
            {dataChange.length > 0 ? <View style={styles.containerNBTN} >

                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => sendData()}
                >
                    <MaterialCommunityIcons name="printer-wireless" size={24} color="snow" >                    
                        <Text
                            style={styles.textBtn}
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                        > Друк</Text>
                    </MaterialCommunityIcons>
                </TouchableHighlight>
            </View> : null}
        </View>
    )
}

const mapStateToProps = (state) => ({
    currentStep: state.currentStep,
    dataChange: state.dataChange,
    token: state.token,
    currentStorageId: state.currentStorageId
})

export default connect(mapStateToProps)(PrintButton)

