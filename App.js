import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./components/app/navigation/AppNavigation";
import AudioProvider from "./components/app/context/AudioProvider";
import AudioListscreenUI from "./components/app/component/AudioListscreenUI";
import { View } from "react-native";

export default function App() {
  return(
    <AudioProvider>
     <NavigationContainer>
      <AppNavigation/>
     </NavigationContainer>
     </AudioProvider>
    
    )
}

