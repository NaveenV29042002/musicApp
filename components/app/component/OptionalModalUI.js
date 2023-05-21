import { View, Text,StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'

const OptionalModalUI = ({visible,onClose,onPlayPress,onPlayListPress,currentItem}) => {
    const {filename}= currentItem;
  return <>
    <StatusBar hidden={true} />
    <Modal animationType='slide' transparent visible={visible}>
       <View style={style.Container}>
        <Text numberOfLines={2} style={style.Title}>{filename}</Text>
        <View style={style.OptionContainer}>
          <TouchableWithoutFeedback onPress={onPlayPress}>  
           <Text style={style.Option}>Paly</Text> 
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPlayListPress}> 
           <Text style={style.Option}>Add a PlayList</Text>
          </TouchableWithoutFeedback> 
        </View>
       </View>
       <TouchableWithoutFeedback onPress={onClose} >
       <View style={style.ModelBG}/>
       </TouchableWithoutFeedback>
    </Modal>
    </>
  
}


const style=StyleSheet.create({
    Container:{
           position:'absolute',
           bottom:0,
           right:0,
           left:0,
           backgroundColor:'white',
           borderTopLeftRadius:20,
           borderTopRightRadius:20,
           zIndex:1000,

    },
    OptionContainer:{
           padding:20,
 
    },
    Title:{
        fontSize:16,
        fontWeight:'bold',
        padding:20,
        paddingBottom:0,
        color:'black',
       

    },
    Option:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        paddingVertical:10,
        letterSpacing:1
    },
    ModelBG:{
        position:'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0,
        backgroundColor:'black',
        opacity:0.2
    }
    
})

export default OptionalModalUI