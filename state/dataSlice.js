import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    digStorages: [],
    stepOrders: [],
    steps: [],
    token: [],
    currentStep: [],
    groupOrders: [],
    currentStorageId: ''
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


        cleanState(state) {
            state.token = []
            state.steps = []
            state.digStorages = []
            state.stepOrders = []
            state.currentStep = []
            state.groupOrders = []
            state.currentStorageId = ''
        },
    },
})

export const {
    setDigStorages, setStepOrders, setSteps, setToken,
    cleanState, setCurrentStep, setGroupOrders,
    setStorageId
} = dataSlice.actions

export default dataSlice.reducer