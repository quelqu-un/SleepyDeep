import { VStack, HStack, Text, ScrollView, IconButton, Center } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image,  ImageBackground} from 'react-native';
import { Globe, ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';


export function SearchScreen() {

  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.goBack();
  }

  return ( 
    <ImageBackground source={require('../../assets/images/sleepbg.png')} resizeMode="cover" style={styles.image}>
    <ScrollView >
 
      <VStack flex={1} 
        bg="#251751" 
        > 
             
            <HStack marginTop={10}  paddingX = {4} style={styles.title} >

          
              <IconButton
                  marginTop = {-1}
                icon={<ArrowLeft  color="#FFFFFF" size={28} />}
                 onPress={handleNewOrder}
              />

                <Text 
                fontFamily="bold" 
                textAlign= "center"
                color={'#FFFFFF'}
                fontSize={20}>
                    Pesquisar
                </Text>

               <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
            </HStack>
           
        </VStack>
        <SearchBarComponent></SearchBarComponent>

                    
    </ScrollView>
 </ImageBackground>
    
  );
}

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
      width: 30,
      height: 30,
    
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
