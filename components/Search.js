import { connect, useDispatch } from "react-redux"
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { setFilterOrders } from "../state/dataSlice";



function Search({orders}) {
     const dispatch = useDispatch()
    const [searchText, onChangeText] = useState('');
    console.log('searchText', searchText)
    console.log('serach111', orders)
    useEffect(() => {
        
    }, [searchText])
    

    const searchOrders = () => {    
        let filterOrders = []

        for (let i = 0; i < orders.length; i++) {
            
            for (let arr in orders[i]) {
                //console.log('type', Array.isArray(orders[i][arr]))
               if(Array.isArray(orders[i][arr])) {                
                let array = orders[i][arr]
                array.forEach(item => {
                    for (let key in item) {
                        if (typeof item[key] == 'object') {
                            console.log('item[key]! ', item[key])
                        } else {
                            console.log('item[key]! str', )
                        }
                        
                    }
                    
                })
               } else if ( typeof orders[i][arr] == 'string') {
                orders[i][arr].toLowerCase().includes(searchText.toLowerCase()) ? filterOrders.push(orders[i]) : null
               } else if (typeof orders[i][arr] == 'object') {
                console.log('333333333333!!')
               }
            }

            
        }

        /* for (let i = 0; i < orders.length; i++) {
            let customerName = orders[i].customerName.toLowerCase()
            let date = orders[i].shipmentDate.toLowerCase()
            let shipment = orders[i].shipmentMethod.toLowerCase()
            let productNames = orders[i].products.map((elem) => elem.product.name)
           
            console.log('serach222', orders[i])
            if(
                shipment.includes(searchText.toLowerCase()) ||
                date.includes(searchText.toLowerCase()) ||
                productNames.some((productName) => productName.toLowerCase().includes(searchText.toLowerCase())) ||
                customerName.includes(searchText.toLowerCase()) 
            ) {
                filterOrders.push(orders[i])
            }
        }      */
        dispatch(setFilterOrders(filterOrders))
    }

    
    return (
        <View style={styles.container}>
            <TextInput
                style={{}}
                onChangeText={onChangeText}
                value={searchText}
                onBlur={() => searchOrders()}
            />
            <MaterialIcons name="search" size={24} color="black" />
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
    }
})