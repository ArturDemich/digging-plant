import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BluetoothTscPrinter, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { KEYLableStorage, KEYPrinTypeStorage, PrinterType, SizeLabel } from './constatsPrinter';
import TouchableVibrate from '../TouchableVibrate';

const printEscPos = async (labe, labelSize) => {
  await BluetoothEscposPrinter.printPic(labe, {
    width: labelSize === SizeLabel.Forty ? 320 : 390,   // 320 for 40mm; 390 for 50mm;
    left: labelSize === SizeLabel.Forty ? 40 : 0,        // 40 for 40mm; 0 for 50mm;
  })
  await BluetoothEscposPrinter.printText("\x1D\x0C", {});
};

export async function printreciept(labe) {
  const screenWidth = Math.floor(Dimensions.get('window').width);
  const labelWidth = await SecureStore.getItemAsync(KEYLableStorage);
  const printType = await SecureStore.getItemAsync(KEYPrinTypeStorage);

  let originalImgWidth;
  switch (screenWidth) {   //seted for 50mm
    case 800:
      originalImgWidth = 880
      break;
    case 490:
      originalImgWidth = 522
      break;
    case 411:
      originalImgWidth = 433
      break;
    case 392:
      originalImgWidth = 415
      break;
    default:
      originalImgWidth = screenWidth * 1.055
      break;
  };

  const scale = Number(labelWidth) / 50; // 0.8 if 40mm
  const imgWidth = Math.floor(originalImgWidth * scale);

  try {
    let options = {
      width: Number(labelWidth),
      height: 30,
      gap: 1,
      direction: BluetoothTscPrinter.DIRECTION.FORWARD,
      reference: [0, 0],
      tear: BluetoothTscPrinter.TEAR.ON,
      sound: 1,
      image: [{
        x: 0,
        y: 0,
        mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE,
        width: imgWidth,
        image: labe
      }],
    }
    printType === PrinterType.TSC && await BluetoothTscPrinter.printLabel(options)
    printType === PrinterType.ESC && await printEscPos(labe, Number(labelWidth))

  } catch (e) {
    alert(e.message || 'ERROR');
    console.log('ERROR', e)
  }
}

const SamplePrint = ({ press }) => {

  return (
    <View>
      <View style={styles.btn}>
        <TouchableVibrate
          style={[styles.buttonStep]}
          onPress={() => press()}
        >
          <MaterialCommunityIcons name="printer-wireless" size={24} color="snow" >
            <Text
              style={styles.textBtn}
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
            > Друкувати</Text>
          </MaterialCommunityIcons>
        </TouchableVibrate>
      </View>
    </View>
  );
};


export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 0,
  },
  textBtn: {
    color: 'white',
    fontSize: 14,
    fontWeight: 900,
  },
  buttonStep: {
    borderRadius: 10,
    backgroundColor: 'green',
    height: 40,
    padding: 5,
    opacity: 0.95,
    elevation: 5,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
});