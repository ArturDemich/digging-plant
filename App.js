import React from 'react'
import Navigate from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './state/store'



export default function App() {

  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  )
}

