import { Modal, StyleSheet, Text, View ,FlatList,Dimensions} from 'react-native'
import React from 'react'
import AudioListscreenUI from '../component/AudioListscreenUI'


const PlayListDetailUI = ({visible,playList,onClose}) => {
  
  return (
    <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
       <View style={styles.container}>
         <Text style={styles.title}>{playList.title}</Text>
         <FlatList contentContainerStyle={styles.listContainer} data={playList.audios} keyExtractor={item => item.id.toString()} 
                   renderItem={({item})=>(
                   <View style={{marginTop:10}}>
                      <AudioListscreenUI title={item.filename} duration={item.duration} />
                   </View>
                     )} 
                    />
       </View>
       <View style={[StyleSheet.absoluteFillObject,styles.modalBG]}/>
    </Modal>
  )
}

export default PlayListDetailUI

const {width,height} =Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        height:height-150,
        width:width-15,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    title:{
        textAlign:'center',
        fontSize:20,
        paddingVertical:5,
        fontWeight:'bold',
        color:'blue'
    },
    listContainer:{
       padding:20 
    },
    modalBG:{
        backgroundColor:'',
        zIndex:-1,
    }
})