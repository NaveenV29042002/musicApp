import { View, Text, StyleSheet ,Dimensions, ScrollView, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getThumbnailTextContainer = (filename) => filename [0];

const convertTime = minutes =>{
    if (minutes){
  
  const hrs = minutes / 60;
  const minute = hrs.toString().split('.')[0];
  const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
  const sec = Math.ceil((60 *percent) / 100);
  if (parseInt(minute) < 10 && sec < 10) 
  { 
    return `0${minute}:0${sec}`;
  }
  if (parseInt(minute) < 10) {
    return `0${minute}:${sec}`;
  }
  if (sec < 10){
    return `${minute}:0${sec}`;
  }
  return `${minute}:${sec}`;
  }
  };


  const renderPlayPauseIcon = isPlaying =>{
    if(isPlaying)return <Ionicons name="ios-pause-sharp" size={24} color="black" /> 
    return <Ionicons name="play" size={24} color="black" />
    
    
  }

const AudioListscreenUI = ({title,duration,onOptionPress,onAudioPress,isPlaying,activeListItem}) => {
  return (
    <>
    
    <View style={styles.container}>
     <TouchableWithoutFeedback onPress={onAudioPress}>
      <View style={styles.leftContainer}>
        <View style = {[styles.thumbnailContainer,{backgroundColor: activeListItem?'#00C853':'#B0BEC5'}]}>
           <Text style={styles.thumbnailTextContainer}>
            {activeListItem ? renderPlayPauseIcon(isPlaying) : getThumbnailTextContainer(title)}
           </Text>  
        </View>
        <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text numberOfLines={1} style={styles.title1}>{convertTime(duration)}</Text>
        </View>
      </View>
     </TouchableWithoutFeedback>  
         <View style={styles.rightcontainer}>
             <MaterialCommunityIcons onPress={onOptionPress}  name="dots-vertical" size={28} color="black" />
         </View>
    </View>
    <View style={styles.seprator}/>
    </>
  )
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        alignSelf:'center',
        width:width-35,
        marginTop:20,
        alignItems:'center',
        marginBottom:10,
    },
    leftContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    thumbnailContainer:{
        width:55,
        height:55,
        borderWidth:0.1,
        borderRadius:30,
        borderColor:'#424242',
        backgroundColor: "#E0E0E0",
        justifyContent:'center',
        alignItems:'center'
    },
    thumbnailTextContainer:{
        fontWeight:'bold',
        fontSize:21,
        bottom:1.8
    },
    titleContainer:{
        width:width - 140,
        left:10
    },
    title:{
        fontSize:15,
    },
    title1:{
        fontSize:14,
        color:"#424242",
        top:1
    },
    rightcontainer:{
        left:14
    },
    seprator:{
        width:width-65,
        backgroundColor:'#9E9E9E',
        opacity:0.8,
        height:0.5,
        alignSelf:'center',
        marginTop:10,
        bottom:70,
    }
  });

export default AudioListscreenUI