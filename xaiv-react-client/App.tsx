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

  const PROD_URL = "https://xaiv-backend.herokuapp.com"
  const LOCAL_URL = "http://127.0.0.1:3000"

  let socket = io(PROD_URL, {      
      transports: ['websocket'], jsonp: false });
  socket.emit("connection");

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
