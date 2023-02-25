import { Text, VStack, IPressableProps, HStack, IconButton, Spacer ,} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trash } from 'phosphor-react-native';

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

export function CardAnotation({ cor, name, value, navId, navName, ...rest }) {
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("allAnotation", {
      id: navId,
      name: navName,
    });
  }

  const formatText = (text) => {
    if(text !== undefined) {

      if(text.length >= 32) {
        return text.substring(0, 32) + '...'
      }
      
      return text;
    } else {
      return "";
    }
  }

  const newValue = value.reverse();
  
  return (
    <VStack alignSelf={'center'} justifyContent = {'center'} flexDirection = {'row'} 
    >
        
        <VStack style={styles.legenda} 
          borderRadius = {20}
          bg={cor}
          
            >
          <TouchableOpacity  onPress={handleNewOrder} >
            <HStack  >
            
              <Text flex={1} textAlign={'center'} style = {styles.text} 
                color="#FFFFFF" 
                fontSize={12}
                fontFamily={'robolight'}>
                {name}
              </Text>
         
              <IconButton  
                icon={<Trash  color="#FFFFFF" size={18} />}
                onPress={() => {}}
              />

            </HStack>

            <VStack style={styles.input}
              borderBottomLeftRadius={20} 
              borderBottomRightRadius={20}
            bg="#FFFFFF"> 

              {newValue[0] !== undefined ? <HStack alignItems={'center'} marginTop={'-5px'} marginBottom={'-10px'}>
                <VStack bg={"#FFFFFF"} marginTop={'-10px'} marginBottom={"5px"} marginRight={'5px'} width={'4px'} height={'4px'} borderRadius={'full'}>
                </VStack>   
                <Text color={"#FFFFFF"} >
                  {formatText(newValue[0]?.title)} {'\n'}
                </Text>   
              </HStack>  : null}

              {newValue[1] !== undefined ? <HStack alignItems={'center'} marginTop={'-5px'} marginBottom={'-10px'}>
                <VStack bg={"#FFFFFF"} marginTop={'-10px'} marginBottom={"5px"} marginRight={'5px'} width={'4px'} height={'4px'} borderRadius={'full'}>
                </VStack>   
                <Text color={"#FFFFFF"} >
                  {formatText(newValue[1]?.title)} {'\n'}
                </Text>   
              </HStack>  : null}

              {newValue[2] !== undefined ? <HStack alignItems={'center'} marginTop={'-5px'} marginBottom={'-10px'}>
                <VStack bg={"#FFFFFF"} marginTop={'-10px'} marginBottom={"5px"} marginRight={'5px'} width={'4px'} height={'4px'} borderRadius={'full'}>
                </VStack>   
                <Text color={"#FFFFFF"} >
                  {formatText(newValue[2]?.title)} {'\n'}
                </Text>   
              </HStack>  : null}

              {newValue[3] !== undefined ? <HStack alignItems={'center'} marginTop={'-5px'} marginBottom={'-10px'}>
                <VStack bg={"#FFFFFF"} marginTop={'-10px'} marginBottom={"5px"} marginRight={'5px'} width={'4px'} height={'4px'} borderRadius={'full'}>
                </VStack>   
                <Text color={"#FFFFFF"} >
                  {formatText(newValue[3]?.title)} {'\n'}
                </Text>   
              </HStack>  : null}

              {newValue[4] !== undefined ? <HStack alignItems={'center'} marginTop={'-5px'} marginBottom={'-10px'}>
                <VStack bg={"#FFFFFF"} marginTop={'-10px'} marginBottom={"5px"} marginRight={'5px'} width={'4px'} height={'4px'} borderRadius={'full'}>
                </VStack>   
                <Text color={"#FFFFFF"} >
                  {formatText(newValue[4]?.title)} {'\n'}
                </Text>   
              </HStack>  : null}

            </VStack>
          </TouchableOpacity>
            
        </VStack>


    </VStack>
   
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
      width: 310,
     },
     text: {
      justifyContent:'center',
      alignSelf:'center',
      flexDirection: 'row',
      marginLeft: 30,
   
     },
     input: {
      width: 310,
      height: 130,
      padding: 10,
      backgroundColor:"#251751" ,
    },
  });