import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect, useDispatch } from 'react-redux'
import { setStorageId } from '../state/dataSlice'


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? -45 : 0,
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#d8fff2',
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginBottom: 15,
        marginTop: 25
    },
    button: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#45aa45",
        minWidth: "63%",
        minHeight: 50,
        elevation: 1,
        shadowOffset: { width: -3, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black',
        justifyContent: 'center',
    },
    textBtn: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 800,
    }
})


function MainScreen({ navigation, digStorages, groupStorages }) {
    const dispatch = useDispatch()
    const strId = groupStorages.map(elem => elem.id)
    console.log(strId)
    function renderFildsButton({ item }) {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setStorageId(item ? item.id : strId))
                    navigation.navigate('Поле', { title: item ? item.name : 'Оноківці'})
                }}
            >
                <Text
                    key={item ? item.id : 'Оноківці'}
                    style={styles.textBtn}
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                > {item ? item.name : 'Оноківці'} </Text>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Text
                    style={styles.text}
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                > Виберіть поле </Text>
                
                <FlatList
                    data={digStorages}
                    renderItem={renderFildsButton}
                    keyExtractor={item => item.id.toString()}
                    style={{padding: 10}}
                    ListFooterComponent={groupStorages ? renderFildsButton(false) : null}
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    digStorages: state.digStorages,
    groupStorages: state.groupStorages,
})

export default connect(mapStateToProps)(MainScreen)

