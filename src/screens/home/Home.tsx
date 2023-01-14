import { VStack, HStack, Text, ScrollView } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image } from 'react-native';
import { Globe } from 'phosphor-react-native';

export function Home() {
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
  ],[
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
  ],[
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
  ],[
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

]

  return ( 
    <ScrollView /*_contentContainerStyle={{
      
      h: "100%",
      w: "100%"
    }*/ >
      <VStack flex={1} 
    bg="#251751" 
   > 
      <HStack marginTop={10}  paddingX = {4} style={styles.title} >
      <Image  style={styles.imageLogo}  source={require('../../assets/images/moon.png')}/>
      <Text   >SlyDeep</Text>
      
      <Text  marginTop={7}>br</Text>
      </HStack>

      <Text paddingX = {4} marginTop={6} marginBottom={5} style={styles.secondtitle} >Músicas</Text>
      <HStack marginBottom={10}>
      {/* <Globe color="#FFFFFF" size={24} /> */}
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
      <Text paddingX = {4}  marginBottom={3} style={styles.secondtitle} >Músicas</Text>
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
      <Text paddingX = {4}  marginBottom={3} style={styles.secondtitle} >Histórias para Dormir</Text>
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
<Text paddingX = {4}  marginBottom={3} style={styles.secondtitle} >Anotações</Text>
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
   
  },
  imageLogo:{
      width: 30,
      height: 30,
    
  },
});


      {/* <HStack marginBottom={10}>

        <CardMusic
          data={data[0][0]}
        ></CardMusic>

      </HStack>

      <HStack marginBottom={10}>

        <CardMusic
          data={data[0][0]}
        ></CardMusic>

      </HStack> */}