import { useNavigation } from '@react-navigation/native';
import { Text, VStack, IPressableProps } from 'native-base';
import { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { LangContext } from '../contexts/langProvider';
import { dataImagesCardMusic } from '../model/Data';

export function CardMusic({ data }) {
  const navigation = useNavigation();

  const context:any = useContext(LangContext);

  function handleNewOrder() {
    navigation.navigate("music", {
      title: context.language == 0
        ? data.textEn
        : context.language == 1
        ? data.textBr
        : null,
      sounds: data.sounds
    });
  }

  return (
    <TouchableOpacity  onPress={handleNewOrder} >
        <VStack width={100} height={95} marginLeft={4} marginRight={5} >
            <Image  style={styles.imagens} borderTopLeftRadius ={20} borderTopRightRadius ={20}  source={dataImagesCardMusic[data.id]} />

            <VStack style={styles.legenda}  bg="#32206A" 
            borderBottomLeftRadius={20} 
            borderBottomRightRadius={20}
            
            alignItems={'center'}>
            
              <Text 
              paddingX={2} 
              paddingY={1.5} 
              color="#FFFFFF" 
              fontSize={10}
              fontFamily={'robolight'}>
                {context.language == 0
                  ? data.textEn
                  : context.language == 1
                  ? data.textBr
                  : null}
              </Text>

            </VStack>

        </VStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imagens: {
    color: "#FFFFFF",
    width: 120,
    height: 100

  } ,
   legenda: {
      color: "#FFFFFF",
      width: 120,
      height: 35,
      paddingX: "50"
   }
});
