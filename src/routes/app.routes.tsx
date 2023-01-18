import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from '../screens/home/HomeScreen';

import { MusicScreen } from '../screens/music/MusicScreen';
import { MusicPlayer } from '../screens/music/MusicPlayer';
import { AnotationScreen } from '../screens/anotation/AnotationScreen';
import { AlarmScreen }  from '../screens/alarm/AlarmScreen';
import { SearchScreen } from '../screens/search/SearchScreen';

import { NotePencil, MagnifyingGlass, Alarm, House, CurrencyDollar } from 'phosphor-react-native';

import React from 'react';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { MusicPlayer1 } from '../screens/music/MusicPlayer1';

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
        name="home" 
        component={HomeTab} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if(focused) {
              return <House size={28} color="#FFFFFF"/>
            }

            return <House size={28} color="#FFFFFF"/> 
          },
          }
        }
      />

      <Tab.Screen 
        name="anotation" 
        component={AnotationScreen} 
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
        component={AlarmScreen} 
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
        component={SearchScreen} 
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

      <Screen.Screen name="home" component={HomeDrawer} />
      

    </Screen.Navigator>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator 
    screenOptions={{ 
      headerShown: false,
      drawerInactiveTintColor: "#FFFFFF",
      drawerActiveTintColor: "#FFFFFF",
    }}
    drawerContent={props => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen 
      name="Chuvas" 
      component={HomeScreen} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2F2570",
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Músicas instrumental" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Sons da natureza" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="ASMR" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Histórias de Ninar" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Sons de onda" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Anotações" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="O que sonhei hoje" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Estresse do dia" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Metas do dia" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        }
      }}
      />

      <Drawer.Screen 
      name="Doar" 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 6,
          backgroundColor: "#37DA1D"
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_400Regular'
        },
        drawerIcon: ({color}) => {
          return <CurrencyDollar color="#FFFFFF" size={16}/>
        }
      }}
      />

    </Drawer.Navigator>
  );
}

export function AppRoutes() {
  return(
    <Screen.Navigator 
    screenOptions={{ 
      headerShown: false 
    }}
    >
      <Screen.Screen name="home" component={MainTab} />
      <Screen.Screen name="search1" component={SearchScreen} />
      <Screen.Screen name="musicHome" component={MusicScreen} />
      <Screen.Screen name="musicplayer" component={MusicPlayer} />
      <Screen.Screen name="musicplayer1" component={MusicPlayer1} />
    </Screen.Navigator>
  );
}