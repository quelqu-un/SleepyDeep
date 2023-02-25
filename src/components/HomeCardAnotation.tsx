import { Text, useTheme, VStack, Pressable, IPressableProps ,} from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import { useContext, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet, View,TextInput } from 'react-native';
import { dataImagesCardAnotation } from '../model/Data';
import { useNavigation } from '@react-navigation/native';
import { LangContext } from '../contexts/langProvider';

export type CardAnotationProps = {
  id: string;
  text: string;
  recent: boolean;
}

type Props = IPressableProps & {
  data: CardAnotationProps;
  name: string;
  value: any;
  navId: number;
  navName: string;
}

export function HomeCardAnotation({ data, cor, navId, navName,  ...rest }) {
  
  const navigation = useNavigation();

  const context:any = useContext(LangContext);

  function handleNewOrder() {
    navigation.navigate("allAnotation", {
      id: navId,
      name: navName,
    });
  }

  return (
    <Pressable {...rest}  >
        <VStack  marginLeft={4}  >
        <TouchableOpacity  onPress={handleNewOrder} >
            <VStack style={styles.legenda} 
            height={10}
            borderTopLeftRadius ={20} borderTopRightRadius ={20} 
            
            bg={cor}
            alignItems={'center'}>

             

              <Text 
             
              color="#FFFFFF" 
              fontSize={12}
              fontFamily={'robolight'}>
                {context.language == 0
                  ? data.textEn
                  : context.language == 1
                  ? data.textBr
                  : null}
                </Text>
               
                </VStack>
                <VStack style={styles.bg} borderBottomLeftRadius ={20} borderBottomRightRadius ={20}>
                <Image  style={styles.imagens} borderBottomLeftRadius ={20} borderBottomRightRadius ={20}  source={dataImagesCardAnotation[data.id]} />               
</VStack>
</TouchableOpacity>  
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
  