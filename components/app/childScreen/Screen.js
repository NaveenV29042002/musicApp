import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Screen = ({children}) => {
  return (
    <View>
      <Text style={style.container}>{children}</Text>
    </View>
  )
}

const style= StyleSheet.create({
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight,
        width:400
    }
})

export default Screen