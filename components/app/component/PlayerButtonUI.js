import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const PlayerButtonUI = (props) => {
    
  const{
    iconType,size=40,
    iconColor="black",onPress,
  }=props
    
    const getIconName =(type)=>{  'ios-play'
        switch(type) {
             case 'PLAY':
             return 'ios-pause' ;
             case 'PAUSE':
             return 'ios-play';
             case 'NEXT':
             return  'play-skip-forward';
             case 'PREV':
             return 'ios-play-skip-back';    
        }
    }

  return (
    <Ionicons onPress={onPress} name={getIconName(iconType)} size={size} color={iconColor} {...props} />
  )
}

export default PlayerButtonUI

const styles = StyleSheet.create({})