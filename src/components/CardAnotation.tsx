import { Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';

export type CardAnotationProps = {
  id: string;
  text: string;
  recent: boolean;
}

type Props = IPressableProps & {
    data: CardAnotationProps;
}

const dataImages = [
    
    require('../assets/images/anotation_0.png'),
    require('../assets/images/anotation_1.png'),
    require('../assets/images/anotation_2.png'),
   
]

export function CardAnotation({ data, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable {...rest} >
        <VStack width={100} height={100} marginLeft={4} marginRight={5} >
            <Image  style={styles.imagens}  borderBottomLeftRadius={20} 
            borderBottomRightRadius={20} borderTopLeftRadius ={20} borderTopRightRadius ={20}  source={dataImages[data.id]} />

            <VStack style={styles.legenda}  
              
               >

                <Text paddingX={2} 
              paddingY={1} 
              color="#FFFFFF" 
              fontSize={12.5}
              fontFamily={'regular'}>
                {data.text}
                </Text>
            </VStack>

        </VStack>
    </Pressable>
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
        
     }
  });
  