import React from 'react'
import Navigate from './navigation/AppNavigator'
import { Provider as StoreProvider } from 'react-redux'
import { store } from './state/store'



export default function App() {

  return (
    <StoreProvider store={store}>      
        <Navigate />      
    </StoreProvider>
  )
}

