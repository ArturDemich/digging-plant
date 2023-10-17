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
        setInputShow(!inputShow)
    }
   
    useEffect(() => {     
        console.log('useEffect')
        inputShow && searchText !== '' ? searchOrders() : null
    }, [searchText])

    /* useEffect(() => {
        //clearInput()
    }, [orders]) */

    const searchOrders = () => {    
        let filterOrders = []
        console.log('searchOrders')
        for (let i = 0; i < orders.length; i++) {   // всі замовлення      
            let equle = false
            for (let arr in orders[i]) {            // одне замовлення 
                if(equle) {
                    return
                }
                if(Array.isArray(orders[i][arr])) {  // якщо є масив             
                    let array = orders[i][arr]                    
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
                                    equle = true
                                    filterOrders.push(orders[i])
                                    return
                                }                     
                            }                        
                        }                    
                    })
               } else if ( typeof orders[i][arr] == 'string') {
                    if(String(orders[i][arr]).toLowerCase().includes(searchText.toLowerCase())) {
                        equle = true
                        filterOrders.push(orders[i])
                        return
                    } 
                //String(orders[i][arr]).toLowerCase().includes(searchText.toLowerCase()) ? filterOrders.push(orders[i]) : null
               } else if (typeof orders[i][arr] == 'object') {
                console.log('333333333333!!')
               }
               ///o
            } 
            
            ///
        }     
        console.log('555555555!!', filterOrders)   
        if(filterOrders.length === 0) {
            dispatch(setFilterOrders(null))
        } else {
            dispatch(setFilterOrders(filterOrders))
        }        
    }

    
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, inputShow && styles.inputShow]}
                onChangeText={onChangeText}
                value={searchText} 
            />
            {inputShow && (
                <TouchableOpacity onPress={() => clearInput()} style={styles.close}>
                    <Text style={{fontWeight: 700}}> X </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setInputShow(true)}>
                <MaterialIcons name="search" size={24} color="black" style={styles.icon} />
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
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'snow'
        
    },
    input: {
        borderWidth: 1,
        display: 'none',
        borderRadius: 5,
        borderColor: '#7b7b7b',
        paddingLeft: 5,
        width: '100%',
        minWidth: 130,
        maxWidth: 350,
        //flex: 1
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 100,
    },
    inputShow: {
        display: 'flex'
    },
    icon:{
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 5,
        flex: 1
    },
    close: {
        alignSelf: 'center',
        right: 21,    
    }
})