import { Text, useTheme, VStack, Pressable, IPressableProps ,} from 'native-base';
import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet, View,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

export function CardAnotation({ data, cor, ...rest }) {
  const { colors } = useTheme();
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("anotationText");
  }
  
  return (
   
    <Pressable {...rest}  >
        <VStack  marginLeft={4} marginRight={5} marginBottom = {-5} >
           
            <VStack style={styles.legenda} 
             borderBottomLeftRadius={20} 
             borderBottomRightRadius={20}
            borderTopLeftRadius={20} 
            borderTopRightRadius={20}
            bg={cor}
            alignItems={'center'}
              
               >
             <TouchableOpacity  onPress={handleNewOrder} >
                <Text paddingX={2} 
              paddingY={1} 
              marginLeft= {2}
              color="#FFFFFF" 
              fontSize={12}
              fontFamily={'robolight'}>
                {data.text}
                </Text>

                <VStack style={styles.input}
                 borderBottomLeftRadius={20} 
                borderBottomRightRadius={20}
                bg="#FFFFFF">           
                </VStack>
                </TouchableOpacity>
                
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
        width: 180,
        
        
     },
     input: {
      width: 180,
      height: 120,
      padding: 10,
      backgroundColor:"#251751" ,
    },
  });
  