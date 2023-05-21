import { View, Text ,StyleSheet,Image,Dimensions} from 'react-native'
import React ,{useContext,useEffect, useState}from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {play,playNext,resume,pause, selectAudio, changeAudio, moveAudio} from '../childScreen/AudioController';
import{AudioContext} from '../context/AudioProvider'
import PlayerButtonUI from '../component/PlayerButtonUI';
import { convertTime, storeAudioForNextOpening } from '../childScreen/StoreAudioForNextOpening';


const {width} = Dimensions.get('window')

const PlayerScreen = () => {
const [currentPostion,setCurrentPosition]  = useState(0) 
const context = useContext(AudioContext)

const{playbackPosition,
      playbackDuration}=context;
const calculateSeebBar =() => {
  if(playbackPosition !== null && playbackDuration !==null){
    return playbackPosition/playbackDuration;
  }
  return 0
  }

  useEffect(()=>{
    context.loadPreviousAudio();
 },[]);
  

 const handlePlaypause=async()=>{
  await selectAudio(context.currentAudio,context)
  // //play
  // if(context.soundObj===null){
  //     const audio = context.currentAudio;
  //     context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate)
  //     const status = await play(context.playbackObj,audio.uri);
  //     context.playbackObj.setOnPlaybackStatusUpdate(
  //        context.onPlaybackStatusUpdate);
  //     return context.updateState(context,{
  //         soundObj:status,
  //         currentAudio:audio,
  //         isPlaying:true,
  //         currentAudioIndex:context.currentAudioIndex
  //     });
  // }
  // //pause
  // if(context.soundObj && context.soundObj.isPlaying){
  //    const status = await pause(context.playbackObj);
  //    return context.updateState(context,{
  //     soundObj:status,
  //     isPlaying:false,
      
  // });
  // }
  // //resume
  // if(context.soundObj && !context.soundObj.isPlaying){
  //     const status = await resume(context.playbackObj);
  //     return context.updateState(context,{
  //      soundObj:status,
  //      isPlaying:true,
       
  //  });
  //  }
};
const handleNext= async() =>{
  await changeAudio(context,'next')
//  const{isLoaded}=await context.playbackObj.getStatusAsync();
//  const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
//  let audio = context.audioFiles[context.currentAudioIndex + 1];
//  let index;
//  let status;
//  if(!isLoaded && !isLastAudio){
//      index=context.currentAudioIndex + 1;
//      status=await play(context.playbackObj,audio.uri)
//  }
//  if(isLoaded && !isLastAudio){
//   index=context.currentAudioIndex + 1;
//   status=await playNext(context.playbackObj,audio.uri)
// }
// if(isLastAudio){
//   index =0;
//   audio=context.audioFiles[index];
//   if(isLoaded){
//   status=await playNext(context.playbackObj,audio.uri)
//   }else{
//       status=await play(context.playbackObj,audio.uri)
//   }
// }
//  context.updateState(context, {
//   currentAudio:audio,
//   playbackObj:context.playbackObj, 
//   soundObj:status,
//   isPlaying:true,
//   currentAudioIndex: index,
//   playbackPosition:null,
//   playbackDuration:null, 
//   playbackPosition:null,
//   playbackDuration:null,
// });
//   storeAudioForNextOpening(audio,index)
}

const handlePrevious= async() =>{
  await changeAudio(context,'previous')
//   const{isLoaded}=await context.playbackObj.getStatusAsync();
//   const isFirstAudio = context.currentAudioIndex <=0;
//   let audio = context.audioFiles[context.currentAudioIndex - 1];
//   let index;
//   let status;
//   if(!isLoaded && !isFirstAudio){
//       index=context.currentAudioIndex - 1;
//       status=await play(context.playbackObj,audio.uri)
//   }
//   if(isLoaded && !isFirstAudio){
//    index=context.currentAudioIndex - 1;
//    status=await playNext(context.playbackObj,audio.uri)
// }
// if(isFirstAudio){
//    index = context.totalAudioCount -1;
//    audio=context.audioFiles[index];
//    if(isLoaded){
//    status=await playNext(context.playbackObj,audio.uri)
//    }else{
//        status=await play(context.playbackObj,audio.uri)
//    }
// }
//   context.updateState(context, {
//    currentAudio:audio,
//    playbackObj:context.playbackObj, 
//    soundObj:status,
//    isPlaying:true,
//    currentAudioIndex: index,
//    playbackPosition:null,
//    playbackDuration:null,
//    playbackPosition:null,
//    playbackDuration:null,  });
//    //storeAudioForNextOpening(audio,index)
}

  const renderCurrentTime = () =>{
   return convertTime(context.playbackPosition/1000)
  }

  if (!context.currentAudio) return null;

  return (
   <LinearGradient style={styles.container}  colors={['#EEEEEE', '#424242']}
                    start={{x:0,y:0.1}}
                    end ={{x:0,y:1}}> 
        <View>
           <View> 
           <Text style={styles.songCount}>{`${context.currentAudioIndex+1} / ${context.totalAudioCount}`}</Text>
              <View style={styles.container1}>
                   <LinearGradient style={styles.playerCircle}colors={['#212121','#757575', '#E0E0E0','#9E9E9E','#212121']}>
                      <Ionicons style={{right:8}} name="ios-musical-notes-sharp" size={120} color="#424242" />
                   </LinearGradient>
              </View>
              <View style={styles.audioPlayerContainer}>
                <Text style={styles.audioTitle}>{`${context.currentAudio.filename}`}</Text>
                    <Slider
                      style={{width: width-10, height: 20,bottom:60 }}
                      minimumValue={0}
                      maximumValue={1}
                      value={calculateSeebBar()}
                      minimumTrackTintColor="#00C853"
                      maximumTrackTintColor="white"
                      thumbTintColor="white"
                      onValueChange={(value)=>setCurrentPosition(convertTime(value*context.currentAudio.duration))}
                      onSlidingStart ={async()=>
                        {
                          if(!context.isPlaying)return;
                          try {
                            await pause(context.playbackObj)
                          } catch (error) {
                            console.log('error inside onsliderStart callback',error)
                          }
                        }
                      }
                      onSlidingComplete ={async value =>{
                        await moveAudio(context,value)
                        setCurrentPosition(0)
                        // {
                        //   if(context.soundObj === null || !context.isPlaying)return;
                        //   try {
                        //    const status= await context.playbackObj.setPositionAsync(Math.floor(context.soundObj.durationMillis * value))
                        //    context.updateState(context,{ soundObj:status,playbackPosition:status.positionMillis })
                        //    await resume(context.playbackObj)
                        //   } catch (error) {
                        //     console.log('error inside onsliderComplete callback',error)
                        //   }
                        // }
                      }}
                      />
                      <View style={{bottom:50,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'#fff',left:7}}>{convertTime(context.currentAudio.duration)}</Text>
                        <Text style={{color:'#fff',right:7}}>{currentPostion ? currentPostion: renderCurrentTime()}</Text>
                      </View>
                      <View style={styles.playerButtonUIContainer}>
                        <PlayerButtonUI onPress={handlePrevious} iconType='PREV'/>
                        <View>
                        <LinearGradient style={styles.playerButtonCircle} colors={['#00C853','#00E676','#69F0AE', '#B9F6CA','#69F0AE','#00E676','#00C853']}>
                          <PlayerButtonUI onPress={handlePlaypause} iconType={context.isPlaying ? 'PLAY': 'PAUSE'}/>
                        </LinearGradient>
                        </View>
                        <PlayerButtonUI onPress={handleNext} iconType='NEXT'/>
                      </View> 
              </View >   
                  
           </View>
        </View>
   </LinearGradient> 
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
    container1: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      bottom:20
    },
    playerCircle:{
      width:250,
      height:250,
      borderWidth:0.1,
      borderRadius:125,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
    },
    audioTitle:{
      fontSize:16,
      color:'white',
      left:15,
      bottom:63
    },
    audioPlayerContainer:{
      bottom:0
    },
    playerButtonUIContainer:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
      bottom:25
    },
    playerButtonCircle:{
      width:80,
      height:80,
      borderWidth:0.1,
      borderRadius:50,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      
    },
    container2: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
    songCount:{
      textAlign:'right',
      top:40,
      right:10,
      color:'black'  
  },

    
  });
  

export default PlayerScreen