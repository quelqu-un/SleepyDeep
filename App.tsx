import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, 
  Ubuntu_300Light, 
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold, 
} from '@expo-google-fonts/ubuntu';
import { Modak_400Regular, 
  
} from '@expo-google-fonts/modak';
import { THEME } from './src/styles/theme';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';



export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light, 
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Modak_400Regular,
  });


  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
      barStyle='light-content'
     />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
