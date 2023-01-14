import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../screens/home/Home';
import { Anotation } from '../screens/home/Anotation';
import { Alarm } from '../screens/home/Alarm';
import { Search } from '../screens/home/Search';

import React from 'react';

const Screen = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTab() {
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen name="home" component={HomeTab} />
      <Tab.Screen name="anotation" component={Anotation} />
      <Tab.Screen name="alarm" component={Alarm} />
      <Tab.Screen name="search" component={Search} />

    </Tab.Navigator>
  );
}

function HomeTab() {

  return(
    <Screen.Navigator screenOptions={{ headerShown: false }}>

      <Screen.Screen name="home2" component={Home} />
      <Screen.Screen name="search1" component={Search} />

    </Screen.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>

      <Drawer.Screen name="main" component={MainTab} />

    </Drawer.Navigator>
  );
}