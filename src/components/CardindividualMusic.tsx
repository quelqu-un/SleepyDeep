import { useNavigation } from '@react-navigation/native';
import { Text, VStack, IPressableProps } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { dataImagesCardMusic } from '../model/Data';
import { dataImagesCardindividualMusic } from '../model/Data';

export type CardMusicProps = {
  id: string;
  text: string;
  recent: boolean;
}

type Props = IPressableProps & {
    data: CardMusicProps;
}

export function CardindividualMusic({ data, ...rest }: Props) {
  const navigation = useNavigation();


  function handleNewNewOrder() {
    navigation.navigate("musicplayer");
  }

  return (
    <TouchableOpacity  onPress={handleNewNewOrder} >
        <VStack width={100} height={95} marginLeft={4} marginRight={5} >
            <Image  style={styles.imagens} borderTopLeftRadius ={20} borderTopRightRadius ={20}  source={dataImagesCardindividualMusic[data.id]} />

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
                {data.text}
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
