import { useNavigation } from '@react-navigation/native';
import { Text, useTheme, VStack, Pressable, IPressableProps, HStack, IconButton } from 'native-base';
import { Trash } from 'phosphor-react-native';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';


export type CardMusicProps = {
  id: string;
  text: string;
  datas: string;
  recent: boolean;
}

type Props = IPressableProps & {
    data: CardMusicProps;
}

const dataImages = [
    require('../assets/images/music_0.png'),
    require('../assets/images/music_1.png'),
    require('../assets/images/music_2.png'),
 
]

export function SavedTextAnotation({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("musicHome");
  }

  return (
    <TouchableOpacity  onPress={handleNewOrder} >
        <VStack  marginLeft={4} marginRight={5} >
          
            <VStack style={styles.legenda}  bg="#32206A" 
           
           >
            <HStack   flexDirection={'row'}
              justifyContent = {'space-between'}>

            <Text
              marginTop={5}
              marginLeft={5}
              color="#FFFFFF" 
              fontSize={16}
              fontFamily={'robolight'}>
                {data.text}
              </Text>
              
           
            <VStack>

              <VStack style={styles.folha}>
              <IconButton
              marginTop={-1}
              icon={<Trash color="#FFFFFF" size={20} />}
              onPress={handleNewOrder}
          />
                         
                </VStack>

                <Text
              marginTop={2}
              marginRight={3}
              color="#FFFFFF" 
              fontSize={12}
              fontFamily={'robolight'}>
                {data.datas}
              </Text>
            </VStack>
            

            </HStack>
          
            </VStack>

        </VStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imagens: {
    color: "#FFFFFF",
    width: 120,
    height: 110

  } ,
   legenda: {
      color: "#FFFFFF",
      width: 370,
      height: 65,
      paddingX: "50",
      borderRadius: 10,
   },
    folha: {
    width: 54,
    height: 35,
    left: 9,
    borderBottomLeftRadius:10, 
    borderBottomRightRadius:210,
    borderTopLeftRadius:150, 
    borderTopRightRadius:46,
    //borderLeftRa
   // border-radius: 26px 26px 200px 0px,
    backgroundColor:"#2E888D" ,
  },
});