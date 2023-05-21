import { Text, View ,StyleSheet,Dimensions,Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { AudioContext,updateState } from '../context/AudioProvider';
import { RecyclerListView ,LayoutProvider} from 'recyclerlistview';
import AudioListscreenUI from '../component/AudioListscreenUI';
import OptionalModalUI from '../component/OptionalModalUI';
import { Audio } from 'expo-av';
import{play,pause,resume,playNext, selectAudio} from '../childScreen/AudioController';
import { storeAudioForNextOpening } from '../childScreen/StoreAudioForNextOpening';
import { LinearGradient } from 'expo-linear-gradient';



export class AudioListScreen extends Component {
  static contextType = AudioContext;
  
  constructor(props){
    super(props);
    this.state = {
      OptionModalVisible:false,     
    };

    this.currentItem ={}

  }

  layoutProvider = new LayoutProvider((i) =>'audio', (type,dim) => {
    switch(type) {
     case 'audio':
       dim.width = Dimensions.get('window').width;
       dim.height=70;
       break;
       default:
         dim.width = 0;
         dim.height= 0;  
    }
 
   } );

  //  onPlaybackStatusUpdate = async playbackStatus =>{
  //   if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
  //     this.context.updateState(this.context,{
  //      playbackPosition:playbackStatus.positionMillis,
  //      playbackDuration:playbackStatus.durationMillis,
  //     });
  //   }
  //   if(playbackStatus.didJustFinish){
  //     const nextAudioIndex = this.context.currentAudioIndex + 1;
  //     if(nextAudioIndex>=this.context.totalAudioCount){
  //       this.context.playbackObj.unloadAsync();
  //       this.context.updateState(this.context,{
  //         soundObj:null,
  //         currentAudio:this.context.audioFiles[0],
  //          isPlaying:false,
  //          currentAudioIndex:0,
  //          playbackPosition:null,
  //          playbackDuration:null,
  //       });
  //       return await storeAudioForNextOpening(this.context.audioFiles[0],0) 
  //     }
  //       const audio = this.context.audioFiles[nextAudioIndex];
  //       const status = await playNext(this.context.playbackObj,audio.uri);
  //       this.context.updateState(this.context,{
  //         soundObj:status,
  //         currentAudio:audio,
  //         isPlaying:true,
  //         currentAudioIndex: nextAudioIndex, 
  //       });
  //       await storeAudioForNextOpening(audio,nextAudioIndex)    
  //     }
  //  }


   handleAudioPress = async audio => {
    await selectAudio(audio,this.context)
  //  const {playbackObj,soundObj,currentAudio,updateState,audioFiles} = this.context;
  //  if(soundObj === null){
  //    // playing audio for first time.
  //   const playbackObj = new Audio.Sound();
  //   const status = await play(playbackObj,audio.uri)
  //   const index = audioFiles.indexOf(audio)
  //   updateState(this.context,{currentAudio:audio,playbackObj:playbackObj, soundObj:status,isPlaying:true,currentAudioIndex: index });
  //   playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate)
  //   return storeAudioForNextOpening(audio,index)
  //  }

  //  // pause audio
  //  if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id===audio.id){
  //     const status = await pause(playbackObj);
  //     return updateState(this.context,{ soundObj:status,isPlaying:false })
      

  //  }
    
  //  // resume audio
  //  if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id===audio.id){
  //   const status = await resume(playbackObj);
  //   return updateState(this.context,{ soundObj:status,isPlaying:true })
    
  //  }

  //  //select another audio 
  //  if (soundObj.isLoaded && currentAudio.id !==audio.id){
  //    const status = await playNext(playbackObj,audio.uri);
  //    const index = audioFiles.indexOf(audio)
  //    updateState(this.context,{ currentAudio:audio,soundObj:status ,isPlaying:true ,currentAudioIndex: index})
  //    return storeAudioForNextOpening(audio,index)
     
  //  }

  };

  componentDidMount(){
    this.context.loadPreviousAudio();
  }



   rowRenderer = (type, item,index,extendedState)=>{
    
    return( 
            <AudioListscreenUI  title={item.filename} duration={item.duration}
                                isPlaying={extendedState.isPlaying}
                                activeListItem={this.context.currentAudioIndex === index}
                                onAudioPress={()=>this.handleAudioPress(item)}  
                                onOptionPress={() => {this.currentItem =item;this.setState({...this.state,OptionModalVisible: true}
                                )}}/>
          )                         
    
  }

  render() {
    return (
       <LinearGradient style={styles.Container} colors={['#EEEEEE', '#424242']}
                       start={{x:0,y:0.1}}
                       end ={{x:0,y:1}}> 
          <View style={{paddingTop:50,marginBottom:20}}>
            <TouchableOpacity>
             <Image style={{width:100,height:100,borderRadiusWidth:0.1,borderRadius:60}} source={require("../../../assets/assets/icon.webp")} />
            </TouchableOpacity>
          </View>             
          <View style ={{flex:1,width:630,marginStart:275,}}>                     
              <AudioContext.Consumer>
                {({dataProvider,isPlaying}) =>{
                  if (!dataProvider._data.length) return null;
                  return (
                  <View style={{flex:1}}>
                  <RecyclerListView dataProvider={dataProvider} 
                                          layoutProvider={this.layoutProvider} 
                                          rowRenderer ={this.rowRenderer} 
                                          extendedState={{isPlaying}} />
                  <OptionalModalUI  onPlayPress={()=> console.log('palying audio')}
                                    onPlayListPress={()=> {this.context.updateState(this.context,{addToPlayList: this.currentItem}); this.props.navigation.navigate('Play List')}}
                                    currentItem={this.currentItem} 
                                    onClose={()=> this.setState({...this.state, OptionModalVisible:false})} 
                                    visible={this.state.OptionModalVisible}/>                        
                  </View>                         
                  )                         
                }}
              </AudioContext.Consumer> 
          </View> 
       </LinearGradient>    
    )    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  ImageContainer:{
    width:130,
    height:130, 
    borderWidth:1,
    borderRadius:75,
    bottom:170,
  },
  TextContainer:{
    color:'white',
    fontSize:20,
    top:80,
    right:57,

  },
  TextContainer2:{
    color:'white',
    fontSize:20,
  },
  Dot:{
    left:6,
    top:5
  },
  Radius:{
    width:34,
    height:34,
    borderWidth:1.5,
    borderRadius:17,
    borderColor:'#424242'
  },
  Radius1:{
    width:70,
    height:70,
    borderWidth:1.5,
    borderRadius:35,
    borderColor:'#424242',
    backgroundColor: "#E0E0E0",
    alignItems:'center'
  },
  TextContainer1:{
    color:'white',
    fontSize:40,
    fontWeight:'bold',
    bottom:0,
  },
  });


export default AudioListScreen