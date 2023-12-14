import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import { useDispatch } from 'react-redux';
import { setOrderLabels } from '../../state/dataThunk';
import { MaterialCommunityIcons} from '@expo/vector-icons';


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
    const [labes, setLabes] = useState(null)
    const [loading, setLoading] = useState(true)

    const dataLabes = async () => {
      const data = await dispatch(setOrderLabels(token[0].token, dataChange))
      await setLabes(data)
      setLoading(false)
      console.log('dataLabes', data)
    }
    useEffect(() => {
      dataLabes()

      return () => setLabes(null)
    }, [])
   
  return (
    <View>         
      <View style={styles.btn}> 
        {loading && <ActivityIndicator size="large" color="#45aa45" animating={true} />}       
        {!loading && labes ? <TouchableHighlight
          style={[styles.buttonStep]}
          onPress={() => printreciept(labes)}
        >
          <MaterialCommunityIcons name="printer-wireless" size={24} color="snow" >                    
              <Text
                style={styles.textBtn}
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
              > Друкувати</Text>
          </MaterialCommunityIcons>
        </TouchableHighlight>
        : null
        }
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