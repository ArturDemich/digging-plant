import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { memo } from 'react'


const styles = StyleSheet.create({
    containerNBTN: {
        elevation: 5,
        position: 'absolute', 
        left: 12,
        bottom: 5
    },
    textBtn: {
        color: 'white',
        fontSize: 14,
        fontWeight: 900,   
    },
    buttonStep: {
        borderRadius: 10,
        backgroundColor: 'gray',
        height: 40,
        padding: 5,               
        opacity: 0.95,
        elevation: 5,
        shadowColor: '#d70000',
        shadowOffset: { width: 0, height: 0 },        
        shadowOpacity: 0.9,
        shadowRadius: 3, 
    },   
})


const PrinterButton = memo(({ checkBToN, dataChange}) => { 
  
    return (
      <View >
            {dataChange.length > 0 ? <View style={styles.containerNBTN} >

                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => checkBToN()}
                >
                    <MaterialCommunityIcons name="printer-wireless" size={24} color="snow" >                    
                        <Text
                            style={styles.textBtn}
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                        > Друк</Text>
                    </MaterialCommunityIcons>
                </TouchableHighlight>
            </View> : null}        
      </View>
    )
})

const mapStateToProps = (state) => ({
    dataChange: state.dataChange
})

export default connect(mapStateToProps)( PrinterButton)

