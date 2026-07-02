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
  TextInput,
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
import { KEYLableGapStorage, KEYLableHeightStorage, KEYLableImg_XStorage, KEYLableImg_YStorage, KEYLableStorage, KEYPrinTypeStorage, PrinterType, SizeLabel } from './constatsPrinter';
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
    marginBottom: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(131, 131, 131, 0.28)',
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
  inputQty: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 14,
    minWidth: 50,
    maxWidth: 100,
    minHeight: 30,
    paddingVertical: 0,
    textAlign: "center",
    backgroundColor: "#fff",
    marginTop: 8,
    width: 70,
  },
  labeleSetingVal: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 3,
    paddingRight: 13,
    //width: 80,
    //height: 40,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(131, 131, 131, 0.18)",
    borderRadius: 5,
    shadowColor: "rgba(131, 131, 131, 0.67)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  const [settingOn, setSettingOn] = useState(false);
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(null);
  const [selectedHeightLabel, setSelectedHeightLabel] = useState(null);
  const [selectedGapImg_YLabel, setSelectedGap_YLabel] = useState(null);
  const [selectedGapImg_XLabel, setSelectedGap_XLabel] = useState(null);
  const [gapLabel, setGapLabel] = useState(null);
  const [selectedPrinterType, setSelectedPrinterType] = useState(null);
  const [isEditingGap, setIsEditingGap] = useState(false);
  const [isEditingW, setIsEditingW] = useState(false);
  const [isEditingH, setIsEditingH] = useState(false);
  const [isEditingY, setIsEditingY] = useState(false);
  const [isEditingX, setIsEditingX] = useState(false);
  const [moreSeting, setMoreSeting] = useState(false);

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

  const checkLabelStorHellper = async ({ storedValue, stateValue, defaultValue, setState, storageKey }) => {
    if (storedValue && !stateValue) {
      setState(storedValue)
    } else {
      await SecureStore.setItemAsync(storageKey, defaultValue);
      setState(defaultValue)
    }
  };

  const checkLabelSizeStor = async () => {
    if (Platform.OS !== 'web') {
      const label_W = await SecureStore.getItemAsync(KEYLableStorage);
      const label_H = await SecureStore.getItemAsync(KEYLableHeightStorage);
      const label_Gap = await SecureStore.getItemAsync(KEYLableGapStorage);
      const label_Y = await SecureStore.getItemAsync(KEYLableImg_YStorage);
      const label_X = await SecureStore.getItemAsync(KEYLableImg_XStorage);
      const printerType = await SecureStore.getItemAsync(KEYPrinTypeStorage);
      await checkLabelStorHellper({
        storedValue: label_W,
        stateValue: selectedSizeLabel,
        defaultValue: SizeLabel.Fifty.toString(),
        setState: setSelectedSizeLabel,
        storageKey: KEYLableStorage
      })
      await checkLabelStorHellper({
        storedValue: label_H,
        stateValue: selectedHeightLabel,
        defaultValue: '30',
        setState: setSelectedHeightLabel,
        storageKey: KEYLableHeightStorage
      })
      await checkLabelStorHellper({
        storedValue: label_Gap,
        stateValue: gapLabel,
        defaultValue: '3',
        setState: setGapLabel,
        storageKey: KEYLableGapStorage
      })
      await checkLabelStorHellper({
        storedValue: label_Y,
        stateValue: selectedGapImg_YLabel,
        defaultValue: '10',
        setState: setSelectedGap_YLabel,
        storageKey: KEYLableImg_YStorage
      })
      await checkLabelStorHellper({
        storedValue: label_X,
        stateValue: selectedGapImg_XLabel,
        defaultValue: '0',
        setState: setSelectedGap_XLabel,
        storageKey: KEYLableImg_XStorage
      })
      await checkLabelStorHellper({
        storedValue: printerType,
        stateValue: selectedPrinterType,
        defaultValue: PrinterType.TSC,
        setState: setSelectedPrinterType,
        storageKey: KEYPrinTypeStorage
      })
    }
  };

  const handleSetPropLabel = async ({ setStateEdit, storageKey, stateValue }) => {
    setStateEdit(false);
    console.log('handleSetGapLabel', stateValue)
    await SecureStore.setItemAsync(storageKey, stateValue);
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

  useEffect(() => {
    if (printOn && moreSeting) {
      setMoreSeting(false)
    }
  }, [printOn])

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

  const handleSetSizeLabel = async (w) => {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(KEYLableStorage, w.toString());
      await SecureStore.setItemAsync(KEYLableHeightStorage, '30');
      setSelectedSizeLabel(w.toString())
      setSelectedHeightLabel('30')
    }
  };

  const handleSetPrinterType = async (type) => {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(KEYPrinTypeStorage, type);
      setSelectedPrinterType(type)
    }
  };

  const item = true

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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            {(settingOn && selectedPrinterType === PrinterType.TSC) &&
              <TouchableVibrate
                style={[styles.labeleSetingVal, { marginTop: 0, marginBottom: 2, width: 90, alignSelf: 'flex-end' }]}
                onPress={() => setMoreSeting(!moreSeting)}
              >
                <MaterialIcons name="settings" size={16} color="rgb(83, 83, 83)" />
                <Text style={styles.labeleSizeText}>{moreSeting ? 'Менше' : 'Більше'}</Text>
              </TouchableVibrate>}

            <TouchableVibrate onPress={() => setSettingOn(!settingOn)} style={{ alignSelf: 'flex-end', padding: 5 }}>
              <MaterialIcons name="settings" size={24} color="rgb(83, 83, 83)" />
            </TouchableVibrate>
          </View>
          {settingOn &&
            <>
              <View style={{ justifyContent: 'space-between', paddingRight: 20, }}>
                <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Обери прінтер:</Text>
                <View style={styles.labeleSizeBlock}>
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
                    <Text style={{ fontSize: 13, fontWeight: 600, width: 80 }}>Маленький</Text>
                    {selectedPrinterType === PrinterType.ESC && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
                  </TouchableVibrate>
                </View>
              </View>

              <View style={{ justifyContent: 'space-between', paddingRight: 20, }}>
                <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Розмір етикетки:</Text>
                <View style={styles.labeleSizeBlock}>
                  <TouchableVibrate
                    style={[styles.labeleSizeItem, selectedSizeLabel === SizeLabel.Fifty.toString() && styles.labeleSizeLock]}
                    onPress={() => handleSetSizeLabel(SizeLabel.Fifty)}
                    disabled={selectedSizeLabel === SizeLabel.Fifty.toString()}
                  >
                    <MaterialCommunityIcons name="sticker-text-outline" size={24} color="rgb(83, 83, 83)" />
                    <Text style={styles.labeleSizeText}>50x30mm</Text>
                    {selectedSizeLabel === SizeLabel.Fifty.toString() && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
                  </TouchableVibrate>


                  <TouchableVibrate
                    style={[styles.labeleSizeItem, selectedSizeLabel === SizeLabel.Forty.toString() && styles.labeleSizeLock]}
                    onPress={() => handleSetSizeLabel(SizeLabel.Forty)}
                    disabled={selectedSizeLabel === SizeLabel.Forty.toString()}
                  >
                    <MaterialCommunityIcons name="sticker-text-outline" size={24} color="rgb(83, 83, 83)" />
                    <Text style={styles.labeleSizeText}>40x30mm</Text>
                    {selectedSizeLabel === SizeLabel.Forty.toString() && <Entypo name="check" size={24} color='rgba(106, 159, 53, 0.95)' />}
                  </TouchableVibrate>
                </View>
              </View>

              {selectedPrinterType === PrinterType.TSC && (
                moreSeting &&
                <>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, }}>
                    <View style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                      <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Ширина:</Text>
                      <InputValue
                        stateEdit={isEditingW}
                        setStateEdit={setIsEditingW}
                        inputValue={selectedSizeLabel}
                        setInputValue={setSelectedSizeLabel}
                        handleSetState={handleSetPropLabel}
                        storageKey={KEYLableStorage}
                      />
                    </View>

                    <View style={{ alignSelf: 'flex-start', marginBottom: 8, minWidth: 110 }}>
                      <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Висота:</Text>
                      <InputValue
                        stateEdit={isEditingH}
                        setStateEdit={setIsEditingH}
                        inputValue={selectedHeightLabel}
                        setInputValue={setSelectedHeightLabel}
                        handleSetState={handleSetPropLabel}
                        storageKey={KEYLableHeightStorage}
                      />
                    </View>
                  </View>


                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, }}>
                    <View style={{ alignSelf: 'flex-start', marginBottom: 8, minWidth: 110 }}>
                      <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Відступ зверху:</Text>
                      <InputValue
                        stateEdit={isEditingY}
                        setStateEdit={setIsEditingY}
                        inputValue={selectedGapImg_YLabel}
                        setInputValue={setSelectedGap_YLabel}
                        handleSetState={handleSetPropLabel}
                        storageKey={KEYLableImg_YStorage}
                      />
                    </View>

                    <View style={{ alignSelf: 'flex-start', marginBottom: 8, minWidth: 110 }}>
                      <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Відступ зліва:</Text>
                      <InputValue
                        stateEdit={isEditingX}
                        setStateEdit={setIsEditingX}
                        inputValue={selectedGapImg_XLabel}
                        setInputValue={setSelectedGap_XLabel}
                        handleSetState={handleSetPropLabel}
                        storageKey={KEYLableImg_XStorage}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, }}>
                    <View style={{ alignSelf: 'flex-start', marginBottom: 8, paddingBottom: 12, }}>
                      <Text style={{ fontWeight: 600, fontSize: 16, color: "rgb(56, 56, 56)", }}>Відступ:</Text>
                      <InputValue
                        stateEdit={isEditingGap}
                        setStateEdit={setIsEditingGap}
                        inputValue={gapLabel}
                        setInputValue={setGapLabel}
                        handleSetState={handleSetPropLabel}
                        storageKey={KEYLableGapStorage}
                      />
                    </View>
                  </View>
                </>
              )}
            </>
          }


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



const InputValue = ({ stateEdit, setStateEdit, inputValue, setInputValue, handleSetState, storageKey }) => {

  return (
    <View style={{ gap: 4, flexDirection: "row", alignItems: 'center' }}>
      {stateEdit ? (
        <View style={{ gap: 4, flexDirection: "row", }}>
          <TextInput
            style={styles.inputQty}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
            onBlur={async () => await handleSetState({
              setStateEdit,
              stateValue: inputValue,
              storageKey
            })}
            autoFocus={stateEdit}
          />
        </View>
      ) : (
        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableVibrate
            style={styles.labeleSetingVal}
            onPress={() => setStateEdit(true)}
          >
            <MaterialCommunityIcons name="pen-lock" size={16} color={'rgb(87, 87, 87)'} />
            <Text style={[styles.labeleSizeText, { color: 'rgb(70, 70, 70)', minWidth: 28, textAlign: 'center' }]}>{inputValue} mm</Text>
          </TouchableVibrate>
        </View>
      )}
    </View>
  )
};
