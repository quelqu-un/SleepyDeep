import { VStack, HStack, Text, ScrollView, IconButton } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
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
    justifyContent: "space-between",


  },
  secondtitle: {
    color: "#FFFFFF",

    alignContent: "center",

  },
  imageLogo: {
    width: 25,
    height: 25,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
