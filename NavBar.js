import React from 'react'
import { Text, Platform, SafeAreaView } from 'react-native'
import NavBar, { NavTitle, NavButton } from 'react-native-nav'

export default function NavBarCustom() {
  return (
    <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
      <NavBar>
        <NavButton />
        <NavTitle>
          💬 Gifted Chat{'\n'}
          <Text style={{ fontSize: 10, color: '#aaa' }}></Text>
        </NavTitle>
        <NavButton />
      </NavBar>
    </SafeAreaView>
  )
}
