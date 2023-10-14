import { connect, useDispatch } from "react-redux"
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { setFilterOrders } from "../state/dataSlice";



function Search({orders}) {
    const dispatch = useDispatch()
    const [searchText, onChangeText] = useState('')
    const [inputShow, setInputShow ] = useState(false)

    console.log('searchText', searchText)
    console.log('serach111', orders)
    
    const clearInput = () => {
        onChangeText('')
        dispatch(setFilterOrders([]))
    }
   
    useEffect(() => {     
        searchOrders()  
    }, [searchText])

    useEffect(() => {
        clearInput()
    }, [orders])

    const searchOrders = () => {    
        let filterOrders = []

        for (let i = 0; i < orders.length; i++) {   // всі замовлення      
            for (let arr in orders[i]) {            // одне замовлення 
               if(Array.isArray(orders[i][arr])) {  // якщо є масив             
                let array = orders[i][arr]
                let equle = false
                array.forEach(item => {             // 1об'єкт в масиві
                    if(equle) {
                        return
                    }
                    for (let key in item) {
                        if(equle) {
                            return
                        }
                        let obj = item[key]
                        if (typeof obj == 'object') {                                                        
                            for (let k in obj) {
                               // console.log('item[key]! ', obj[k])
                                if(obj[k].toLowerCase().includes(searchText.toLowerCase())) {
                                    equle = true
                                    filterOrders.push(orders[i])
                                    return
                                } 
                            }
                        } else {                               
                            //console.log('item[key]! strrr  ', obj.toString()) 
                            if(String(obj).toLowerCase().includes(searchText.toLowerCase())) {
                                return filterOrders.push(orders[i])
                            }                     
                        }                        
                    }                    
                })
               } else if ( typeof orders[i][arr] == 'string') {
                String(orders[i][arr]).toLowerCase().includes(searchText.toLowerCase()) ? filterOrders.push(orders[i]) : null
               } else if (typeof orders[i][arr] == 'object') {
                console.log('333333333333!!')
               }
            }            
        }        
        if(filterOrders.length === 0) {
            dispatch(setFilterOrders(null))
        } else {
            dispatch(setFilterOrders(filterOrders))
        }        
    }

    
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, inputShow && inputShow]}
                onChangeText={onChangeText}
                value={searchText} 
            />
            {searchText !== '' && (
                <TouchableOpacity onPress={() => clearInput()}>
                    <Text> X </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setInputShow(!inputShow)}>
                <MaterialIcons name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )

}

const mapStateToProps = state => ({
    orders: state.stepOrders,
    groupOrders: state.groupOrders,
})
export default connect(mapStateToProps)(Search)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    input: {
        borderWidth: 1,
        display: 'flex'
    },
    inputShow: {
        display: 'none'
    }
})