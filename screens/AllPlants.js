import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Text, StyleSheet, View, FlatList, ActivityIndicator, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux'
import shortid from 'shortid'
import ButtonsBar from '../components/ButtonsBar'
import NextStepButton from '../components/NextStepButton'
import RenderPlantsGroup from '../components/RenderPlantsGroup'
import { getGroupOrdersThunk } from '../state/dataThunk'
import { MaterialCommunityIcons } from '@expo/vector-icons'



function AllPlantsScreen({ route, groupOrders, currentStep, totalPlantQty }) {
    const [loading, setLoading] = useState(true)
    const { storageId, token } = route.params
    const dispatch = useDispatch()

    const getGroupOrders = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 200))
        await dispatch(getGroupOrdersThunk(currentStep, storageId, token.token))
    }

    useFocusEffect(
        useCallback(() => {
            getGroupOrders().then(() => setLoading(false))
        }, [currentStep])
    )


console.log('lod-AllPl')
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoblock}>
                <MaterialCommunityIcons name="pine-tree" size={24} color="black">
                    <MaterialCommunityIcons name="pine-tree" size={18} color="black" />
                    <Text style={styles.textinfo}> всіх рослин: {totalPlantQty} </Text>
                </MaterialCommunityIcons>
            </View>
            {loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#45aa45" />
                </View> :
                groupOrders.length == 0 ?
                    <View style={styles.costLineWrapper}>
                        <Text
                            style={styles.noneData}
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                        >В цьому полі немає рослин з таким сатусом</Text>
                    </View> :
                    <FlatList
                        data={groupOrders}
                        renderItem={(plants) => <RenderPlantsGroup plants={plants} rightToChange={currentStep.rightToChange} />}
                        keyExtractor={() => shortid.generate()}
                        style={{ marginTop: -10, marginBottom: 15 }}
                        initialNumToRender='4'
                        maxToRenderPerBatch='4'
                    />
            }
            <NextStepButton path={route.name} />
            <ButtonsBar storageId={storageId} token={token} />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        groupOrders: state.groupOrders,
        currentStep: state.currentStep,
        totalPlantQty: state.totalPlantQty,
    }
}
export default connect(mapStateToProps, null)(AllPlantsScreen)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 3,
        marginTop: Platform.OS === 'ios' ? -45 : -10,
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5
    },
    textinfo: {
        color: 'black',
        fontSize: 13,
        fontWeight: 700,
    },
    infoblock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    loader: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        flex: 1
    },
    noneData: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 900,
        color: 'gray',
    },
})