import { DataService } from "./dataService";
import { setData, setFilterAllPlants, setFilterOrders, setFilterPlants } from "./dataSlice";


export const getDataFromEndpoint = () => async (dispatch) => {
  try {
    const res = await DataService.getData();
    if (res) {
      console.log('thunk', res.data)
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
  console.log('thunkOrders', orderFilter)
  dispatch(setFilterOrders(orderFilter))
}


export const filterPlants = (prevState, fild, name) => (dispatch) => {
  const plantOrders = []
  prevState.filter(order => {
    if (name == order.nameClient) {
      for (let i = 0; i < order.orderItems.length; i++) {
        if (order.orderItems[i].placing == fild) {
          plantOrders.push(order.orderItems[i])
          console.log('thunk', plantOrders)
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
        console.log('thunkAll', orders)
      }
    }

  })
  dispatch(setFilterAllPlants(orders))
}