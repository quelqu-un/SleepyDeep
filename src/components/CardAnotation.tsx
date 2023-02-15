import { Text, VStack, IPressableProps ,} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

      if(text.length >= 210) {
        return text.substring(0, 210) + '...'
      }
      
      return text;
    } else {
      return "";
    }
  }
  
  return (
    <VStack alignSelf={'center'} justifyContent = {'center'} flexDirection = {'row'} 
    >
        
        <VStack style={styles.legenda} 
          borderRadius = {20}
          bg={cor}
          
            >
          <TouchableOpacity  onPress={handleNewOrder} >
            <Text style = {styles.text} paddingX={2} 
          paddingY={1} 
        
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
     },
     input: {
      width: 310,
      height: 130,
      padding: 10,
      backgroundColor:"#251751" ,
    },
  });