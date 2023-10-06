import { connect } from "react-redux"
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";



function Search({orders}) {
    const [searchText, onChangeText] = useState('');
    console.log('searchText', searchText)
    console.log('serach111', orders)
    useEffect(() => {
        console.log('testtt', 'Шиндер Марія Сергіївна, 0674306280, Хмільник (Вінницька обл.)'.includes('шин'))
    }, [searchText])

    const searchOrders = () => {    
     const filterOrders = orders.filter((item) => {
            
            const customerName = item.customerName?.toLowerCase() || '' // Захист від undefined
            const productNames = item.products.map((elem) => elem.product.productName?.toLowerCase()) || '' // Захист від undefined
            console.log('serach222', customerName)
            return (
                customerName.includes(searchText.toLowerCase()) ||
                productNames.some((productName) => productName.includes(searchText.toLowerCase()))            
            );
    })
       
        return filterOrders
    }
    console.log('serach333', searchOrders())
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
    currentStep: state.currentStep,
    orders: state.stepOrders,
    currentStorageId: state.currentStorageId,
})
export default connect(mapStateToProps)(Search)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})