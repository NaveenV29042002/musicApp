import { View, Text ,StyleSheet, ScrollView,Image} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = () => {
  return (
    <LinearGradient style={styles.container} colors={['#EEEEEE', '#424242']} start={{x:0,y:0.1}} end ={{x:0,y:1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop:10,paddingBottom:180}}>
          <View style={{paddingTop:40,left:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>TOP PLAYLIST</Text>
          </View>
          <View>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:15}} colors={['#FF6D00', '#FFAB40']} start={{x:0.1,y:0}} end ={{x:1,y:0}}> 
               <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/v.webp")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Kim Taehyung</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:30}} colors={['#CCFF90', '#64DD17']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
               <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/jungkook.webp")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>               
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>JungKook</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:45}} colors={['#4527A0', '#B39DDB']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
               <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/jimin.jpg")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>               
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Park Jimin</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:60}} colors={['#F8BBD0', '#AD1457']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
               <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/jhope.png")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Jung Hoseok</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:75}} colors={['#FF1744', '#FF8A80']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/jin.jpg")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>               
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Kim Seok-jin</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,left:5,top:90}} colors={['#CE93D8', '#4A148C']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/rm.jpg")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>               
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Kim Namjoon</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:105}} colors={['#D50000', '#EF9A9A']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/Suga.jpg")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>               
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Min Yoongi</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:120}} colors={['#F48FB1', '#E91E63']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/jisoo3.jpeg")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>                              
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Jisoo</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:135}} colors={['#651FFF', '#B39DDB']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/jenne.webp")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>               
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Jennie Kim</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:150}} colors={['#B2EBF2', '#00E5FF']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/lisa.webp")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Lalisa Manobal</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
            <LinearGradient style={{width:350,height:175,borderRadius:10,top:165}} colors={['#FFD600', '#FFFF8D']} start={{x:0.1,y:0}} end ={{x:1,y:0}}>
            <View style={{left:240,top:60}}>
                <View style={styles.thumbnailContainer}>
                  <Image style={{width:130,height:130,borderRadiusWidth:0.1,borderRadius:10}} source={require("../../../assets/assets/rose2.jpg")} />
                </View>
               </View>
               <View style={{left:290,top:50}}>
                <View style={styles.thumbnailContainer}>
                  <Ionicons name="play" size={24} color="black" />
                </View>
               </View>
               <View style={styles.fontView}>
                <Text style={styles.fontStyle}>Rose</Text>
                <Text style={styles.fontStyle2}>Album Here</Text>
               </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>       
    </LinearGradient>                   
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'center',
      justifyContent:'center'     
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
  fontView:{
    left:10
  },
  fontStyle:{
    fontSize:20,
    fontWeight:'bold'
  },
  fontStyle2:{
    fontSize:12,
    fontWeight:'100',
    color:"#757575",
    top:5
  }
  });
  

export default HomeScreen