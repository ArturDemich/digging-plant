import { connect, useDispatch } from "react-redux"
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { setFilterOrders } from "../state/dataSlice";
import { useNavigation, useRoute } from "@react-navigation/native";



function Search({orders, groupOrders, navigation}) {
    const dispatch = useDispatch()
    const [searchText, onChangeText] = useState('')
    const [inputShow, setInputShow ] = useState(false)
    const navig = useNavigation()
    const route = useRoute()

    //console.log('searchText', navigation)
    console.log('serach111', route.state?.index)
    
     const clearInput = async () => {
        await onChangeText('')
        await dispatch(setFilterOrders([]))
        await setInputShow(false)
    }
   
    useEffect(() => {     
        console.log('useEffect', inputShow, navig.getState())
        inputShow  ? searchOrders(route.state?.index === 1 ? groupOrders : orders) : null
    }, [searchText])

     useEffect(() => {        
        inputShow ? clearInput() : null
        const nav = navigation.getState()
        console.log('searchText!!!!!!!', nav)

        return () =>  clearInput() 

    }, [orders, groupOrders]) 

    const searchOrders = (dataOrder) => {    
        let filterOrders = []
        if(searchText === '' || searchText === ' ') {
            dispatch(setFilterOrders([]))
            return
        }
        console.log('searchOrders')
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
                                // console.log('item[key]! ', obj[k])
                                    if(obj[k].toLowerCase().includes(searchText.toLowerCase())) {
                                        equle = true
                                        filterOrders.push(dataOrder[i])
                                        return
                                    } 
                                }
                            } else {                               
                                //console.log('item[key]! strrr  ', obj.toString()) 
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