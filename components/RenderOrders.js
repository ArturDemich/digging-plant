import Checkbox from "expo-checkbox"
import { useState } from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import shortid from "shortid"
import RenderPlants from "./RenderPlants"


const styles = StyleSheet.create({
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black'
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
    },
    orderInfo: {
        height: 'auto',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 7,
        paddingLeft: 3,
        paddingRight: 5,
        paddingBottom: 3
    },
    orderClient: {
        height: 'auto',
        lineHeight: 20,
        paddingBottom: 5,
        fontWeight: 700,
        width: '94%'
    },
    viewGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderNum: {
        lineHeight: 20,
        paddingBottom: 1,
    },
    orderShipment: {
        height: 'auto',
        lineHeight: 20,
    },
    textStr: {
        fontWeight: 500,
    },
    productInfoBlock: {

    },
    checkBox: {
        height: 25,
        width: 25,
    },

})


function RenderOrders({ orders }) {
    const [selectedAll, setSelectedAll] = useState(false)

    const item = orders.item

    let qty = 0
    item.products.forEach(el => qty += el.qty)
    console.log('renderOrders', item)
    return (
        <View>
            <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <View style={styles.orderInfo}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.orderClient}>{item.customerName}</Text>
                            <Checkbox
                                value={selectedAll}
                                onValueChange={() => setSelectedAll(!selectedAll)}
                                style={styles.checkBox}
                            />
                        </View>
                        <View style={styles.viewGroup}>
                            <Text style={styles.orderNum}>Номер: <Text style={styles.textStr}>{item.orderNo}</Text> </Text>
                            <Text style={styles.orderShipment}>К-сть рослин: <Text style={styles.textStr}>{qty} шт</Text> </Text>
                        </View>
                        <View style={styles.viewGroup}>
                            <Text style={styles.orderShipment}>Спосіб: <Text style={styles.textStr}>{item.shipmentMethod}</Text> </Text>
                            <Text style={styles.orderShipment}>Відгрузка: <Text style={styles.textStr}>{item.shipmentDate}</Text> </Text>
                        </View>
                    </View>
                    <View style={styles.productInfoBlock}>
                        {item.products.map(elem =>
                            <RenderPlants
                                key={shortid.generate()}
                                orderId={item.orderId}
                                prodactElem={elem}
                                selectedAll={selectedAll}
                            />
                        )}
                    </View>

                </View>
            </TouchableHighlight>
        </View>
    )
}

export default RenderOrders