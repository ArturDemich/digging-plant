import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    PermissionsAndroid, 
    Platform,          
    ActivityIndicator,
    DeviceEventEmitter,
    NativeEventEmitter,        
    ScrollView,
    ToastAndroid,
    Button,
    Alert,
} from 'react-native'
import Modal from "react-native-modal";
import { connect, useDispatch } from 'react-redux'
import { getGroupOrdersThunk, getOrdersStep, setNextStepGroupThunk, setOrderLabels } from '../../state/dataThunk'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { clearDataChange } from '../../state/dataSlice'
import { useEffect, useState, useCallback } from 'react'
import { BluetoothEscposPrinter, BluetoothManager } from 'react-native-bluetooth-escpos-printer';
import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions'
//import { styles } from "./styles"
import ItemList from "./ItemList"
import SamplePrint from "./SamplePrint"
import { DataService } from '../../state/dataService'




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
    //flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
    width: '80%',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#8c9f91f2'
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


function PrintButton({ path, currentStorageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    /* const [availablePrinters, setAvailablePrinters] = useState([])
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
                  console.log('scanDevices11',  BluetoothManager.scanDevices())
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
                    console.log('scanDevicesError', er)
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
    
    console.log('PrintButton', BToN ) */

  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [boundAddress, setBoundAddress] = useState("");

  

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      (err) => {
        err;
      }
    );

    if (Platform.OS === "ios") {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadPaired(rsp);
        }
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundEvent(rsp);
        }
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName("");
          setBoundAddress("");
        }
      );
    } else if (Platform.OS === "android") {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadPaired(rsp);
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundEvent(rsp);
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

    console.log(pairedDevices.length);
    if (pairedDevices.length < 1) {
      scan();
      console.log("scanning...");
    } else {
      const firstDevice = pairedDevices[0];
      console.log('length  :' + pairedDevices.length);
      console.log(firstDevice);
      connect(firstDevice);

      // connect(firstDevice);
      // console.log(pairedDevices.length + "hello");
    }
  },[pairedDevices]);
  // deviceFoundEvent,pairedDevices,scan,boundAddress
  // boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan


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
      }
    },
    [pairedDevices]
  );
  // const deviceAlreadPaired = useCallback(
  //   async rsp => {
  //     try {
  //       var ds = null;
  //       if (typeof rsp.devices === 'object') {
  //         ds = rsp.devices;
  //       } else {
  //         try {
  //           ds = JSON.parse(rsp.devices);
  //         } catch (e) {}
  //       }
  //       if (ds && ds.length) {
  //         let pared = pairedDevices;
  //         if (pared.length < 1) {
  //           pared = pared.concat(ds || []);
  //         }
  //         setPairedDevices(pared);
  //       }
  //     } catch (error) {
  //       // Handle any errors that occurred during the asynchronous operations
  //       console.error(error);
  //     }
  //   },
  //   [pairedDevices],
  // );

  const deviceFoundEvent = useCallback(
    (rsp) => {
      var r = null;
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
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs]
  );

  // const connect = (row) => {
  //   setLoading(true);
  //   BluetoothManager.connect(row.address).then(
  //     (s) => {
  //       setLoading(false);
  //       setBoundAddress(row.address);
  //       setName(row.name || "UNKNOWN");
  //       console.log("Connected to device:", row.name);
  //     },
  //     (e) => {
  //       setLoading(false);
  //       alert(e);
  //     }
  //   );
  // };

  const connect = async (row) => {
    try {
      setLoading(true);
      await BluetoothManager.connect(row.address);
      setLoading(false);
      setBoundAddress(row.address);
      setName(row.name || 'UNKNOWN');
      console.log('Connected to device:', row);
    } catch (e) {
      setLoading(false);
      alert(e);
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

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      (s) => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      (er) => {
        setLoading(false);
        // ignore
      }
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: "HSD bluetooth meminta izin untuk mengakses bluetooth",
          message:
            "HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer",
          buttonNeutral: "Lain Waktu",
          buttonNegative: "Tidak",
          buttonPositive: "Boleh",
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const scanBluetoothDevice = async () => {
    setLoading(true);
    try {
      const request = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (
        request["android.permission.ACCESS_FINE_LOCATION"] === RESULTS.GRANTED
      ) {
        scanDevices();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

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
          animationOutTiming={700}
          swipeDirection={['left']}
          onSwipeComplete={() => setShow(!show)}
          style={{ margin: 1}}       
        > 
                <ScrollView style={styles.container}>
                    <View style={styles.bluetoothStatusContainer}>
                        <Text style={styles.bluetoothStatus(bleOpend ? "#47BF34" : "#A8A9AA")}>
                        Bluetooth {bleOpend ? "Active" : "Not Active"}
                            </Text>
                        </View>
                        {!bleOpend && (
                            <Text style={styles.bluetoothInfo}>Включіть bluetooth</Text>
                        )}
                        <Text style={styles.sectionTitle}>
                            Printer connected to the application:
                        </Text>
                        {boundAddress.length > 0 && (
                            <ItemList
                            label={name}
                            value={boundAddress}
                            onPress={() => unPair(boundAddress)}
                            actionText="Disconnect"
                            color="#E9493F"
                            />
                        )}
                        {boundAddress.length < 1 && (
                            <Text style={styles.printerInfo}>
                            There is no printer connected yet
                            </Text>
                        )}
                        <Text style={styles.sectionTitle}>
                            Bluetooth connected to this cellphone:
                        </Text>
                        {loading ? <ActivityIndicator animating={true} /> : null}
                        <View style={styles.containerList}>
                            {pairedDevices.map((item, index) => {
                            return (
                                <ItemList
                                key={index}
                                onPress={() => connect(item)}
                                label={item.name}
                                value={item.address}
                                connected={item.address === boundAddress}
                                actionText="Connect"
                                color="#00BCD4"
                                />
                            );
                            })}
                        </View>
                        <SamplePrint token={token} dataChange={dataChange} />
                        <Button onPress={() => scanBluetoothDevice()} title="Scan Bluetooth" />
                    <View style={{ height: 100 }} />
                </ScrollView>
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

