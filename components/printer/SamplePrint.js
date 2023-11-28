import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import { useDispatch } from 'react-redux';
import { setOrderLabels } from '../../state/dataThunk';
import { useEffect } from 'react';
import { useState } from 'react';


async function printreciept(labe) {  
  const images = labe.images
  console.log('lab', labe)

  images.forEach(async image =>  {
    try { 
      let options = {
        width: 52,
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
        width: 430,      
        image: image
      }],    
      }
      await BluetoothTscPrinter.printLabel(options)  // Друк зображення   
      
    } catch (e) {
      alert(e.message || 'ERROR');
      console.log('ERROR', e)
    }
  });  
}

const SamplePrint = ({token, dataChange}) => {
    const dispatch = useDispatch()
    const [labes, setLabes] = useState()

    const dataLabes = async () => {
      const data = await dispatch(setOrderLabels(token[0].token, dataChange))
      await setLabes(data)
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