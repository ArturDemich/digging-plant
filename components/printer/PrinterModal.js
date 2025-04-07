import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  DeviceEventEmitter,
  ToastAndroid,
  Alert,
  FlatList,
  Pressable,
} from 'react-native'
import Modal from "react-native-modal";
import { connect, useDispatch } from 'react-redux'
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { setBTPermission } from '../../state/dataSlice'
import { useEffect, useState, useCallback, memo } from 'react'
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';
import ItemList from "./ItemList"
import SamplePrint from "./SamplePrint"
import { useBluetoothPermissions } from '../../hooks/useBTPermission';
import * as SecureStore from 'expo-secure-store';
import PrinterButton from './PrinterButton';
import { PermissionsAndroid } from 'react-native';
import LabelImgShot from './LabelImgShot';
import { KEYLableStorage, KEYPrinTypeStorage, PrinterType, SizeLabel } from './constatsPrinter';
import TouchableVibrate from '../TouchableVibrate';




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
    width: '85%',
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(222, 236, 225, 0.96)" //'#97bba9d9'
  },
  containerList: { height: 100 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
  labeleSizeBlock: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 8
  },
  labeleSizeItem: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 3,
    width: 110,
    height: 40,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(131, 131, 131, 0.18)",
    borderRadius: 5,
    shadowColor: "rgba(131, 131, 131, 0.67)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  labeleSizeText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 500,
    marginRight: 0,
  },
  labeleSizeLock: {
    elevation: 0,
    borderColor: 'unset',
    borderWidth: 0,
    shadowColor: 'unset',
    backgroundColor: "rgba(255, 255, 255, 0.39)",
  },
})



