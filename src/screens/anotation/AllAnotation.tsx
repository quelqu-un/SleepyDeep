import { VStack, HStack, Text, ScrollView, IconButton, Center, Spacer, Input, Box, Divider } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Globe, ArrowLeft, MagnifyingGlass } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';
import { SavedTextAnotation } from '../../components/SavedTextAnotation';
import { SavedRecAnotation } from '../../components/SavedRecAnotation';


export function AllAnotation() {
    let data = [[{
        id: '0',
        text: 'Chapeuzinho',
        datas: '01/08/22',
        recent: true
    },

    ], [
        {
            id: '1',
        text: 'Laura',
        datas: '01/08/22',
        recent: true
    },
        
    ], [
        {
            id: '2',
            text: 'Rainha',
            datas: '01/08/22',
            recent: true
        },
       
    ], [
        {
            id: '3',
            text: 'O resto nadinhar',
            datas: '01/08/22',
            recent: true
        },
       
    ],[
        {
            id: '4',
            text: 'Recording_01',
            datas: '01/08/22',
            recent: true
        },
       
    ],
    [
        {
            id: '5',
            text: 'Recording_02',
            datas: '01/08/22',
            recent: true
        },
       
    ],

    ];
    const navigation = useNavigation();

    function handleNewOrder() {
        navigation.goBack();
    }

    return (
        <VStack flex={1} alignItems = {'center'}
         height={"100%"} bg="#180F34" >


            <ScrollView _contentContainerStyle={{

                h: "100%",
                w: "100%",
            }} >
                <VStack
                    bg="#180F34"
                >

                        <HStack marginTop={3} paddingX={4} style={styles.title} >

                            <IconButton
                                marginTop={-2}
                                icon={<ArrowLeft color="#FFFFFF" size={25} />}
                                onPress={handleNewOrder}
                            />

                            <Text
                                marginRight={5}
                                fontFamily="robobold"
                                textAlign="center"
                                color={'#FFFFFF'}
                                fontSize={18}>
                                O que eu sonhei hoje
                            </Text>
                            < Image style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />
                        </HStack>

                      
                
                </VStack>
                <HStack marginTop={10}>
                            <FlatList
                                data={data[0]}
                                horizontal={true}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SavedTextAnotation
                                        data={item}
                                    ></SavedTextAnotation>
                                }
                                contentContainerStyle={{ paddingBottom: 40 }}
                            />
                        </HStack>
                        <HStack marginTop={-5}>
                            <FlatList
                                data={data[1]}
                                horizontal={true}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SavedTextAnotation
                                        data={item}
                                    ></SavedTextAnotation>
                                }
                                contentContainerStyle={{ paddingBottom: 40 }}
                            />
                        </HStack>
                        <HStack marginTop={-5}>
                            <FlatList
                                data={data[2]}
                                horizontal={true}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SavedTextAnotation
                                        data={item}
                                    ></SavedTextAnotation>
                                }
                                contentContainerStyle={{ paddingBottom: 40 }}
                            />
                        </HStack>
                        <HStack marginTop={-5}>
                            <FlatList
                                data={data[3]}
                                horizontal={true}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SavedTextAnotation
                                        data={item}
                                    ></SavedTextAnotation>
                                }
                                contentContainerStyle={{ paddingBottom: 40 }}
                            />
                        </HStack>
                        <HStack marginTop={-5}>
                            <FlatList
                                data={data[4]}
                                horizontal={true}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SavedRecAnotation
                                        data={item}
                                    ></SavedRecAnotation>
                                }
                                contentContainerStyle={{ paddingBottom: 40 }}
                            />
                        </HStack>
                        <HStack marginTop={-5}>
                            <FlatList
                                data={data[5]}
                                horizontal={true}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SavedRecAnotation
                                        data={item}
                                    ></SavedRecAnotation>
                                }
                                contentContainerStyle={{ paddingBottom: 40 }}
                            />
                        </HStack>


                <Spacer />

                <VStack my="5" maxW="380px" >
                    <Input

                        marginLeft={5}
                        bg="#310569"
                        placeholder="Pesquisar"
                        placeholderTextColor={"#FFFFFF"}
                        variant="filled"
                        borderRadius="10"
                        py="1"
                        px="3"
                        InputRightElement={<MagnifyingGlass style={styles.lupa} color="#FFFFFF" size={25} />} />
                </VStack>

            </ScrollView>
        </VStack>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    secondtitle: {
     
        alignContent: "center",
       

    },
    imageLogo: {
        width: 35,
        height: 35,

    },
    lupa: {
        marginTop: -2,
        // justifyContent:"flex-end",
        marginRight: 10,

    },
});
