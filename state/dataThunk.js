import { DataService } from "./dataService";
import { setData, setFilterAllPlants, setFilterOrders, setFilterPlants, setDigStorages, setStepOrders, setSteps } from "./dataSlice";


export const getOrdersStep = (stepId, storageId, token) => async (dispatch) => {
  console.log('thunk', stepId, storageId, token)
  try {
    const res = await DataService.getStepOrders(stepId, storageId, token)
    console.log(res)
    if (res.success) {

      dispatch(setStepOrders(res));
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("GetStep_ORDERS ERROR Thunk: " + JSON.stringify(error));
  }
}

export const getDigStorages = (token) => async (dispatch) => {

  try {
    const res = await DataService.getStoragesDig(token)
    if (res.success) {
      console.log('thunk', res)

      dispatch(setDigStorages(res));
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("GetDig_STORAGES ERROR Thunk: " + JSON.stringify(error));
  }
}

export const getStep = (token) => async (dispatch) => {

  try {
    const res = await DataService.getSteps(token)
    if (res.success) {
      console.log('thunk', res)
      dispatch(setSteps(res));
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("Get_STEP ERROR Thunk: " + JSON.stringify(error));
  }
}






export const getDataFromEndpoint = () => async (dispatch) => {
  try {
    const res = await DataService.getData();
    if (res) {
      //console.log('thunk', res.data)
      dispatch(setData(res.data));
    } else {
      console.log('Something went wrong!')
    }
  } catch (error) {
    console.log(error);
  }
}

export const filterOrders = (prevState, fild) => (dispatch) => {
  const orderFilter = []
  prevState.filter(order => {
    for (let i = 0; i < order.orderItems.length; i++) {
      if (order.orderItems[i].placing == fild) {
        orderFilter.push(order)
        break
      }
    }
  })
  // console.log('thunkOrders', orderFilter)
  dispatch(setFilterOrders(orderFilter))
}


export const filterPlants = (prevState, fild, name) => (dispatch) => {
  const plantOrders = []
  prevState.filter(order => {
    if (name == order.nameClient) {
      for (let i = 0; i < order.orderItems.length; i++) {
        if (order.orderItems[i].placing == fild) {
          plantOrders.push(order.orderItems[i])
          // console.log('thunk', plantOrders)
        }
      }
    }
  })
  dispatch(setFilterPlants(plantOrders))
}

export const filterAllPlants = (prevState, fild) => (dispatch) => {
  const orders = []
  prevState.filter(order => {

    for (let i = 0; i < order.orderItems.length; i++) {
      if (order.orderItems[i].placing == fild) {
        orders.push(order.orderItems[i])
        //console.log('thunkAll', orders)
      }
    }

  })
  dispatch(setFilterAllPlants(orders))
}