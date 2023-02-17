import { Text, useTheme, VStack, Pressable, IPressableProps ,} from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
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
        <VStack  marginLeft={4}  >
           
            <VStack style={styles.legenda} 
            height={10}
            borderTopLeftRadius ={20} borderTopRightRadius ={20} 
            
            bg={cor}
            alignItems={'center'}>

              <Text 
             
              color="#FFFFFF" 
              fontSize={12}
              fontFamily={'robolight'}>
                {data.text}
                </Text>
                 
                </VStack>
                <VStack style={styles.bg} borderBottomLeftRadius ={20} borderBottomRightRadius ={20}>
                <Image  style={styles.imagens} borderBottomLeftRadius ={20} borderBottomRightRadius ={20}  source={dataImagesCardAnotation[data.id]} />

         

</VStack>
                
        </VStack>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  imagens: {
    color: "#FFFFFF",
    width: 125,
    height: 100
  } ,
  bg:{
    width: 125,
    height: 100,
    backgroundColor:"#1DC0B7" ,
    
    marginBottom: 50,
  },
    legenda: {
      color: "#FFFFFF",
      width: 125,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    input: {
    width: 120,
    height: 200,
    padding: 10,
    backgroundColor:"#251751" ,
  },
});
  