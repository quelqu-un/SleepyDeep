import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { HStack, IconButton, ScrollView, Text } from 'native-base'
import { ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import {translation} from '../routes/utils';
import { LangContext } from '../contexts/langProvider';

export function CustomDrawerContent(props) {

 const navigation = useNavigation();
 const context:any = useContext(LangContext);

 function handleNewOrder() {
    navigation.goBack();
  } 
    return (
        <DrawerContentScrollView 
        {...props}
        style={{flex:1, backgroundColor: "#4E2188", height: '100%'}}
        contentContainerStyle={{
            backgroundColor: "#4E2188",
        }}>
            <ScrollView 
              marginBottom={10}
            >
            <HStack style={styles.title} >
            <Text 
            marginLeft={4} 
            marginBottom={5}
            marginTop={2}
            fontSize={16}
            color="#FFFFFF"
            fontFamily={'robomedium'}
            >
                 {context.language  == 0
          ? translation[3].English
          : context.language  == 1
          ? translation[3].Portuguese
          : null}
            </Text>
            <IconButton
                  marginTop = {-2}
                  marginRight = {1}
                  
                icon={<ArrowLeft  color="#FFFFFF" size={22} />}
                onPress={handleNewOrder}
              />
            </HStack>

            <DrawerItemList 
                {...props} 
            />
            </ScrollView>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});