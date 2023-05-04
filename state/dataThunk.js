import { DataService } from "./dataService";
import {
  setDigStorages, setStepOrders,
  setSteps, setToken, setCurrentStep,
  setGroupOrders
} from "./dataSlice";


export const getOrdersStep = (stepId, storageId, token) => async (dispatch) => {
  // console.log('thunk', stepId, storageId, token)
  try {
    const res = await DataService.getStepOrders(stepId.id, storageId, token)
    //console.log(res)
    if (res.success) {

      dispatch(setStepOrders(res));
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("GetStep_ORDERS ERROR Thunk: " + JSON.stringify(error));
  }
}

export const getGroupOrdersThunk = (stepId, storageId, token) => async (dispatch) => {
  try {
    const res = await DataService.getGroupOrders(stepId.id, storageId, token)
    console.log('GroupThunk', res)
    if (res.success) {
      console.log('thunkGroup', res)
      dispatch(setGroupOrders(res));
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
      //console.log('thunkSTORAGE:', res)

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
      // console.log('thunkSTEP:', res)
      dispatch(setSteps(res))
      dispatch(setCurrentStep(res.data[0]))
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("Get_STEP ERROR Thunk: " + JSON.stringify(error));
  }
}

export const getTokenThunk = (log, pass) => async (dispatch) => {

  try {
    const res = await DataService.getToken(log, pass)
    if (res.success) {
      // console.log('thunkTOKEN: ', res)
      dispatch(setToken(res));
    } else {
      alert(res.errors[0])
    }
  } catch (error) {
    console.log("Get_STEP ERROR Thunk: " + JSON.stringify(error));
  }
}

export const setNextStepThunk = (token, storageId, currentstepId, orderId, productid, characteristicid, unitid, actionqty) => async () => {

  try {
    const res = await DataService.setNextStep(token, storageId, currentstepId, orderId, productid, characteristicid, unitid, actionqty)
    if (res.errors.length > 0) {
      alert(res.errors[0])

    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("Get_STEP ERROR ThunkSet: " + JSON.stringify(error));
  }
}

export const setNextStepGroupThunk = (token, dataOrders) => async () => {

  try {
    const res = await DataService.setNextStepGroup(token, dataOrders)
    if (res.errors.length > 0) {
      alert(res.errors[0])

    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("Get_STEP ERROR ThunkSet: " + JSON.stringify(error));
  }
}
