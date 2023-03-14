import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    filterOrders: [],
    filterPlants: [],
    filterAllPlants: [],
    currentFild: '',
    nameClientOrders: '',

    digStorages: [],
    stepOrders: []
}

export const dataSlice = createSlice({
    name: 'data_from_endpoint',
    initialState,
    reducers: {

        setDigStorages(state, action) {
            state.digStorages = action.payload
            console.log('sliceSStor', state.digStorages)
        },

        setStepOrders(state, action) {
            state.stepOrders = action.payload
            console.log('sliceSDig', state.stepOrders)
        },



        setData(state, action) {
            console.log('slice', action)
            state.data = action.payload
        },


        setFilterOrders(state, action) {
            // console.log('slice2', action)
            state.filterOrders = action.payload
        },

        setFilterPlants(state, action) {
            //console.log('slice3', action)
            state.filterPlants = action.payload
        },
        setFilterAllPlants(state, action) {
            //console.log('slice3', action)
            state.filterAllPlants = action.payload
        },

        setCurrentFild(state, action) {
            state.currentFild = action.payload
            //console.log('slice4', state.currentFild)
        },

        setNameClient(state, action) {
            state.nameClientOrders = action.payload
        }
    },
})

export const { setData, setFilterOrders, setFilterPlants, setCurrentFild, setNameClient, setFilterAllPlants, setDigStorages, setStepOrders } = dataSlice.actions

export default dataSlice.reducer