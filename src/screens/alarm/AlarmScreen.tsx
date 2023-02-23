import { VStack, HStack, Text, ScrollView, IconButton, Center, Spacer, Button } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Globe, ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';


export function AlarmScreen() {
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.goBack();
  }
  
  function handleNewNewOrder() {
    navigation.navigate("donate");
  }
  
  return (
    <VStack flex={1}
    bg="#251751"
   height={'100%'}
  >
    <ScrollView
        contentContainerStyle={{
          minHeight:'100%'
      }}
     >
     

        <HStack paddingTop={4} paddingX={4} style={styles.title} >


          <IconButton
            marginTop={-2}
            icon={<ArrowLeft color="#FFFFFF" size={25} />}
            onPress={handleNewOrder}
          />

          <Text
            marginRight={5}
            fontFamily="robobold"
            textAlign="center"
            color={'#FFFFFF'}
            fontSize={18}>
            Doar
          </Text>

          <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
        </HStack>

        <VStack height = '60%' width = {350} justifyContent={'center'} alignSelf={'center'} flexDirection = {'column'}>
        
        <Text style= {styles.info}>
          Doe usando seu cartão de crédito
          </Text>
          <Text style= {styles.info}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
           industry. 
           Lorem Ipsum has been the industry's standard dummy text.
          </Text>
          <Text style= {styles.info}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
           industry. Lorem Ipsum has been the industry's standard dummy text.
          </Text>
        </VStack>
       
        <HStack marginTop={140}  justifyContent={'center'}
                >

                    <Button style={styles.button} onPress={handleNewNewOrder}
                    >
                        <Text style={styles.text}>
                            Quero Doar
                        </Text>
                    </Button>
         </HStack>
 
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
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",

  },
  imageLogo: {
    width: 25,
    height: 25,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "#37DA1D",
    position:'absolute',
    width: 180,
    height:50,
},
text: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    color: 'white',
},
info: {
  fontSize: 17,
  lineHeight: 21,
  fontWeight: 'normal',
  letterSpacing: 0.7,
  color: 'white',
  marginBottom: 50,
},
});