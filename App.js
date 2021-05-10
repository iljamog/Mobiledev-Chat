import React, { useEffect, useState } from 'react'
import AuthNavigator from './navigation/AuthNavigator'
import { Provider as PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <AuthNavigator />
    </PaperProvider>
  )
}
