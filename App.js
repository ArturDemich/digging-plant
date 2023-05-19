import React from 'react'
import Navigate from './navigation/AppNavigator'
import { Provider as StoreProvider } from 'react-redux'
import { store } from './state/store'
import { StatusBar } from 'react-native'



export default function App() {

  return (
    <StoreProvider store={store}>
      <StatusBar hidden={false} barStyle='dark-content' backgroundColor='white' />
      <Navigate />
    </StoreProvider>
  )
}

