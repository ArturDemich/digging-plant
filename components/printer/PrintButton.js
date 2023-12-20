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
import { RESULTS, } from 'react-native-permissions'
import ItemList from "./ItemList"
import SamplePrint from "./SamplePrint"
import { useBluetoothPermissions } from '../../hooks/useBTPermission';
import * as SecureStore from 'expo-secure-store';


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
  /////////////
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
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  bluetoothStatus: color => ({
    backgroundColor: color,
    padding: 8,
    borderRadius: 2,
    color: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
  }),
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },

})


const PrintButton = memo(({ token, dataChange, btPermission}) => {
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
    permission["android.permission.ACCESS_FINE_LOCATION"] === RESULTS.GRANTED ? alertBToN() : null
  }

  const checkBToN = async () => {
    if (btPermission["android.permission.ACCESS_FINE_LOCATION"] === RESULTS.GRANTED) {      
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
       /* DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          console.log('VENT_DEVICE_FOUND', rsp);
          deviceFoundEvent(rsp);
        }
      );  */      
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
    if (pairedDevices.length < 1) {  
      boundAddress.length <= 0 && show && checkPrinter()          
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

      if(printerAddress.length > 0) {
        connect(row)        
      } else {
        show && scanDevice()
      }
    }
    console.log('checkPrinter', printerAddress)
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
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
        console.log('deviceAlreadPaired', pared)
      }
    },
    [pairedDevices]
  );  

  /* const deviceFoundEvent = useCallback(
    (rsp) => {
      var r = null;
      console.log('deviceFoundEvent', rsp)
      try {
        if (typeof rsp.device === "object") {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            //setFoundDs(found);
            console.log('found', found)
            setPairedDevices((prevDevice) => [...prevDevice, found])
          }
        }
      }
    },
    [foundDs]
  ); */
  
  const connect = async (row) => {
    try {
      setLoading(true);
      await BluetoothManager.connect(row.address);
      setLoading(false);
      setDevicesBlock(false);
      setBoundAddress(row.address);
      setName(row.name || 'UNKNOWN');      
      console.log('Connected to device:', row);
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
    await console.log('scanDevices', pairedDevices)
    BluetoothManager.scanDevices().then(
      (s) => { 
        try {
        var foundDs = JSON.parse(s);
        var found = foundDs.found
        var paired = foundDs.paired
        } catch (e) {
          //ignore
        }
        if (found && found.length) {
          var allDevise = foundDs.paired  
          console.log('scanDevices', foundDs)
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
        console.log('scanDevices22', allDevise)        
        setLoading(false);
      },
      (er) => {
        console.log('scanDeviceserer', er)
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
  
  console.log('pairedDevices pairedDevices', pairedDevices)
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
                        {boundAddress.length > 0 && (
                            <ItemList
                            label={name}
                            value={boundAddress}
                            onPress={() => unPair(boundAddress)}
                            actionText="Відключити"
                            color="#E9493F"
                            />
                        )}
                        {boundAddress.length < 1 && !loading ? (
                            <Text style={styles.printerInfo}>
                            Не підключено...
                            </Text>
                        ) : loading && <ActivityIndicator size="large" color="#45aa45" animating={true} />}
                        {boundAddress.length >= 0 && devicesBlock ?  <View>
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
                                  value={item.address}
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
                        {boundAddress.length > 0 ? <SamplePrint token={token} dataChange={dataChange} /> : <Text style={{color: 'blue'}} >Підключіть принтер</Text>}
                        </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </Modal>
        <View>
            {dataChange.length > 0 ? <View style={styles.containerNBTN} >

                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => checkBToN()}
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
      </View>
    )
})

const mapStateToProps = (state) => ({
    dataChange: state.dataChange,
    token: state.token,
    btPermission: state.btPermission,
})

export default connect(mapStateToProps)( PrintButton)

