import { Text, VStack, Pressable, IPressableProps ,} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export type CardAnotationProps = {
  id: string;
  text: string;
  recent: boolean;
}

type Props = IPressableProps & {
  data: CardAnotationProps;
  name: string;
  value: any;
}

export function CardAnotation({ cor, name, value, ...rest }) {
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("anotationText");
  }

  const formatText = (text) => {
    if(text !== undefined) {

      if(text.length >= 210) {
        return text.substring(0, 210) + '...'
      }
      
      return text;
    } else {
      return "";
    }
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
                {name}
                </Text>

                <VStack style={styles.input}
                 borderBottomLeftRadius={20} 
                  borderBottomRightRadius={20}
                bg="#FFFFFF">           
                  <Text color={"#FFFFFF"}>
                    {formatText(value.reverse()[0]?.text)}
                  </Text>
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
  