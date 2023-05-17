import { DataService } from "./dataService";
import {
  setDigStorages, setStepOrders,
  setSteps, setToken, setCurrentStep,
  setGroupOrders,
  setNotifications,
  setTotalQty,
  setCurrentColorStep
} from "./dataSlice";


export const getOrdersStep = (stepId, storageId, token) => async (dispatch) => {
  try {
    const res = await DataService.getStepOrders(stepId.id, storageId, token)
    if (res.success) {
      dispatch(setStepOrders(res))

      let productQty = 0
      res.data.forEach(elem => elem.products.forEach(el => productQty += el.qty))
      const total = {
        orders: res.data.length,
        plants: productQty
      }
      dispatch(setTotalQty(total))
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
    if (res.success) {
      dispatch(setGroupOrders(res))

      let productQty = 0
      res.data.forEach(elem => elem.orders.forEach(el => productQty += el.qty))
      const total = {
        orders: 0,
        plants: productQty
      }
      dispatch(setTotalQty(total))
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
      dispatch(setSteps(res))
      dispatch(setCurrentStep(res.data[0]))
      dispatch(setCurrentColorStep(res.data[0].theme))
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
      dispatch(setToken(res));
    } else {
      alert(res.errors[0])
    }
  } catch (error) {
    console.log("Get_STEP ERROR Thunk: " + JSON.stringify(error));
  }
}

export const getNotifiThunk = (token) => async (dispatch) => {
  try {
    const res = await DataService.getNotifi(token)
    if (res.success) {
      dispatch(setNotifications(res));
    } else {
      alert(res.errors[0])
    }
  } catch (error) {
    console.log("Get_STEP ERROR Thunk: " + JSON.stringify(error));
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


export const updateNotifiThunk = (token, messageid, mstatus) => async () => {
  console.log('jjjjjj')
  try {
    const res = await DataService.updateNotifi(token, messageid, mstatus)
    if (res.errors.length > 0) {
      alert(res.errors[0])
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("Get_STEP ERROR ThunkSet: " + JSON.stringify(error));
  }
}

export const deleteNotifiThunk = (token, messageid) => async () => {
  try {
    const res = await DataService.deleteNotifi(token, messageid)
    if (res.errors.length > 0) {
      alert(res.errors[0])
    } else {
      console.log('Something went wrong!', res.errors)
    }
  } catch (error) {
    console.log("Get_STEP ERROR ThunkSet: " + JSON.stringify(error));
  }
}