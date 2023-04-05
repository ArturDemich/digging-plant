import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    digStorages: [],
    stepOrders: [],
    steps: [],
    token: [],
    currentStep: [],
    groupOrders: [],
    currentStorageId: '',
    modalInput: []
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

        setModalInput(state, action) {
            const orders = state.modalInput
            console.log('sliceModalInput-1', action)
            const eix = orders.findIndex((value) => {
                return value.orderId === action.payload.orderId
            })
            // console.log('sliceModalInput-2', eix)
            if (eix > -1) {
                orders[eix] = action.payload
                //console.log('sliceModalInput-if', orders)
                state.modalInput = orders
            } else {
                state.modalInput = [...orders, action.payload]
                console.log('sliceModalInput-else', action.payload)
            }
            console.log('sliceModalInput', state.modalInput)
        },

        clearModalInput(state) {
            state.modalInput = []
        },
        cleanState(state) {
            state.token = []
            state.steps = []
            state.digStorages = []
            state.stepOrders = []
            state.currentStep = []
            state.groupOrders = []
            state.currentStorageId = ''
            state.modalInput = []
        },
    },
})

export const {
    setDigStorages, setStepOrders, setSteps, setToken,
    cleanState, setCurrentStep, setGroupOrders,
    setStorageId, setModalInput, clearModalInput
} = dataSlice.actions

export default dataSlice.reducer