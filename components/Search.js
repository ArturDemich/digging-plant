import { connect, useDispatch } from "react-redux"
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import { setFilterOrders, setFilterPlants, setFilterQty } from "../state/dataSlice";
import { useRoute } from "@react-navigation/native";



function Search({orders, groupOrders}) {
    const dispatch = useDispatch()
    const [searchText, onChangeText] = useState('')
    const [inputShow, setInputShow ] = useState(false)
    const route = useRoute()
    const inputRef = useRef(null)
    
     const clearInput = async () => {
        await onChangeText('')
        await dispatch(setFilterOrders([]))
        await dispatch(setFilterPlants([]))
        await dispatch(setFilterQty({
            orders: null,
            plants: null
          }))
        await setInputShow(false)
    }

    useEffect(() => {
        inputShow ? inputRef.current.focus() : null
    }, [inputShow])
   
    useEffect(() => {     
        inputShow  ? searchOrders(route.state?.index === 1 ? groupOrders : orders) : null
    }, [searchText])

     useEffect(() => {        
        inputShow ? clearInput() : null
        return () =>  clearInput() 
    }, [orders, groupOrders]) 

    const searchOrders = (dataOrder) => { 
        let filterOrders = []
        if(searchText === '' || searchText === ' ') {
            route.state?.index === 1 ? dispatch(setFilterPlants([])) : dispatch(setFilterOrders([]))
            return
        }
        for (let i = 0; i < dataOrder.length; i++) {   // всі замовлення      
            let equle 
            for (let arr in dataOrder[i]) {            // одне замовлення 
                 if(equle) {
                    break
                } 
                if(Array.isArray(dataOrder[i][arr])) {  // якщо є масив             
                    let array = dataOrder[i][arr]                    
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
                                    if(obj[k].toLowerCase().includes(searchText.toLowerCase())) {
                                        equle = true
                                        filterOrders.push(dataOrder[i])
                                        return
                                    } 
                                }
                            } else {                               
                                if(String(obj).toLowerCase().includes(searchText.toLowerCase())) {
                                    equle = true
                                    filterOrders.push(dataOrder[i])
                                    return
                                }                     
                            }                        
                        }                    
                    })
               } else if ( typeof dataOrder[i][arr] == 'string') {
                    if(String(dataOrder[i][arr]).toLowerCase().includes(searchText.toLowerCase())) {
                        equle = true
                        filterOrders.push(dataOrder[i])
                    } 
               } else if (typeof dataOrder[i][arr] == 'object') {
                let obj = dataOrder[i][arr]
                for (let k in obj) {                    
                    if(obj[k].toLowerCase().includes(searchText.toLowerCase())) {
                        equle = true
                        filterOrders.push(dataOrder[i])
                    } 
                }                
               }               
            } 
            
        }     
        if(filterOrders.length === 0) {
            dispatch(setFilterQty({
                orders: 0,
                plants: 0
              }))
            if(route.state?.index === 1) {
                dispatch(setFilterPlants(null))                
            } else {
                dispatch(setFilterOrders(null))
            }
        } else {
            let qtyP = 0
            const total = {
                orders: 0,
                plants: 0
              }
              route.state?.index === 1 ? 
              filterOrders.forEach(plant => plant.orders.forEach(order => qtyP += order.qty)) :
              filterOrders.forEach(order => order.products.forEach(prodact => qtyP += prodact.qty))
              
              total.orders = filterOrders.length
              total.plants = qtyP
              dispatch(setFilterQty(total))
            if(route.state?.index === 1) {
                dispatch(setFilterPlants(filterOrders))                
            } else {
                dispatch(setFilterOrders(filterOrders))
            }
        }        
    }

    
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, inputShow && styles.inputShow]}
                onChangeText={onChangeText}
                value={searchText} 
                ref={inputRef}
            />
            {inputShow && (
                <TouchableOpacity onPress={() => clearInput()} style={styles.close}>
                    <Text style={{fontWeight: 700}}> X </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setInputShow(true)} style={{height: '100%', justifyContent: 'center'}} >
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
        alignItems: 'center',
        height: 56,

        
    },
    input: {
        borderWidth: 1,
        display: 'none',
        borderRadius: 5,
        borderColor: '#7b7b7b',
        minWidth: 160,
        maxWidth: 200,
        height: 32,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 100,
        elevation: 90,
        alignSelf: 'flex-end',
        backgroundColor: 'snow',
        left: 28,
        paddingLeft: 5
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
        marginLeft: 3,
        marginRight: 3,

    },
    close: {
        alignItems: 'center',
        right: 3,   
        top: 11 ,
        height: 60,
        width: 30,
        justifyContent: 'center'
    }
})