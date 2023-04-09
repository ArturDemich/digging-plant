//import CheckBox from "@react-native-community/checkbox"
import Checkbox from "expo-checkbox"
import { memo, useCallback, useState } from "react"
import { Text, StyleSheet, TouchableHighlight, View } from "react-native"
import shortid from "shortid"
import AllPlantsModal from "./modal/AllPlantsModal"
import RenderOrderByGroup from "./RenderOrderByGroup"


const styles = StyleSheet.create({
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        paddingBottom: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: '#52006A'
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 3,
        paddingRight: 3,
    },
    plantName: {
        height: 'auto',
        width: 'auto',
        fontSize: 16,
        fontWeight: '500',
        paddingBottom: 3,
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,

    },
    info: {
        flexDirection: 'row',
    },
    quantity: {
        height: 'auto',
        textAlignVertical: 'center',
        alignSelf: 'center',

    },
    statusDig: {
        height: 'auto',
        maxWidth: 130,
        textAlignVertical: 'center',
        fontSize: 13,
        color: 'white',
        fontWeight: 700,
        margin: 5
    },

    button: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#45aa45",
        minWidth: 100,
        textAlignVertical: 'center',
        alignSelf: 'center',
        margin: 2,
        height: 'auto',
        elevation: 3
    },
    changeinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderInfoBlock: {
        flexDirection: 'column',
        marginTop: 3,
        width: '100%'
    },
    orderInfo: {
        margin: 3,
        fontSize: 12,
        color: 'gray',
        fontWeight: 500,
    },
    checkBox: {
        height: 20,
        width: 20,
    },
})

function RenderPlantsGroup({ plants }) {
    const item = plants.item
    console.log('renderPlants', item)
    let qty = 0
    item.orders.forEach(elem => qty += elem.qty)
    const [checkBox, setCheckBox] = useState(false)

    return (
        <View>
            <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <Text style={styles.plantName}>{item.product.name}</Text>
                    <Text style={styles.characteristics}>{item.characteristic.name}</Text>
                    <View style={styles.info}>
                        <Text style={styles.quantity}> всього: <Text style={styles.textStr}> {qty} шт</Text></Text>
                    </View>
                    <Checkbox
                        value={checkBox}
                        onValueChange={() => setCheckBox(!checkBox)}
                        style={styles.checkBox}
                    />
                    <View style={styles.changeinfo}>
                        <View style={styles.orderInfoBlock}>
                            {item.orders.map(elem => <RenderOrderByGroup key={shortid.generate()} order={elem} />)}
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

        </View>
    )
}

export default memo(RenderPlantsGroup)