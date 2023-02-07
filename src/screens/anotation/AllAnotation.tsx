import { VStack, HStack, Text, ScrollView, IconButton, Spacer, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput } from 'react-native';
import { Image } from 'react-native';
import { ArrowLeft, MagnifyingGlass } from 'phosphor-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SavedTextAnotation } from '../../components/SavedTextAnotation';
import { SavedRecAnotation } from '../../components/SavedRecAnotation';
import { dataAllAnotation } from '../../model/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function AllAnotation() {
    const navigation = useNavigation();
    const [note, setNote] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchInputControl, setSearchInputControl] = useState(false);
    const [searchInputFilter, setSearchInputFilter] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        await AsyncStorage.getItem("TESTE7").then((notes) => {
            if (searchInput.length > 0) {
                let newNote = JSON.parse(notes).filter((item) => {
                    return item.title.match(searchInput);
                });

                setNote(newNote.reverse());
            } else {
                setNote(JSON.parse(notes).reverse());
            }
        });
    }

    const getAllNotes = async () => {
        await AsyncStorage.getItem("TESTE7").then((notes) => {
            setNote(JSON.parse(notes).reverse());
            setSearchInputFilter(false);
        });
    }

    const onDelete = async () => {
        getNotes();
    }

    function handleNewOrder() {
        if(searchInputFilter) {
            getAllNotes();
            setSearchInput("");
        } else {
            navigation.goBack();
        }
    }

    return (
        <VStack flex={1} alignItems={'center'}
            height={"100%"} bg="#180F34" >

            <VStack flex={1} width={'100%'} height={"100%"}>
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

                <Text color="#FFFFFF" textAlign={'center'}>
                    {searchInputControl ? 'Nenhum resultado encontrado' : null}
                </Text>

                <HStack marginTop={'10px'} width={'100%'}>
                    <FlatList
                        data={note}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            item.isRecording ?
                            <SavedRecAnotation
                                onDelete={onDelete}
                                data={item}
                            >
                            </SavedRecAnotation> :
                            <SavedTextAnotation
                                onDelete={onDelete}
                                data={item}
                            ></SavedTextAnotation>
                        }
                        contentContainerStyle={{ paddingBottom: 60 }}
                    />
                </HStack>

                <Spacer />
            </VStack>
            <VStack
                width={'100%'}
                height={'60px'}
                alignItems={'center'}
                justifyContent={'center'}
                bg={"#251751"}
                borderTopRadius={20}
                >
                <HStack 
                    width={'100%'} 
                    alignItems={'center'} 
                    paddingLeft={'10px'} 
                    paddingRight={'10px'}
                >
                    {/* <Input
                        bg="#310569"
                        placeholder="Pesquisar"
                        placeholderTextColor={"#FFFFFF"}
                        variant="filled"
                        borderRadius="10"
                        py="1"
                        px="3"
                        InputRightElement={<MagnifyingGlass style={styles.lupa} color="#FFFFFF" size={25} />} /> */}
                    <TextInput
                        style={{color: "#FFFFFF"}}
                        editable
                        multiline
                        value={searchInput}
                        onChangeText={(value) => {
                            setSearchInput(value);
                        }}
                        placeholder={'Titulo'}
                        placeholderTextColor={"#FFFFFF"}
                    />
                    <Spacer/>
                    <IconButton
                    onPress={() => {
                        if (searchInput.length > 0) {
                            setSearchInputFilter(true);
                            AsyncStorage.getItem("TESTE7").then((notes) => {
                                let newNote = JSON.parse(notes).filter((item) => {
                                    return item.title.match(searchInput);
                                });
    
                                setNote(newNote.reverse());
                                setSearchInputControl(false);
    
                                if(newNote.length === 0) {
                                    setSearchInputControl(true);
                                }
                            });
                        } 
                        else if(searchInput.length === 0) {
                            setSearchInputFilter(false);
                            getNotes();
                            setSearchInputControl(false);
                        }
                    }}
                    icon={<MagnifyingGlass color="#FFFFFF" size={25} />}/>
                </HStack>
            </VStack>
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
        marginRight: 10,

    },
});
