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
        },
        setSteps(state, action) {
            state.steps = action.payload.data
        },
        setToken(state, action) {
            state.token = action.payload.data
        },
        setStepOrders(state, action) {
            state.stepOrders = action.payload.data
        },
        setGroupOrders(state, action) {
            state.groupOrders = action.payload.data
        },
        setCurrentStep(state, action) {
            state.currentStep = action.payload
        },
        setStorageId(state, action) {
            state.currentStorageId = action.payload
        },
        setNotifications(state, action) {
            state.notifications = action.payload.data
        },
        setTotalQty(state, action) {
            state.totalOrderQty = action.payload.orders
            state.totalPlantQty = action.payload.plants
        },
        setDataChange(state, action) {
            const orders = state.dataChange
            const eix = orders.findIndex((value) => {
                return (value.orderId === action.payload.orderId &&
                    value.productid === action.payload.productid &&
                    value.characteristicid === action.payload.characteristicid)
            })

            if (eix > -1) {
                orders[eix] = action.payload
                state.dataChange = orders
            } else {
                state.dataChange = [...orders, action.payload]
            }
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