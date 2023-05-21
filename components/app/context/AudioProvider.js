import { Text, View ,Alert,StyleSheet,Dimensions} from 'react-native'
import React, { Component , createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import{play,pause,resume,playNext} from '../childScreen/AudioController';
import { storeAudioForNextOpening } from '../childScreen/StoreAudioForNextOpening';

export const AudioContext = createContext()
export class AudioProvider extends Component {
  constructor(props){
    super(props)
    this.state={
      audioFiles:[],
      playList:[],
      addToPlayList:null,
      permissionError:false,
      dataProvider : new DataProvider((r1,r2)=>r1 !== r2),
      playbackObj:null,
      soundObj:null,
      currentAudio:{},
      isPlaying:false,
      currentAudioIndex:null,
      playbackPosition:null,
      playbackDuration:null,
    }
    this.totalAudioCount=0
  }
  PermissionAlert = () => {
    Alert.alert("permission Requird","This app need to read audio files!",
    [{text:'I am ready',
      onPress:() => this.getPermission()
    },{
      text:'cancle',
        onPress:() =>this.PermissionAlert()
    }])
  }
  getPermission = async () =>{
    //{"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
    const Permission = await MediaLibrary.getPermissionsAsync()
    if(Permission.granted){
      // we want to get all the audio files
      this.getAudioFiles()

    }
    if(!Permission.canAskAgain && !Permission.granted){
      this.setState({...this.state,permissionError:true});     
    }
    if(!Permission.granted && Permission.canAskAgain){
    const {status,canAskAgain} = await MediaLibrary.requestPermissionsAsync();
     if (status === 'denied' && canAskAgain){
      // we are going to display alert that user most allow this permission to work this app
      this.PermissionAlert()

    }
    if( status === 'granted' ){
      // we want to get all the audio files
       this.getAudioFiles()
    }
    if (status === 'denied' && !canAskAgain){
      // we want to display some error to the user 
      this.setState({...this.state,permissionError:true})
    }
  }
    
  }

  loadPreviousAudio=async()=>{
    // TODO : we need to load audio from our async storage
    let previousAudio=await AsyncStorage.getItem('previousAudio')
    let currentAudio;
    let currentAudioIndex;

    if(previousAudio===null){
      currentAudio=this.state.audioFiles[0];
      currentAudioIndex=0
    }else{
     previousAudio= JSON.parse(previousAudio)
     currentAudio=previousAudio.audio
     currentAudioIndex= previousAudio.index
    }
    this.setState({...this.state,currentAudio,currentAudioIndex})
    
  }

  getAudioFiles = async () => {
    const {dataProvider,audioFiles} = this.state
    let media = await MediaLibrary.getAssetsAsync({
      mediaType:'audio',
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType:'audio',
      first:media.totalCount,
    })
    this.totalAudioCount = media.totalCount
    this.setState({...this.state,dataProvider : dataProvider.cloneWithRows([...audioFiles,...media.assets])  , audioFiles : [...audioFiles , ...media.assets]})
  }

  onPlaybackStatusUpdate = async playbackStatus =>{
    if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.updateState(this,{
       playbackPosition:playbackStatus.positionMillis,
       playbackDuration:playbackStatus.durationMillis,
      });
    }
    if(playbackStatus.didJustFinish){
      const nextAudioIndex = this.state.currentAudioIndex + 1;
      if(nextAudioIndex>=this.totalAudioCount){
        this.state.playbackObj.unloadAsync();
        this.updateState(this.context,{
          soundObj:null,
          currentAudio:this.state.audioFiles[0],
           isPlaying:false,
           currentAudioIndex:0,
           playbackPosition:null,
           playbackDuration:null,
        });
        return await storeAudioForNextOpening(this.state.audioFiles[0],0) 
      }
        const audio = this.state.audioFiles[nextAudioIndex];
        const status = await playNext(this.state.playbackObj,audio.uri);
        this.updateState(this,{
          soundObj:status,
          currentAudio:audio,
          isPlaying:true,
          currentAudioIndex: nextAudioIndex, 
        });
        await storeAudioForNextOpening(audio,nextAudioIndex)    
      }
   }

  componentDidMount(){
    this.getPermission();
    if(this.state.playbackObj === null){
      this.setState({
        ...this.state,playbackObj:new Audio.Sound()
      })
    }
}

  updateState = (prevState,newState={}) =>{
    this.setState({...prevState,...newState})
 }

  render() {
    const {audioFiles,playList,addToPlayList,dataProvider,permissionError,playbackObj,soundObj,currentAudio, isPlaying,currentAudioIndex,playbackPosition,
           playbackDuration} =this.state
    if(permissionError) 
        return(
        <View style={styles.container}>
          <Text style={{fontSize:25, textAlign:'center',color:'FADA9D'}}>
            It look like you haven't accept the permission.</Text>
        </View>
        );
    return <AudioContext.Provider value={{ audioFiles,
                                           playList,
                                           addToPlayList,
                                           dataProvider,
                                           playbackObj,
                                           soundObj,
                                           currentAudio,
                                           isPlaying,
                                           currentAudioIndex,
                                           playbackPosition,
                                           playbackDuration,
                                           updateState : this.updateState,
                                           loadPreviousAudio:this.loadPreviousAudio,
                                           onPlaybackStatusUpdate: this.onPlaybackStatusUpdate, 
                                           totalAudioCount:this.totalAudioCount, }}>
             {this.props.children}
           </AudioContext.Provider>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default AudioProvider