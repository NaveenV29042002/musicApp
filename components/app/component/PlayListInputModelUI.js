import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import React,{useState} from 'react'
import { Modal } from 'react-native'
import { TextInput } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native'

const PlayListInputModelUI = ({visible,onClose,onSubmit}) => {
    const[playListName,setPlayListName] =useState('');
    const handleOnsubmit = () =>{
        if(!playListName.trim()){
            onClose()
        }else{
            onSubmit(playListName)
            setPlayListName('')
            onClose()
        }
    }
  return (
    <Modal visible={visible} animationType="fade"transparent>
         <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text >Create New PlayList</Text>
                <TextInput value={playListName} onChangeText={(text)=>setPlayListName(text)} style={styles.input}/>
                <AntDesign name='check' size={24} color='red' style={styles.superIcon} onPress={handleOnsubmit} />
            </View>
          <TouchableWithoutFeedback onPress={onClose} >
            <View style={styles.ModalBG}/>
          </TouchableWithoutFeedback>
          </View>
    </Modal>
  )
}

export default PlayListInputModelUI


const {width} =Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'center',
       left:1.5,
       top:50
    },
    inputContainer:{
        width:width-20,
        height:200,
        borderRadius:10,
        backgroundColor:'',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:width-40,
        borderBottomWidth:1,
        borderBottomColor:'red',
        fontSize:16,
        paddingVertical:5
    },
    superIcon:{
        padding:10,
        backgroundColor:'blue',
        borderRadius:50,
        marginTop:15
    },
    ModalBG:{
        width:width-10,
        height:200,
        bottom:200,
        left:5,
        borderRadius:15,
        backgroundColor:'white',
        zIndex:-1
    }

})
