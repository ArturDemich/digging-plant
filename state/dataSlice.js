import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    digStorages: [],
    stepOrders: [],
    steps: [],
    token: [],
    currentStep: [],
    groupOrders: [],
    currentStorageId: '',
    dataChange: [],
    notifications: [],
    totalPlantQty: 0,
    totalOrderQty: 0,
}

export const dataSlice = createSlice({
    name: 'data_from_endpoint',
    initialState,
    reducers: {

        setDigStorages(state, action) {
            state.digStorages = action.payload.data
            // console.log('sliceSStor', state.digStorages)
        },

        setSteps(state, action) {
            state.steps = action.payload.data
            // console.log('sliceStep', state.steps)
        },
        setToken(state, action) {
            state.token = action.payload.data
            //console.log('sliceToken', state.token)
        },

        setStepOrders(state, action) {
            state.stepOrders = action.payload.data
            // console.log('sliceSDig', state.stepOrders) setGroupOrders
        },
        setGroupOrders(state, action) {
            state.groupOrders = action.payload.data
            console.log('sliceGroup', action.payload)
        },

        setCurrentStep(state, action) {
            state.currentStep = action.payload
            //console.log('sliceCurrentStep', state.currentStep)
        },

        setStorageId(state, action) {
            state.currentStorageId = action.payload
            console.log('slicestorageId', state.currentStorageId)
        },

        setNotifications(state, action) {
            state.notifications = action.payload.data
            console.log('slicesetNotifications', state.notifications)
        },
        setTotalQty(state, action) {
            state.totalOrderQty = action.payload.orders
            state.totalPlantQty = action.payload.plants
            console.log('slicesetTotalQty', state.totalOrderQty, state.totalPlantQty)
        },

        setDataChange(state, action) {
            const orders = state.dataChange
            console.log('sliceModalInput-1', action)

            const eix = orders.findIndex((value) => {
                return (value.orderId === action.payload.orderId &&
                    value.productid === action.payload.productid &&
                    value.characteristicid === action.payload.characteristicid)
            })
            console.log('sliceModalInput-2', eix)

            if (eix > -1) {
                orders[eix] = action.payload
                state.dataChange = orders
            } else {
                state.dataChange = [...orders, action.payload]
                console.log('sliceModalInput-else', action.payload)
            }
            console.log('sliceModalInput', state.dataChange)
        },



        clearDataChangeItem(state, action) {
            const orders = state.dataChange
            const eix = orders.findIndex((value) => {
                return value.orderId === action.payload.orderId &&
                    value.productid === action.payload.productid &&
                    value.characteristicid === action.payload.characteristicid
            })
            if (eix > -1) {
                const removed = orders.splice(eix, 1)
                state.dataChange = orders
            }
        },

        clearDataChange(state) {
            state.dataChange = []
        },
        cleanState(state) {
            state.token = []
            state.steps = []
            state.digStorages = []
            state.stepOrders = []
            state.currentStep = []
            state.groupOrders = []
            state.currentStorageId = ''
            state.dataChange = []
            state.notifications = []
            totalPlantQty = 0
            totalOrderQty = 0
        },
    },
})

export const {
    setDigStorages, setStepOrders, setSteps, setToken,
    cleanState, setCurrentStep, setGroupOrders,
    setStorageId, setDataChange, clearDataChange,
    clearDataChangeItem, setNotifications, setTotalQty
} = dataSlice.actions

export default dataSlice.reducer