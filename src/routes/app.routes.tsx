import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from '../screens/home/HomeScreen';

import { MusicScreen } from '../screens/music/MusicScreen';
import { MusicPlayer } from '../screens/music/MusicPlayer';
import { AnotationScreen } from '../screens/anotation/AnotationScreen';
import { AlarmScreen }  from '../screens/alarm/AlarmScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { TextInputAnotation } from '../screens/anotation/TextInputAnotation';
import { AllAnotation } from '../screens/anotation/AllAnotation';

import { NotePencil, MagnifyingGlass, Alarm, House, CurrencyDollar, ArrowLeft, CurrencyCircleDollar } from 'phosphor-react-native';

import React, { useContext, useEffect } from 'react';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { GravationScreen } from '../screens/anotation/GravationScreen';
import { DonateScreen } from '../screens/alarm/DonateScreen';
import { LangContext } from '../contexts/langProvider';
import { dataHome } from '../model/Data';
import { translation } from './utils';


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
        name="homeMainTab" 
        component={HomeDrawer} 
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
              return <CurrencyCircleDollar  color="#FFFFFF" size={28}/>
            }

            return <CurrencyCircleDollar  color="#FFFFFF" size={28}/>
          }
        }}
      />

      <Tab.Screen 
        name="searchMainTab" 
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

function HomeDrawer() {
  const fontFamily = "Roboto_500Medium";
  const context:any = useContext(LangContext);
  
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
      name={context.language == 0
        ? dataHome[0][1].textEn
        : context.language == 1
        ? dataHome[0][1].textBr
        : null} 
      component={HomeScreen} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2F2570",
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[0][2].textEn
        : context.language == 1
        ? dataHome[0][2].textBr
        : null}  
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[1][0].textEn
        : context.language == 1
        ? dataHome[1][0].textBr
        : null}  
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[1][1].textEn
        : context.language == 1
        ? dataHome[1][1].textBr
        : null} 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[1][2].textEn
        : context.language == 1
        ? dataHome[1][2].textBr
        : null} 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? translation[1].English
        : context.language == 1
        ? translation[1].Portuguese
        : null} 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2F2570"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? translation[4].English
        : context.language == 1
        ? translation[4].Portuguese
        : null}
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[3][0].textEn
        : context.language == 1
        ? dataHome[3][0].textBr
        : null}
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[3][1].textEn
        : context.language == 1
        ? dataHome[3][1].textBr
        : null} 
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? dataHome[3][2].textEn
        : context.language == 1
        ? dataHome[3][2].textBr
        : null}
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#2E888D"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
        }
      }}
      />

      <Drawer.Screen 
      name={context.language == 0
        ? translation[5].English
        : context.language == 1
        ? translation[5].Portuguese
        : null}
      component={MainTab} 
      options={{
        drawerItemStyle: {
          paddingVertical: 4,
          backgroundColor: "#37DA1D"
        },
        drawerLabelStyle: {
          fontFamily: fontFamily
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
      <Screen.Screen name="music" component={MusicScreen} />
      <Screen.Screen name="musicplayer" component={MusicPlayer} />
      <Screen.Screen name="anotationText" component={TextInputAnotation} />
      <Screen.Screen name="allAnotation" component={AllAnotation} />
      <Screen.Screen name="gravation" component={GravationScreen} />
      <Screen.Screen name="donate" component={DonateScreen} />
    </Screen.Navigator>
  );
}