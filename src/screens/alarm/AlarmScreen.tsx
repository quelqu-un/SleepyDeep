import { VStack, HStack, Text, ScrollView, IconButton, Center } from 'native-base';
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

  return (
    <ScrollView >
      <VStack flex={1}
        bg="#251751"
      >

        <HStack marginTop={2} paddingX={4} style={styles.title} >


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
            Alarme
          </Text>

          <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
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
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",

  },
  imageLogo: {
    width: 25,
    height: 25,

  },
});
