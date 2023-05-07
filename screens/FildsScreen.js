import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2f5f8',
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginBottom: 15,
        marginTop: 15,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#45aa45",
        fontSize: 25,
        fontWeight: "500",
        minWidth: "63%",
        minHeight: 50,
        textAlignVertical: 'center',
        color: 'white',
        elevation: 3,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#302f30'

    }
})


function MainScreen({ navigation, digStorages, route }) {

    const st = navigation.getState()
    console.log('Filds', st, digStorages, digStorages.length)

    function renderFildsButton({ item }) {

        return (
            <TouchableOpacity style={{ width: '100%' }} >
                <Text key={item.id} style={styles.button} title={item.name} onPress={() => {
                    navigation.navigate('Поле', { title: item.name, storageId: item.id, token: route.params.token })
                }} > {item.name} </Text>
            </TouchableOpacity>
        )
    }


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Text style={styles.text}> Виберіть поле </Text>
                <FlatList
                    data={digStorages}
                    renderItem={renderFildsButton}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    digStorages: state.digStorages,
})

export default connect(mapStateToProps)(MainScreen)

