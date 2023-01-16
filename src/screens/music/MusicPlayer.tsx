import { VStack, HStack, Text,  ScrollView, IconButton } from 'native-base';
import React from 'react';

import { FlatList, GestureResponderEvent, ImageBackground, StyleSheet } from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image,TouchableOpacity } from 'react-native';
import { Globe, ArrowLeft,SkipBack, SkipForward, Pause, Timer } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function MusicPlayer() {
const navigation = useNavigation();

function handleNewOrder() {
  navigation.navigate("home");
}

return(
    <ScrollView bg="#180F34"
    marginBottom={10}
    >
   
        <VStack  flex={1} bg="#180F34"
         >
       <ImageBackground source={require('../../assets/images/sleepbg.png')} resizeMode="cover" style={styles.image}>
        <HStack marginTop={10} paddingX={4} style={styles.title} >

          <IconButton
                  marginTop = {-1}
                icon={<ArrowLeft  color="#FFFFFF" size={28} />}
                 onPress={handleNewOrder}
              />
          <Text
            marginBottom={2}
            fontFamily={'bold'} 
           
            color={'#FFFFFF'}
            fontSize={20}>
            Título da música
          </Text>
  
          < Image   style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />

        </HStack>
        </ImageBackground>

        <HStack marginTop={350} style={styles.title} >
        <IconButton
                 marginLeft={10}
                icon={<SkipBack  color="#FFFFFF" size={28} />}
                 onPress={handleNewOrder}
              />

        <IconButton
                  
                icon={<Pause color="#FFFFFF" size={28} />}
                 onPress={handleNewOrder}
              />
        <IconButton
                   marginRight={10}
                  icon={<SkipForward color="#FFFFFF" size={28} />}
                   onPress={handleNewOrder}
                />
             
        </HStack>
        <IconButton
                  marginTop={180}
                  icon={<Timer color="#FFFFFF" size={32} />}
                   onPress={handleNewOrder}
                />
          </VStack>
        
    </ScrollView>
   
    

)}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"
    
  },
  secondtitle:{
    color: "#FFFFFF",
    
    alignContent: "center",
   
  },
  imageLogo:{
      width: 35,
      height: 35,
    
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
