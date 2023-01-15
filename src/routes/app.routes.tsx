import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../screens/home/Home';
import { Anotation } from '../screens/home/Anotation';
import { AlarmComponent }  from '../screens/home/AlarmComponent';
import { Search } from '../screens/home/Search';

import { NotePencil, MagnifyingGlass, Alarm, ListBullets } from 'phosphor-react-native';

import React from 'react';

const Screen = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTab() {
  return(
    <Tab.Navigator 
    screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#2F2570',
        borderTopWidth: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#00FF00",
        shadowOffset: {width: 10, height: 14},
        shadowOpacity: 1,
        shadowRadius: 10,
        position: 'absolute',
        borderColor: '#2F2570',
      }
    }}
    >

      <Tab.Screen 
        name="all" 
        component={HomeTab} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if(focused) {
              return <ListBullets size={32} color="#FFFFFF"/>
            }

            return <ListBullets size={32} color="#FFFFFF"/>
          }
        }}
      />
      <Tab.Screen 
        name="anotation" 
        component={Anotation} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if(focused) {
              return <NotePencil color="#FFFFFF" size={25}/>
            }

            return <NotePencil color="#FFFFFF" size={25}/>
          }
        }}
      />
      <Tab.Screen 
        name="alarm" 
        component={AlarmComponent} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if(focused) {
              return <Alarm color="#FFFFFF" size={25}/>
            }

            return <Alarm color="#FFFFFF" size={25}/>
          }
        }}
      />
      <Tab.Screen 
        name="search" 
        component={Search} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused }) => {
            if(focused) {
              return <MagnifyingGlass color="#FFFFFF" size={25}/>
            }

            return <MagnifyingGlass color="#FFFFFF" size={25}/>
          }
        }}
      />

    </Tab.Navigator>
  );
}

function HomeTab() {

  return(
    <Screen.Navigator 
    screenOptions={{ 
      headerShown: false 
    }}
    >

      <Screen.Screen name="home" component={Home} />
      <Screen.Screen name="search1" component={Search} />

    </Screen.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Drawer.Navigator 
    screenOptions={{ 
      headerShown: false,  
    }}
    >

      <Drawer.Screen name="main" component={MainTab} />
      <Drawer.Screen name="main1" component={MainTab} />
      <Drawer.Screen name="main2" component={MainTab} />
      <Drawer.Screen name="main3" component={MainTab} />
      <Drawer.Screen name="main4" component={MainTab} />

    </Drawer.Navigator>
  );
}