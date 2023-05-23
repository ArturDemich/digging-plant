import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"
import shortid from "shortid"
import { DataService } from "../state/dataService"
import RenderPlants from "./RenderPlants"
import { MaterialCommunityIcons } from '@expo/vector-icons'



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
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
        fontWeight: 900,
        fontSize: 15,
        width: '94%',
        textShadowRadius: 2
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
        fontSize: 12,
        fontWeight: 600
    },
    quantity: {
        height: 'auto',
        textAlignVertical: 'center',
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: 600
    },
    textStr: {
        fontWeight: 600,
    },
    checkBox: {
        height: 25,
        width: 25,
    },

})


function RenderOrders({ orders, token, rightToChange, currentColor }) {
    const [selectedAllOrder, setSelectedAllOrder] = useState(false)
    const [comentInfo, setComentInfo] = useState('0')
    const { customerName, orderNo, shipmentMethod, shipmentDate, products, orderId } = orders.item

    let qty = 0
    products.forEach(el => qty += el.qty)

    const getInfo = async () => {
        const res = await DataService.getOrderInfo(token, orderId)
        setComentInfo(res.data[0].comment)
    }

    useEffect(() => {
        getInfo()
        setSelectedAllOrder(false)
    }, [orders])

    return (        
            <View style={styles.rowFront} >
                <View style={styles.costLineWrapper}>
                    <View style={styles.orderInfo}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.orderClient}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            >{customerName}</Text>
                            {rightToChange ?
                                <Checkbox
                                    value={selectedAllOrder}
                                    color='#45aa45'
                                    onValueChange={() => setSelectedAllOrder(!selectedAllOrder)}
                                    style={styles.checkBox}
                                /> : null}
                        </View>
                        <View style={styles.viewGroup}>
                            <Text
                                style={styles.orderShipment}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            ><Text style={styles.textStr}>{shipmentMethod}</Text> </Text>
                            <MaterialCommunityIcons name="pine-tree" size={20} color="black">
                                <MaterialCommunityIcons name="pine-tree" size={14} color="black" />
                                <Text
                                    style={styles.quantity}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                > {qty} шт</Text>
                            </MaterialCommunityIcons>
                        </View>
                        <View style={styles.viewGroup}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={22} color="black" >
                                <Text
                                    style={styles.orderShipment}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                > {shipmentDate}</Text>
                            </MaterialCommunityIcons>
                            <Text
                                style={styles.orderNum}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            >номер: <Text style={styles.textStr}>{orderNo}</Text> </Text>
                        </View>                        
                            <Text
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            >коментар: <Text
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                                style={{ fontWeight: 800, fontSize: 12 }}
                            > {comentInfo} </Text></Text> 
                    </View>
                    <View >
                        {products.map(elem =>
                            <RenderPlants
                                key={shortid.generate()}
                                orderId={orderId}
                                prodactElem={elem}
                                selectedAllOrder={selectedAllOrder}
                            />
                        )}
                    </View>
                </View>
            </View>        
    )
}

const mapStateToProps = state => ({
    token: state.token,
    currentColor: state.currentColorStep,
})

export default connect(mapStateToProps)(RenderOrders)