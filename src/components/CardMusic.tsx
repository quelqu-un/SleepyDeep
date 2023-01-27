import { useNavigation } from '@react-navigation/native';
import { Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';


export type CardMusicProps = {
  id: string;
  text: string;
  recent: boolean;
}

type Props = IPressableProps & {
    data: CardMusicProps;
}

const dataImages = [
    require('../assets/images/music_0.png'),
    require('../assets/images/music_1.png'),
    require('../assets/images/music_2.png'),
    require('../assets/images/music_3.png'),
    require('../assets/images/music_4.png'),
    require('../assets/images/music_5.png'),
    require('../assets/images/music_6.png'),
    require('../assets/images/music_7.png'),
    require('../assets/images/music_8.png'),
    require('../assets/images/anotation_0.png'),
    require('../assets/images/anotation_1.png'),
    require('../assets/images/anotation_2.png'),
]

export function CardMusic({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("music");
  }

  return (
    <TouchableOpacity  onPress={handleNewOrder} >
        <VStack width={100} height={95} marginLeft={4} marginRight={5} >
            <Image  style={styles.imagens} borderTopLeftRadius ={20} borderTopRightRadius ={20}  source={dataImages[data.id]} />

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
