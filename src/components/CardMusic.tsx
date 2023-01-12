import { Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { Image } from 'react-native';

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
]

export function CardMusic({ data, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable {...rest} >
        <VStack width={165} marginRight={10}>
            <Image source={dataImages[data.id]} />

            <VStack bg="#2F2570" 
            paddingX={5} 
            paddingY={5} 
            borderBottomLeftRadius={10} 
            borderBottomRightRadius={10}>

                <Text color="#FFFFFF">{data.text}</Text>

            </VStack>

        </VStack>
    </Pressable>
  );
}