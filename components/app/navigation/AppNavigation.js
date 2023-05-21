import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AudioListScreen from '../screens/AudioListScreen';
import PlayerScreen from '../screens/PlayerScreen';
import PlayListScreen from '../screens/PlayListScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab =createBottomTabNavigator();

const AppNavigation = () => {
  return <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel:false,
                                         tabBarStyle:{backgroundColor:'#212121'},
                                         tabBarActiveTintColor:'#FAFAFA',
                                       tabBarInactiveTintColor:'#00C853' }}>
            <Tab.Screen name='Audio List'   component={AudioListScreen}   options={{tabBarIcon:({color, size}) => <Ionicons name="ios-headset" size={size} color={color}/> }}   />
            <Tab.Screen name='Player'       component={PlayerScreen}      options={{tabBarIcon:({color, size}) => <Ionicons name="ios-disc-sharp" size={size} color={color}/> }}   />
            <Tab.Screen name='Play List'    component={PlayListScreen}    options={{tabBarIcon:({color, size}) => <MaterialCommunityIcons name="playlist-music" size={size} color={color} />  }}/>
        </Tab.Navigator>

  
}

export default AppNavigation