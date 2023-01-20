import { VStack, HStack, Text, ScrollView, IconButton, Center } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image,  ImageBackground} from 'react-native';
import { Globe, ArrowLeft, PlusCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';
import { CardAnotation } from '../../components/CardAnotation';



export function AnotationScreen() {
  let data = [[{
    id: '0',
    text: 'Recentes',
    recent: true
  },
  {
    id: '1',
    text: 'Tudo',
    recent: false
  },
 
  ], [
    {
    id: '2',
    text: 'Recentes',
    recent: true
  },
  {
    id: '3',
    text: 'Tudo',
    recent: false
  },
  
  ], [
    {
      id: '3',
      text: 'Recentes',
      recent: true
    },
    {
      id: '4',
      text: 'Tudo',
      recent: false
    },
    
  
  ],

];
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.goBack();
  }

  return ( 
    <ScrollView >
     <VStack flex={1} 
        bg="#180F34"       
        > 
            <HStack paddingTop={5}  paddingX = {4} style={styles.title}     >

          
            <TouchableOpacity  onPress={handleNewOrder}>
          <Image   style={styles.imageLogoHome} source={require('../../assets/images/homeicon.png')} />
          </TouchableOpacity>
            <HStack >
            <Text 
               marginTop ={-1}
                fontFamily="robobold" 
                textAlign= "center"
                color={'#FFFFFF'}
                fontSize={18}>
                    Anotação
                </Text>
                <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
            </HStack>
              
                <IconButton
              marginTop = {-3}
              marginRight={-2}
              icon={<PlusCircle color="#FFFFFF" size={28} />}
              onPress={handleNewOrder}
            />

              
            </HStack>
           
            
            <View 
            marginTop={30}>
             <TouchableOpacity  onPress={handleNewOrder}> 
            <Text paddingX={5} fontFamily={'robolight'} marginBottom={3}  style={styles.secondtitle} >O que eu sonhei hoje</Text>
            </TouchableOpacity>

        <HStack marginBottom={10}>
          <FlatList
            data={data[0]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardAnotation

                cor = {"#2FC217"}
                data={item}
              ></CardAnotation>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </HStack>
            </View>
          
            <TouchableOpacity  onPress={handleNewOrder}> 
        <Text paddingX={5} fontFamily={'robolight'} marginBottom={3} style={styles.secondtitle}> Estresse do dia </Text>
        </TouchableOpacity>
        <HStack marginBottom={10}>
          <FlatList
            data={data[1]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardAnotation

              cor = {"#FD0541"}
                data={item}
              ></CardAnotation>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </HStack>
        <TouchableOpacity  onPress={handleNewOrder}> 
        <Text paddingX={5} fontFamily={'robolight'} marginBottom={3}  style={styles.secondtitle} >Metas do dia</Text>
        </TouchableOpacity>
        <HStack marginBottom={10}>
          <FlatList
            data={data[2]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardAnotation
                cor = {"#1DC0B7"}
                data={item}
              ></CardAnotation>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </HStack>

        </VStack>

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  secondtitle:{
    color: "#FFFFFF",
    alignContent: "center",
    fontSize: 12,
   
  },
  imageLogo:{
    width: 18,
    height: 18,
    marginRight: -2,
    marginLeft: 5,

  },
  imageLogoHome:{
    width: 35,
    height:35,
    marginTop: -8,
 
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  
});
