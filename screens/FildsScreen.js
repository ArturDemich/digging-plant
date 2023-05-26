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
        marginTop: 25
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#45aa45",
        minWidth: "63%",
        minHeight: 50,
        elevation: 3,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
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


function MainScreen({ navigation, digStorages, route }) {

    function renderFildsButton({ item }) {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Поле', { title: item.name, storageId: item.id, token: route.params.token })
                }}
            >
                <Text
                    key={item.id}
                    style={styles.textBtn}
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                > {item.name} </Text>
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
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    digStorages: state.digStorages,
})

export default connect(mapStateToProps)(MainScreen)

