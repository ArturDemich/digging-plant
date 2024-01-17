import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,     
    Platform,          
    ActivityIndicator,
    DeviceEventEmitter,            
    ScrollView,
    ToastAndroid,
    Alert,
} from 'react-native'
import Modal from "react-native-modal";
import { connect, useDispatch } from 'react-redux'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { setBTPermission } from '../../state/dataSlice'
import { useEffect, useState, useCallback, memo } from 'react'
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';
import ItemList from "./ItemList"
import SamplePrint from "./SamplePrint"
import { useBluetoothPermissions } from '../../hooks/useBTPermission';
import * as SecureStore from 'expo-secure-store';
import PrinterButton from './PrinterButton';
import { PermissionsAndroid } from 'react-native';


const styles = StyleSheet.create({    
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
  container: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 3,
    width: '80%',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#97bba9d9'
  },
  containerList: { flex: 1, flexDirection: 'column' },     
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
})


const PrinterModal = memo(({ btPermission}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [pairedDevices, setPairedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [boundAddress, setBoundAddress] = useState("");
  const [devicesBlock, setDevicesBlock] = useState(true);
  
  const alertBToN = () => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {        
          if(!enabled) {                    
              Alert.alert(
                  `Bluetooth відключений`, 
                  'Для друку етикеток вімкніть Bluetooth ?', 
                  [{
                      text: "Так",
                      onPress: () => BluetoothManager.enableBluetooth().then(() => setShow(!show))
                  },
                  {
                      text: "Ні"                      
                  }]
                  )
          } else { 
            setShow(!show)
          } 
      },
      (err) => {
        err
      }
    )   
    
  }

  const setPermission = async () => {
    const permission = await useBluetoothPermissions()
    dispatch(setBTPermission(permission))
    permission[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED ? alertBToN() : null
  }

  const checkBToN = async () => {
    if (btPermission[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED) {      
      alertBToN()
    } else {
      Alert.alert(
        `Доступ до Bluetooth обмежено`, 
        'Для друку етикеток надайте додатку дозвіл та доступ до Bluetooth!', 
        [{
            text: "Так",
            onPress: () => setPermission()
        },
        {
            text: "Ні"                      
        }]
        )  
    }
    
  }  

  useEffect(() => {
    if (Platform.OS === "android") {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadPaired(rsp);
        }
      );         
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName("");
          setBoundAddress("");
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show(
            "Device Not Support Bluetooth !",
            ToastAndroid.LONG
          );
        }
      );
    }  
  },[]);
 
  useEffect(() => {
    if (pairedDevices?.length < 1) {  
      boundAddress?.length <= 0 && show && checkPrinter()          
      console.log("scanning...");
    }    
  }, [pairedDevices, show])
  
  const checkPrinter = useCallback(async () => {
    const row = {}
    let printerAddress
    let printerName
    if(Platform.OS === 'android') {
      printerAddress = await SecureStore.getItemAsync('printerAddress')
      printerName = await SecureStore.getItemAsync('printerName')
      row.address = printerAddress
      row.name = printerName

      if(printerAddress?.length > 0) {
        connect(row)        
      } else {
        show && scanDevice()
      }
    }    
  }, [boundAddress])

  const setPrinterSStore = async (row) => {
    await SecureStore.setItemAsync('printerAddress', row.address)
    await SecureStore.setItemAsync('printerName', row.name)
  }

  const deviceAlreadPaired = useCallback(
    (rsp) => {
      var ds = null;
      
      if (typeof rsp.devices === "object") {
        ds = rsp.devices;       
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds?.length) {
        let pared = pairedDevices;
        if (pared?.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);        
      }
    },
    [pairedDevices]
  );  
  
  const connect = async (row) => {
    try {
      setLoading(true);
      await BluetoothManager.connect(row.address);
      setLoading(false);
      setDevicesBlock(false);
      setBoundAddress(row.address);
      setName(row.name || 'UNKNOWN'); 
    } catch (e) {
      setLoading(false);
      ToastAndroid.show(
        "Не вдалось підключитись до пристрою Bluetooth !",
        ToastAndroid.LONG
      );
      setDevicesBlock(true);
    }
  };

  const unPair = (address) => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      (s) => {
        setLoading(false);
        setBoundAddress("");
        setName("");
      },
      (e) => {
        setLoading(false);
        alert(e);
      }
    );
  };

  const scanDevice = async () => {
    setLoading(true);    
    BluetoothManager.scanDevices().then(
      (s) => { 
        try {
        var foundDs = JSON.parse(s);
        var found = foundDs.found
        } catch (e) {
          //ignore
        }
        if (found && found?.length) {
          var allDevise = foundDs.paired 
          found.forEach(elem => {
            let duplicated = allDevise.findIndex(function (x) {
              return x.address == elem.address;
            })
            if(duplicated == -1) {
              allDevise.push(elem)
            }
          })
          setPairedDevices(allDevise)
        }        
        setLoading(false);
      },
      (er) => {
        console.log('scanDeviceserer Error', er)
        Alert.alert(
          `Геолокацію не включено!`, 
          'Для пошуку принтерів вімкніть Геолокацію!', 
          [{
              text: "Зрозуміло",              
          }]
          )  
        setLoading(false);        
      }
    );
  }  
  
    return (
      <View >
        <Modal
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          transparent={true}
          isVisible={show}
          onBackButtonPress={() => setShow(!show)} 
          onBackdropPress={() => setShow(!show)}  
          animationInTiming={700}
          animationOutTiming={70}
          swipeDirection={['left']}
          onSwipeComplete={() => setShow(!show)}
          style={{ margin: 1}}       
        > 
                <ScrollView style={styles.container}>                    
                        <Text style={styles.sectionTitle}>
                            Підключений принтер:
                        </Text>
                        {boundAddress?.length > 0 && (
                            <ItemList
                            label={name}
                            onPress={() => unPair(boundAddress)}
                            actionText="Відключити"
                            color="#E9493F"
                            />
                        )}
                        {boundAddress?.length < 1 && !loading ? (
                            <Text style={styles.printerInfo}>
                            Не підключено...
                            </Text>
                        ) : loading && <ActivityIndicator size="large" color="#45aa45" animating={true} />}
                        {boundAddress?.length >= 0 && devicesBlock ?  <View>
                          <Text style={styles.sectionTitle}>
                              Раніше підключені пристрої:
                          </Text>                        
                          <View style={styles.containerList}>
                              {pairedDevices.map((item, index) => {
                              return (
                                  <ItemList
                                  key={index}
                                  onPress={() => {
                                    connect(item)
                                    setPrinterSStore(item)                                    
                                  }}
                                  label={item.name}
                                  connected={item.address === boundAddress}                                
                                  actionText="Підключити"
                                  color="#00BCD4"
                                  />
                              );
                              })}
                          </View>
                        </View> : null}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableHighlight
                            style={[styles.buttonStep, {backgroundColor: 'blue', width: 100}]}
                            onPress={() => {
                              scanDevice()
                              setDevicesBlock(true)
                            }}
                        >
                            {!loading ? <MaterialCommunityIcons name="printer-search" size={24} color="snow" >                    
                                <Text
                                    style={styles.textBtn}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                > Пошук</Text>
                            </MaterialCommunityIcons> : 
                            <ActivityIndicator size="large" color="snow" animating={true} />}
                        </TouchableHighlight> 
                        {boundAddress?.length > 0 ? <SamplePrint /> : <Text style={{color: 'blue'}} >Підключіть принтер</Text>}
                        </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </Modal>        
        <PrinterButton checkBToN={() => checkBToN()} />
      </View>
    )
})

const mapStateToProps = (state) => ({  
    btPermission: state.btPermission,
})

export default connect(mapStateToProps)(PrinterModal)

