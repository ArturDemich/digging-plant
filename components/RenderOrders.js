import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"
import shortid from "shortid"
import { DataService } from "../state/dataService"
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
        lineHeight: 20,
    },
    textStr: {
        fontWeight: 500,
    },
    checkBox: {
        height: 25,
        width: 25,
    },

})


function RenderOrders({ orders, token, rightToChange }) {
    const [selectedAllOrder, setSelectedAllOrder] = useState(false)
    const [comentInfo, setComentInfo] = useState('')
    const { customerName, orderNo, shipmentMethod, shipmentDate, products, orderId } = orders.item

    let qty = 0
    products.forEach(el => qty += el.qty)

    const getInfo = async () => {
        const res = await DataService.getOrderInfo(token, orderId)
        setComentInfo(res.data[0].comment)
        console.log(comentInfo, token)
    }

    useEffect(() => {
        getInfo()
        setSelectedAllOrder(false)
    }, [orders])
    console.log('renderOrders', comentInfo)
    return (
        <View>
            <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <View style={styles.orderInfo}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.orderClient}>{customerName}</Text>
                            <Checkbox
                                value={selectedAllOrder}
                                onValueChange={() => setSelectedAllOrder(!selectedAllOrder)}
                                style={[styles.checkBox, !rightToChange && { display: 'none' }]}
                            />
                        </View>
                        <View style={styles.viewGroup}>
                            <Text style={styles.orderNum}>Номер: <Text style={styles.textStr}>{orderNo}</Text> </Text>
                            <Text style={styles.orderShipment}>К-сть рослин: <Text style={styles.textStr}>{qty} шт</Text> </Text>
                        </View>
                        <View style={styles.viewGroup}>
                            <Text style={styles.orderShipment}>Спосіб: <Text style={styles.textStr}>{shipmentMethod}</Text> </Text>
                            <Text style={styles.orderShipment}>Відгрузка: <Text style={styles.textStr}>{shipmentDate}</Text> </Text>
                        </View>
                        {comentInfo.length > 0 ?
                            <Text>Коментар: <Text style={{ fontWeight: 800 }}> {comentInfo} </Text></Text> :
                            null
                        }
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
            </TouchableHighlight>
        </View>
    )
}

const mapStateToProps = state => ({
    token: state.token,
})

export default connect(mapStateToProps)(RenderOrders)