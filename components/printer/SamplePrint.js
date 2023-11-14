import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import ImgToBase64 from 'react-native-image-base64';
import { Buffer } from 'buffer'


//import img from './img1.jpg'
import RNFS from 'react-native-fs'
import { Image, Asset  } from 'react-native';
import { useDispatch } from 'react-redux';
import { setOrderLabels } from '../../state/dataThunk';
import { useEffect } from 'react';
import { useState } from 'react';
const img = '../../assets/img1.jpg'
//import img from '../../assets/img1.jpg';


async function printreciept(lab) {  
//console.log('lab', lab)
//const base64Image =  Buffer.from(lab, 'binary').toString('base64')
const folderUri = `${RNFS.DownloadDirectoryPath}/printPdf/img1.jpg`
const imageBase64 = await RNFS.readFile(folderUri, 'base64');
//console.log('folderUri', imageBase64)
/* RNFS.write(img, folderUri)
      .then(() => {
        console.log('PDF-файл успішно збережено за шляхом:', filePath);
      })
      .catch((error) => {
        console.error('Помилка збереження PDF-файлу:', error);
      }) */



/* ImgToBase64.getBase64String(img)
  .then(base64String => console.log('base64String', base64String))
  .catch(err => console.log(err)); */
//console.log('base64Image', base64Image)

  try {   
    
let result = 'kkk'
    let options = {
      width: 530,
      height: 300,
      gap: 1,
      direction: BluetoothTscPrinter.DIRECTION.FORWARD,
      reference: [0, 0],
      tear: BluetoothTscPrinter.TEAR.ON,
      sound: 1,
      /* barcode: [{
        x: 120, 
        y:96, 
        type: BluetoothTscPrinter.BARCODETYPE.CODE128, 
        height: 40, 
        readable: 1, 
        rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, 
        code: '133334567890'
    }], */
    image: [{
      x: 170, 
      y: 0, 
      mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE,
      width: 440,      
      image: imageBase64
    }]
    };    
    //await BluetoothTscPrinter.printLabel(options)  // Друк зображення   
    await BluetoothEscposPrinter.printerInit()
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      )
      await BluetoothEscposPrinter.printPic(imageBase64, {width: 440})
  } catch (e) {
    alert(e.message || 'ERROR');
    console.log('ERROR', e)
  }
}

const SamplePrint = ({token, dataChange}) => {
    const dispatch = useDispatch()
    const [labes, setLabes] = useState()

    const dataLabes = async () => {
      const {dataBase64, data} =  await dispatch(setOrderLabels(token[0].token, dataChange))
      setLabes(data)
    }
    useEffect(() => {
      dataLabes()
    }, [])
   // console.log('dataLabes()', labes)
    /* const sendData = async () => {
        const dataLabes =  await dispatch(setOrderLabels(token[0].token, dataChange))
        await dispatch(clearDataChange())  
        return dataLabes 
    } */
  return (
    <View>
      <Text>Sample Print Instruction</Text>
      {/* <Image source={img}/> */}

      <View style={styles.btn}>
        <Button
          title="Print Receipt"
          onPress={() => printreciept(labes)}
        />
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});