const PrinterModal = memo(({ btPermission }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [pairedDevices, setPairedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [boundAddress, setBoundAddress] = useState("");
  const [devicesBlock, setDevicesBlock] = useState(true);
  const [printOn, setPrintOn] = useState(false);
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(null);
  const [selectedPrinterType, setSelectedPrinterType] = useState(null);
  const [settingOn, setSettingOn] = useState(false);

  const alertBToN = () => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        if (!enabled) {
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
  };

  const checkLabelSizeStor = async () => {
    if (Platform.OS !== 'web') {
      const size = await SecureStore.getItemAsync(KEYLableStorage);
      const printerType = await SecureStore.getItemAsync(KEYPrinTypeStorage);
      if (size && printerType) {
        !selectedSizeLabel && setSelectedSizeLabel(Number(size))
        !selectedPrinterType && setSelectedPrinterType(printerType)
      } else {
        await SecureStore.setItemAsync(KEYLableStorage, SizeLabel.Forty.toString());
        await SecureStore.setItemAsync(KEYPrinTypeStorage, PrinterType.TSC);
        setSelectedSizeLabel(SizeLabel.Forty)
        setSelectedPrinterType(PrinterType.TSC)
      }
    }
  };

  useEffect(() => {
    checkLabelSizeStor();

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
  }, []);

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
    if (Platform.OS === 'android') {
      printerAddress = await SecureStore.getItemAsync('printerAddress')
      printerName = await SecureStore.getItemAsync('printerName')
      row.address = printerAddress
      row.name = printerName

      if (printerAddress?.length > 0) {
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
        } catch (e) { }
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
            if (duplicated == -1) {
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
    )
  };

  const handleSetSizeLabel = async (size) => {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(KEYLableStorage, size.toString());
      setSelectedSizeLabel(size)
    }
  };

  const handleSetPrinterType = async (type) => {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(KEYPrinTypeStorage, type);
      setSelectedPrinterType(type)
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
        animationOutTiming={70}
        swipeDirection={['left']}
        onSwipeComplete={() => setShow(!show)}
        style={{ margin: 1 }}
      >
        <View style={styles.container}>
        <TouchableVibrate onPress={() => setSettingOn(!settingOn)} style={{alignSelf: 'flex-end', padding: 5}}>
              <MaterialIcons name="settings" size={24} color="rgb(83, 83, 83)" />
        </TouchableVibrate>
          {settingOn &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, }}>
            <View style={styles.labeleSizeBlock}>
              <Text style={{ fontWeight: 600, fontSize: 14, color: "rgb(56, 56, 56)", }}>Розмір етикетки:</Text>
              <TouchableVibrate
                style={[styles.labeleSizeItem, selectedSizeLabel === SizeLabel.Fifty && styles.labeleSizeLock]}
                onPress={() => handleSetSizeLabel(SizeLabel.Fifty)}
                disabled={selectedSizeLabel === SizeLabel.Fifty}
              >
                <MaterialCommunityIcons name="sticker-text-outline" size={24} color="rgb(83, 83, 83)" />
                <Text style={styles.labeleSizeText}>50x30mm</Text>
                {selectedSizeLabel === SizeLabel.Fifty && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
              </TouchableVibrate>


              <TouchableVibrate
                style={[styles.labeleSizeItem, selectedSizeLabel === SizeLabel.Forty && styles.labeleSizeLock]}
                onPress={() => handleSetSizeLabel(SizeLabel.Forty)}
                disabled={selectedSizeLabel === SizeLabel.Forty}
              >
                <MaterialCommunityIcons name="sticker-text-outline" size={24} color="rgb(83, 83, 83)" />
                <Text style={styles.labeleSizeText}>40x30mm</Text>
                {selectedSizeLabel === SizeLabel.Forty && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
              </TouchableVibrate>
            </View>

            <View style={styles.labeleSizeBlock}>
              <Text style={{ fontWeight: 600, fontSize: 14, color: "rgb(56, 56, 56)", }}>Обери прінтер:</Text>
              <TouchableVibrate
                style={[styles.labeleSizeItem, { gap: 3 }, selectedPrinterType === PrinterType.TSC && styles.labeleSizeLock]}
                onPress={() => handleSetPrinterType(PrinterType.TSC)}
                disabled={selectedPrinterType === PrinterType.TSC}
              >
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name="printer-wireless" size={22} color="rgb(83, 83, 83)" />
                  <Text style={{ fontSize: 6 }}>(TSC)</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: 600, width: 80 }}>Великий </Text>
                {selectedPrinterType === PrinterType.TSC && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
              </TouchableVibrate>


              <TouchableVibrate
                style={[styles.labeleSizeItem, { gap: 3 }, selectedPrinterType === PrinterType.ESC && styles.labeleSizeLock]}
                onPress={() => handleSetPrinterType(PrinterType.ESC)}
                disabled={selectedPrinterType === PrinterType.ESC}
              >
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name="printer-pos" size={22} color="rgb(83, 83, 83)" />
                  <Text style={{ fontSize: 6 }}>(ESC)</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 600, width: 80}}>Маленький</Text>
                {selectedPrinterType === PrinterType.ESC && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
              </TouchableVibrate>
            </View>
          </View> }


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
          {boundAddress?.length >= 0 && devicesBlock ?
            <View style={{ maxHeight: 380, paddingBottom: 10 }}>
              <Text style={styles.sectionTitle}>
                Доступні пристрої:
              </Text>
              <FlatList
                data={pairedDevices}
                keyExtractor={(item) => item.address}
                renderItem={({ item }) => (
                  <Pressable>
                    <ItemList
                      onPress={() => {
                        connect(item)
                        setPrinterSStore(item)
                      }}
                      label={item.name}
                      connected={item.address === boundAddress}
                      actionText="Підключити"
                      color="#00BCD4"
                    />
                  </Pressable>
                )}
                ListEmptyComponent={<View><Text>Не знайдено пристроїв</Text></View>}
              />
            </View> : null}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableVibrate
              style={[styles.buttonStep, { backgroundColor: 'blue', width: 100 }]}
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
            </TouchableVibrate>
            {boundAddress?.length > 0 ? <SamplePrint press={() => setPrintOn(true)} /> : <Text style={{ color: 'blue' }} >Підключіть принтер</Text>}
          </View>
          <View style={{ height: 100 }} />
          {printOn && <LabelImgShot labelOff={() => setPrintOn(false)} />}
        </View>
      </Modal>
      <PrinterButton checkBToN={() => checkBToN()} />

    </View>
  )
})

const mapStateToProps = (state) => ({
  btPermission: state.btPermission,
})

export default connect(mapStateToProps)(PrinterModal)

