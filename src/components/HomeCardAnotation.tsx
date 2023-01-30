import { Text, useTheme, VStack, Pressable, IPressableProps ,} from 'native-base';
import { useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View,TextInput } from 'react-native';
import { dataImagesCardAnotation } from '../model/Data';

export type CardAnotationProps = {
  id: string;
  text: string;
  recent: boolean;
}

type Props = IPressableProps & {
  data: CardAnotationProps;
}

export function HomeCardAnotation({ data, cor, ...rest }) {

  return (
    <Pressable {...rest}  >
        <VStack  marginLeft={4} marginRight={5} marginBottom = {-5} >
           
            <VStack style={styles.legenda} 
             borderBottomLeftRadius={20} 
             borderBottomRightRadius={20}
            borderTopLeftRadius={20} 
            borderTopRightRadius={20}
            bg={cor}
            alignItems={'center'}>

              <Text paddingX={2} 
              paddingY={1} 
              color="#FFFFFF" 
              fontSize={12}
              fontFamily={'robolight'}>
                {data.text}
                </Text>

                <Image  style={styles.imagens} borderBottomLeftRadius ={20} borderBottomRightRadius ={20}  source={dataImagesCardAnotation[data.id]} />

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
    },
    input: {
    width: 120,
    height: 80,
    padding: 10,
    backgroundColor:"#251751" ,
  },
});
  