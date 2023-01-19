import { VStack, HStack, Text,  ScrollView, IconButton } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, SafeAreaView,} from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image } from 'react-native';
import { Globe, ListBullets } from 'phosphor-react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';



export function HomeScreen() {
  let data = [[{
    id: '0',
    text: 'Ouvidos recentes',
    recent: true
  },
  {
    id: '1',
    text: 'Chuva Forte',
    recent: true
  },
  {
    id: '2',
    text: 'Música Instrumental',
    recent: true
  },
  ], [
    {
      id: '3',
      text: 'Ondas Alphas',
      recent: true
    },
    {
      id: '4',
      text: 'Sons da Natureza',
      recent: true
    },
    {
      id: '5',
      text: 'ASMR',
      recent: true
    },
  ], [
    {
      id: '6',
      text: 'História 1',
      recent: true
    },
    {
      id: '7',
      text: 'História 2',
      recent: true
    },
    {
      id: '8',
      text: 'História 3',
      recent: true
    },
  ], [
    {
      id: '0',
      text: 'O que eu sonhei hoje',
      recent: true
    },
    {
      id: '1',
      text: 'Metas do dia',
      recent: true
    },
    {
      id: '2',
      text: 'Estresse do dia',
      recent: true
    },
  ],

  ];

  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("musicHome");
  }

  function handleNewNewOrder() {
    navigation.navigate("musicplayer1");
  }

  function handleDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (

    <SafeAreaView style={styles.container}>

   
    <ScrollView /*_contentContainerStyle={{
      
      h: "100%",
      w: "100%"
    }*/
      marginBottom={10}
    >
      <VStack flex={1}
        bg="#180F34" /*23154F */
      >
        <HStack marginTop={10} paddingX={4} style={styles.title} >
          <IconButton 
            icon={<ListBullets color="#FFFFFF" size={25} />}
            onPress={handleDrawer}
          />
          <TouchableOpacity  onPress={handleNewNewOrder}> 
            <Image   style={styles.imageLogo} source={require('../../assets/images/moon1.png')} />
          </TouchableOpacity>
         
          <Text
            fontFamily="nuvem"
            color={'#FFFFFF'}
            fontSize={20}>
            SleepyDeep
          </Text>

          <VStack marginTop = {-2} alignItems={'center'}>
            <IconButton
              marginBottom={-2}
              icon={<Globe color="#FFFFFF" size={25} />}
              onPress={handleNewOrder}
            />

            <Text color={'#FFFFFF'}>br</Text>

          </VStack>
        </HStack>

        <Text paddingX={5} marginTop={8} marginBottom={4} fontFamily={'medium'} style={styles.secondtitle} >Músicas</Text>
        <HStack marginBottom={10}>
          <FlatList
            data={data[0]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardMusic
                data={item}
              ></CardMusic>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />

        </HStack>
        
        <HStack >

          <FlatList
            data={data[1]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardMusic
                data={item}
              ></CardMusic>
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          />

        </HStack>
        <Text paddingX={5} marginBottom={3} fontFamily={'medium'} style={styles.secondtitle} >Histórias para Dormir</Text>
        <HStack >

          <FlatList
            data={data[2]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardMusic
                data={item}
              ></CardMusic>
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          />

        </HStack>
        <Text paddingX={5} fontFamily={'medium'} marginBottom={3}  >Anotações</Text>
        <HStack marginBottom={10}>
          <FlatList
            data={data[3]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardAnotation
                data={item}
              ></CardAnotation>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </HStack>

      </VStack>


    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",
    fontSize: 11,
    
 
  },
  container: {
    
    color: "#FFFFFF",
  },
  imageLogo: {
    width: 30,
    height: 30,

  },
  
});
export default HomeScreen;