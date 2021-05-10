import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import SignInStack from './SignInStack'
import SignOutStack from './SignOutStack'

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  function onAuthStateChanged(result) {
    setUser(result)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const authSubscriber = auth.onAuthStateChanged(onAuthStateChanged)
    return authSubscriber
  }, [])

  if (initializing) {
    return null
  }

  return user ? <SignInStack /> : <SignOutStack />
}
