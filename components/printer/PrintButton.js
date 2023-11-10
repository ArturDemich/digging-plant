import { View, Text, StyleSheet, TouchableHighlight, PermissionsAndroid, Platform, Modal, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getGroupOrdersThunk, getOrdersStep, setNextStepGroupThunk, setOrderLabels } from '../../state/dataThunk'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { clearDataChange } from '../../state/dataSlice'
import * as FileSystem from 'expo-file-system'
import RNFS from 'react-native-fs'
import { useEffect, useState } from 'react'
import { BluetoothEscposPrinter, BluetoothManager } from 'react-native-bluetooth-escpos-printer';
import { Alert } from 'react-native'
import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions'
import { useCallback } from 'react'
//import { BleManager } from 'react-native-bluetooth-escpos-printer';



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
    },


  centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: '#00002329',
  },
  modalView: {
      width: 300,
      flexDirection: 'column',
      margin: 1,
      backgroundColor: "white",
      borderRadius: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 5,
      paddingTop: 5,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      minHeight: '15%',
      maxHeight: '70%',
  },
  btnBlock: {
      flexDirection: 'row',
      justifyContent: 'space-between',       
      flex: 1,
      width: "100%"
  },
  buttonModal: {
      borderRadius: 3,
      textAlign: "center",
      backgroundColor: "#45aa45",
      width: 110,        
      alignSelf: 'flex-end',
      height: 35,
      elevation: 3,
      justifyContent: 'center',
  },  
  buttonClose: {
      borderRadius: 3,
      height: 35,
      elevation: 3,
      width: 110,
      alignSelf: 'flex-end',
      backgroundColor: "#999999e6",
      justifyContent: 'center',
  },
  textStyle: {
      fontWeight: 500,
      fontSize: 18,
      color: '#555555',
      marginBottom: 40
  },
  textStr: {
      fontWeight: 600,
      fontSize: 21,        
  },
  modalText: {
      textAlign: "center",
      alignSelf: 'center',
      color: 'snow',
      fontSize: 15,
      fontWeight: 700
  },
})


function PrintButton({ path, currentStorageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [availablePrinters, setAvailablePrinters] = useState([])
    const [BToN, setBToN] = useState()
    
    const scanBluetoothDevice = async () => {        
        try {
          const request = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);
    
          if (request["android.permission.ACCESS_FINE_LOCATION"] === RESULTS.GRANTED) {
            BluetoothManager.isBluetoothEnabled().then(
                (enabled) => {
                    if(!enabled) {                    
                        Alert.alert(
                            `Bluetooth ${String(enabled)}`, 
                            'Вімкнути Bluetooth ?', 
                            [{
                                text: "OK",
                                onPress: () => BluetoothManager.enableBluetooth().then(() => console.log('Bluetooth - ON'))
                            },
                            {
                                text: "NO"                           
                            }]
                            )
                    } else {
                        //setBToN(enabled)
                        
                    }               
                },
                (err) => {
                  err
                }
              )

              BluetoothManager.scanDevices().then(
                (s) => {
                  console.log('scanDevices11', s)
                  const pairedDevices = s.paired
                  const found = s.found            
                  try {
                    found = JSON.parse(found); //@FIX_it: the parse action too weired..
                    console.log('scanDevices', found)
                  } catch (e) {
                    //ignore
                    console.log(e)
                  }
                },
                (er) => {           
                    console.log(er)
                }
              )
          } else {
           
          }
        } catch (err) {
          console.log('scanBluetoothDevice',  err)
        }
      };

      const scanDs =  () => {
        console.log('scanDevices00')
        BluetoothManager.scanDevices().then(
          (s) => {
            console.log('scanDevices11', s)
            const pairedDevices = s.paired
            const found = s.found            
            try {
              found = JSON.parse(found); //@FIX_it: the parse action too weired..
              console.log('scanDevices', found)
            } catch (e) {
              //ignore
            }
          },
          (er) => {           
            
          }
        )
      }
    

    useEffect(() => {      
        scanBluetoothDevice()
        //scanDs()
    }, [])
    

    useEffect(() => {
      
    }, [])
    
    console.log('PrintButton', BToN )
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => setShow(!show)}
        >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            style={styles.textStr}
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                        >Все файно! </Text>
                        
                            <Text style={styles.textStyle}>********</Text>
                        <View style={styles.btnBlock}>
                            <TouchableOpacity
                                onPress={() => setShow(!show)}
                                style={styles.buttonClose}
                            >
                                <Text
                                    style={styles.modalText}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                >*****</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setShow(!show)}
                                style={styles.buttonModal}
                            >
                                <Text
                                    style={styles.modalText}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                >*****</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        <View>
            {dataChange.length > 0 ? <View style={styles.containerNBTN} >

                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => setShow(!show)}
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
      </>
    )
}

const mapStateToProps = (state) => ({
    currentStep: state.currentStep,
    dataChange: state.dataChange,
    token: state.token,
    currentStorageId: state.currentStorageId
})

export default connect(mapStateToProps)(PrintButton)

