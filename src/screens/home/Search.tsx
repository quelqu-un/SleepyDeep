import { VStack, HStack, Text, ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Globe } from 'phosphor-react-native';

export function Search() {

  return ( 
    <ScrollView >
      <VStack flex={1} 
        bg="#251751" 
        > 

            <HStack marginTop={10}  paddingX = {4} style={styles.title} >
                <Image  style={styles.imageLogo}  source={require('../../assets/images/moon.png')}/>
                <Text 
                fontFamily="bold" 
                color={'#FFFFFF'}
                fontSize={20}>
                    Search
                </Text>

                <VStack alignItems={'center'}>
                <Globe color="#FFFFFF" size={25}/>
                <Text color={'#FFFFFF'}>br</Text>

                </VStack>
            </HStack>

        </VStack>
     

    </ScrollView>
    
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
});
