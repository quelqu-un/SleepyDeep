import { VStack, HStack, Text, ScrollView, IconButton, Center, Spacer, Input, Box, Divider } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image,  ImageBackground} from 'react-native';
import { Globe, ArrowLeft, MagnifyingGlass } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';


export function AllAnotation() {
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.goBack();
  }

  return ( 
    <VStack flex={1} height={"100%"} bg="#180F34" >

    
    <ScrollView    _contentContainerStyle={{

h: "100%",
w: "100%",
}} >
     <VStack 
        bg="#251751" 
        > 
             
            <HStack marginTop={2}  paddingX = {4} style={styles.title} >
      
              <IconButton
                  marginTop = {-2}
                icon={<ArrowLeft  color="#FFFFFF" size={25} />}
                 onPress={handleNewOrder}
              />

                <Text 
                marginRight={5}
                fontFamily="robobold" 
                textAlign= "center"
                color={'#FFFFFF'}
                fontSize={18}>
                    O que eu sonhei hoje
                </Text>
                < Image   style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />
            </HStack>

       
        </VStack>
        
        <Spacer />

        <VStack   my="5"  maxW="380px" >
        <Input 
               
               marginLeft = {5} 
               bg="#310569" 
               placeholder="Pesquisar" 
               placeholderTextColor={"#FFFFFF"} 
               variant="filled" 
               borderRadius="10" 
               py="1" 
               px = "3"
               InputRightElement={<MagnifyingGlass  style={styles.lupa} color="#FFFFFF" size={25}/> }/>
           </VStack>

    </ScrollView>
    </VStack>
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
      width: 35,
      height: 35,
    
  },
lupa:{
    marginTop: -2,
   // justifyContent:"flex-end",
    marginRight:10,
    
},
});
