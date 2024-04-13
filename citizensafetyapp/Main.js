import React from 'react'
import AppNavigation from './Navigation/appNavigation'
import { PaperProvider } from 'react-native-paper';
function Main() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  )
}

export default Main