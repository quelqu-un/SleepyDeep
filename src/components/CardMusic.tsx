import { Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { Image } from 'react-native';
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

  return (
    <Pressable {...rest} >
        <VStack width={100} height={95} marginLeft={4} marginRight={2.5} >
            <Image  style={styles.imagens} borderTopLeftRadius ={20} borderTopRightRadius ={20}  source={dataImages[data.id]} />

            <VStack style={styles.legenda}  bg="#2F2570" 
           /* paddingX={3} 
            paddingY={3}*/

           
            borderBottomLeftRadius={20} 
            borderBottomRightRadius={20}>

                <Text paddingX= {2} color="#FFFFFF">{data.text}</Text>

            </VStack>

        </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imagens: {
    color: "#FFFFFF",
    width: 110,
    height: 100

  } ,
   legenda: {
      color: "#FFFFFF",
      width: 110,
      height: 35,
      paddingX: "50"
   }
});
