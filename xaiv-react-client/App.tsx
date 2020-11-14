import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {io} from 'socket.io-client'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  let socket = io("https://xaiv-backend.herokuapp.com", {      
      transports: ['websocket'], jsonp: false });
  socket.emit("connection");

  console.log("App.tsx", socket)

  var globals = {
    socket: socket,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} globals={globals} />
        <StatusBar hidden />
      </SafeAreaProvider>
    );
  }

  
}
