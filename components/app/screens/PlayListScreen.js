import { View, Text ,StyleSheet,Dimensions,ScrollView, TouchableOpacity, FlatList, Alert} from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import PlayListInputModelUI from '../component/PlayListInputModelUI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioContext } from '../context/AudioProvider';
import PlayListDetailUI from '../component/PlayListDetailUI';


let selectedPlayList ={}
const PlayListScreen = () => {
  const [modelVisible,setModelVisible] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);
  const context = useContext(AudioContext)
  const {playList,addToPlayList,updateState} = context
  const createPlayList =async playListName =>{
   const result = await AsyncStorage.getItem('playlist');
   if(result !== null){
    const audios =[];
     if(addToPlayList){
      audios.push(addToPlayList);
     }
    const newList ={
      id: Date.now(),
      title:playListName,
      audios:audios
    }
    const updatedList =[...playList,newList]
    updateState (context,{addToPlayList:null,playList:updatedList});
    await AsyncStorage.setItem('playlist',JSON.stringify(updatedList))
   }
   setModelVisible(false)
  }
  const renderPlayList =async()=>{
    const result = await AsyncStorage.getItem('playlist');
    if (result===null){
      const defaultPlayList={
        id: Date.now(),
        title: 'MY FAVORITE',
        audios :[]  
      }
      const newplayList =[...playList, defaultPlayList];
      updateState(context,{playList:[...newplayList]})
      return await AsyncStorage.setItem('playlist',JSON.stringify([...newplayList]));
    }
    updateState(context,{playList:JSON.parse(result)})
  }
  useEffect(()=>{
   if(!playList.length){
    renderPlayList()
   }   
  },[])
  const handleBannerPress = async (playList) =>{
    //update playlist if there is any selected audio.
    if(addToPlayList){
      const result=await AsyncStorage.getItem('playlist');
      let oldList = [];
      let updatedList =[];
      let sameAudio = false;
      if(result !== null){
        oldList = JSON.parse(result) 
        updatedList = oldList.filter(list=>{
          if(list.id === playList.id){
            //we want to check is that same is already inside our list or not.
            for (let audio of list.audios){
              if(audio.id === addToPlayList.id){
                //alert with some message
                sameAudio = true;
                return;
              }
            }
            //otherwise update the playlist if there is any selected audio.
            list.audios =[...list.audios,addToPlayList]
          }
          return list;
        })  
      }
      if(sameAudio){
        Alert.alert('found same audio!',`${addToPlayList.filename} is already inside the list.`);
        sameAudio= false;
        return updateState(context,{addToPlayList:null})
      }
      updateState(context,{addToPlayList:null,playList:[...updatedList]});
      return AsyncStorage.setItem('playlist',JSON.stringify([...updatedList]))
    }

    // if there is no audio selected then we want open the list.
    selectedPlayList = playList
    setShowPlayList(true)
  }
  return (
    <LinearGradient style={styles.container} colors={['#EEEEEE', '#424242']} start={{x:0,y:0.1}} end ={{x:0,y:1}}>  
     <ScrollView contentContainerStyle={styles.container1}>
        {playList.length? playList.map(item=><TouchableOpacity key={item.id.toString()} style={styles.playlistBanner} onPress={()=>handleBannerPress(item)} >
          <Text>{item.title}</Text>
          <Text style={styles.audioCount}>{item.audios.length>1?`${item.audios.length} Songs `:`${item.audios.length} Song `}</Text>
        </TouchableOpacity>):null}
        <TouchableOpacity onPress={()=>setModelVisible(true)} style={{marginTop:15}}>
          <Text style={styles.playListbtn}>+ Add New Playlist</Text>
        </TouchableOpacity>
        <PlayListInputModelUI visible={modelVisible} onClose={()=>setModelVisible(false)} onSubmit={createPlayList} />
     </ScrollView>
       <PlayListDetailUI visible={showPlayList} playList={selectedPlayList} onClose={()=>setShowPlayList(false)} />
   </LinearGradient>
  )
}

const {width} =Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
       flex:1,
    },
    container1:{
      paddingTop:50,
      left:20
   },
    playlistBanner:{
       paddingTop:15 ,
       paddingLeft:30,
       backgroundColor:'rgba(202,204,204,0.3)' ,
       height:70,
       width:320,
       borderRadius:10,
       marginBottom:15
    },
    audioCount:{
       marginTop:3,
       opacity:0.5,
       fontSize:14
    },
    playListbtn:{
      color:'blue',
      letterSpacing:1,
      fontWeight:'bold',
      fontSize:14,
      paddingLeft:10
    }
})
  

export default PlayListScreen