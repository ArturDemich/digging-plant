import { createSlice } from '@reduxjs/toolkit'

const baseStorages = [{
    id: "1f7d8631-b1a5-11e3-942e-001de01b93ef",
    name: "Поле1 (збоку теплиці)"
},
{
    id: "bcaf3d50-85ff-11e5-ab1a-001d60fd7257",
    name: "Поле2 (з Смарагдами)"
},
{
    id: "e21ce3ae-0bf3-11e2-a49f-bd0c35283c28",
    name: "Поле3 (за 4 скл.)"
},
{
    id: "afb58d81-c310-11e9-81d4-00c12700489e",
    name: "Поле4 (за 3 скл.)"
},
{
    id: "859ba315-621a-11ea-8243-00c12700489e",
    name: "Поле5 (нове поле)"
}] 

const initialState = {
    digStorages: [],
    groupStorages: [],
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
            const storages = action.payload.data
            const baseS = []
            const digS = []
            
            for(let i = 0; i < storages.length; i++ ) {
                let exid = baseStorages.findIndex(elem => elem.id === storages[i].id)
                if(exid !== -1) {                    
                    baseS.push(storages[i])                    
                } else {
                    digS.push(storages[i])
                }                
            }
            state.digStorages = digS
            state.groupStorages = baseS
            console.log('slice333', digS, baseS)
        },
        setSteps(state, action) {
            state.steps = action.payload.data
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setStepOrders(state, action) {
            state.stepOrders = action.payload.data
        },
        setStepOrdersArr(state, action) {
            console.log('StepOrdersArr111', state.stepOrders)
            const stateOrders = state.stepOrders  
            const payloadOrders = action.payload.data
            console.log('StepOrdersArr-payload', payloadOrders)
            payloadOrders.forEach(elem => {
               stateOrders.push(elem) 
            });            
           
           
            state.stepOrders = stateOrders
            console.log('StepOrdersArr222', state.stepOrders)
        },
        setGroupOrders(state, action) {
            state.groupOrders = action.payload.data
        },
        setCurrentStep(state, action) {
            state.currentStep = action.payload
        },
        setStorageId(state, action) {
            state.currentStorageId = action.payload
            console.log('currentStorageId', state.currentStorageId)
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
                    color: '#00721B'
                },
                yellow: {
                    name: 'yellow',
                    color: '#1FBB43'
                },
                pink: {
                    name: 'pink',
                    color: '#83E499'
                },
                red: {
                    name: 'red',
                    color: '#C2DBC7'
                },
                purple: {
                    name: 'purple',
                    color: '#A8AFAA'
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
            state.totalPlantQty = 0
            state.totalOrderQty = 0
        },
    },
})

export const {
    setDigStorages, setStepOrders, setSteps, setToken,
    cleanState, setCurrentStep, setGroupOrders,
    setStorageId, setDataChange, clearDataChange,
    clearDataChangeItem, setNotifications, setTotalQty,
    setCurrentColorStep, setStepOrdersArr
} = dataSlice.actions

export default dataSlice.reducer