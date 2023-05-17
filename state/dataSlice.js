import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    digStorages: [],
    stepOrders: [],
    steps: [],
    token: [],
    currentStep: [],
    groupOrders: [],
    currentStorageId: '',
    currentColorStep: '',
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
        setCurrentColorStep(state, action) {
            const colorStepBtn = {
                green: {
                    name: 'green',
                    color: '#45aa45'
                },
                yellow: {
                    name: 'yellow',
                    color: '#62D16E'
                },
                pink: {
                    name: 'pink',
                    color: '#E9DA7E'
                },
                red: {
                    name: 'red',
                    color: '#FF8A70'
                },
                purple: {
                    name: 'purple',
                    color: '#E53935'
                }
            }
            switch (action.payload) {
                case colorStepBtn.green.name:
                    state.currentColorStep = colorStepBtn.green.color
                break;
                case colorStepBtn.yellow.name:
                    state.currentColorStep = colorStepBtn.yellow.color
                break;
                case colorStepBtn.pink.name:
                    state.currentColorStep = colorStepBtn.pink.color
                break;
                case colorStepBtn.red.name:
                    state.currentColorStep = colorStepBtn.red.color
                break;
                case colorStepBtn.purple.name:
                    state.currentColorStep = colorStepBtn.purple.color
                break;
                default:
                    alert('Color not defined!')
            }            
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
    clearDataChangeItem, setNotifications, setTotalQty,
    setCurrentColorStep
} = dataSlice.actions

export default dataSlice.reducer