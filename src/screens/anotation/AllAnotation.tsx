import { VStack, HStack, Text, IconButton, Spacer } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput } from 'react-native';
import { ArrowLeft, MagnifyingGlass, PlusCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SavedTextAnotation } from '../../components/SavedTextAnotation';
import { SavedRecAnotation } from '../../components/SavedRecAnotation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LangContext } from '../../contexts/langProvider';
import { dataHome } from '../../model/Data';


export function AllAnotation(props) {
    const navigation = useNavigation();
    const [note, setNote] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchInputControl, setSearchInputControl] = useState(false);
    const [searchInputFilter, setSearchInputFilter] = useState(false);
    const [recControl, setRecControl] = useState([-1,false]);

    const context:any = useContext(LangContext);

    useEffect(() => {
        getNotes();
    }, [note]);

    const getNotes = async () => {
        await AsyncStorage.getItem("ALLSECTIONTEST1").then((notes) => {
            const  notesN = JSON.parse(notes);
            const indexChange = notesN.indexOf(notesN.filter(function(obj){return obj.name === props.route.params.name;})[0]);
            let arrayAux = notesN[indexChange].values;         

            if (searchInput.length > 0) {
                let newNote = arrayAux.filter((item) => {
                    return item.title.match(searchInput);
                });

                setNote(newNote.reverse());
            } else {
                setNote(arrayAux.reverse());
            }
        });
    }

    const getAllNotes = async () => {
        await AsyncStorage.getItem("ALLSECTIONTEST1").then((notes) => {
            const notesN = JSON.parse(notes);
            const indexChange = notesN.indexOf(notesN.filter(function(obj){return obj.name === props.route.params.name;})[0]);
            let arrayAux = notesN[indexChange].values;
            setNote(arrayAux.reverse());
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
            navigation.navigate('home');
        }
    }

    function handleNewNewOrder() {
        navigation.navigate("anotationText", {
            id: props.route.params.id,
            name: props.route.params.name,
        });
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
                            {props.route.params.name === "Sonhos" && context.language == 0 ? 
                            dataHome[3][0].textEn
                            : props.route.params.name === "Sonhos" && context.language == 1
                            ? dataHome[3][0].textBr
                            : null}
                            {props.route.params.name === "Metas do dia" && context.language == 0 ? 
                            dataHome[3][2].textEn
                            : props.route.params.name === "Metas do dia" && context.language == 1
                            ? dataHome[3][2].textBr
                            : null}
                            {props.route.params.name === "Estresse do Dia" && context.language == 0 ? 
                            dataHome[3][1].textEn
                            : props.route.params.name === "Estresse do Dia" && context.language == 1
                            ? dataHome[3][1].textBr
                            : null}
                            {props.route.params.name !== "Sonhos" &&
                            props.route.params.name !== "Estresse do Dia" &&
                            props.route.params.name !== "Metas do dia"  ? 
                            props.route.params.name : null}
                        </Text>
                        <IconButton
                            marginTop={-3}
                            marginRight={-2}
                            icon={<PlusCircle color="#FFFFFF" size={28} />}
                            onPress={handleNewNewOrder}
                        />
                    </HStack>

                </VStack>

                <Text color="#FFFFFF" textAlign={'center'}>
                
                    {searchInputControl ? 
                    context.language == 0
                        ? "No results found"
                        : context.language == 1
                        ? "Nenhum resultado encontrado"
                        : null 
                    :null}
                </Text>

                <HStack marginTop={'10px'} width={'100%'}>
                    <FlatList
                        data={note}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            item.isRecording ?
                            <SavedRecAnotation
                                name={props.route.params.name}
                                setRecControl={setRecControl}
                                recControl={recControl}
                                onDelete={onDelete}
                                data={item}
                            >
                            </SavedRecAnotation> :
                            <SavedTextAnotation
                                name={props.route.params.name}
                                id={props.route.params.id}
                                onDelete={onDelete}
                                data={item}
                            ></SavedTextAnotation>
                        }
                        contentContainerStyle={{ paddingBottom: 80 }}
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
                    <VStack 
                    paddingX={'10px'}
                    paddingY={'5px'}
                    width={'87%'} 
                    borderWidth={"1"} 
                    borderRadius={10}
                    borderColor={"#FFFFFF"}>
                        <TextInput
                            style={{
                                color: "#FFFFFF",
                                width: '100%', 
                            }}
                            editable
                            multiline
                            value={searchInput}
                            onChangeText={(value) => {
                                setSearchInput(value);
                            }}
                            placeholder={context.language == 0
                                ? "Search"
                                : context.language == 1
                                ? "Pesquisar"
                                : null}
                            placeholderTextColor={"#FFFFFF"}
                            underlineColorAndroid={'transparent'}
                        />
                    </VStack>
                    <Spacer/>
                    <IconButton
                    onPress={() => {
                        if (searchInput.length > 0) {
                            setSearchInputFilter(true);
                            AsyncStorage.getItem("ALLSECTIONTEST1").then((notes) => {
                                const notesN = JSON.parse(notes);
                                const indexChange = notesN.indexOf(notesN.filter(function(obj){return obj.name === props.route.params.name;})[0]);
                                let arrayAux = notesN[indexChange].values;
                                let newNote = arrayAux.filter((item) => {
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
