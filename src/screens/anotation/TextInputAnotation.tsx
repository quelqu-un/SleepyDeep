import { VStack, HStack, Text, ScrollView, IconButton, View, Spacer, Button, Modal } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ArrowLeft, Trash, Microphone } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NoteType = {
    id: string;
    text: string;
    isRecording: boolean;
    audioPath: string;
    date: string;
    title: string;
}

export function TextInputAnotation(props) {
    const navigation = useNavigation();
    const [note, setNote] = useState(props.route.params.text ? props.route.params.text : '');
    const [noteTitle, setNoteTitle] = useState(props.route.params.title ? props.route.params.title : '');
    const [openBack, setOpenBack] = useState(false);
    const [placementBack, setPlacementBack] = useState(undefined);
    const [saveControl, setSaveControl] = useState(false);
    const [idAnotation, setIdAnotation] = useState(props.route.params.idAnotation ? props.route.params.idAnotation : undefined);

    const saveNote = async () => {
        //NOTES
        //TESTE
        //TESTE1
        //TESTE2
        //TESTE3
        //TESTE4
        //TESTE5
        //TESTE6
        //TESTE7
        //TESTECOUNT1
        //TESTECOUNT2

        if(note.length === 0 || noteTitle.length === 0) {
            setOpenBack(true);
            return
        }

        setSaveControl(true);

        if(idAnotation === undefined) {
            console.log(idAnotation)
            await AsyncStorage.getItem("TESTECOUNT2").then((count) => {
                let countJson = count ? JSON.parse(count) : 0;
    
                AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
                    let noteJson = noteValue ? JSON.parse(noteValue) : [];
    
                    const dateNow = new Date(Date.now());
                    const dateString = `${dateNow.getUTCDate()}/${dateNow.getUTCMonth() + 1}/${dateNow.getUTCFullYear()}`;
                    
                    const newValue: NoteType = {
                        id: countJson,
                        text: note,
                        isRecording: false,
                        audioPath: '',
                        date: dateString,
                        title: noteTitle,
                    }
                    
                    const indexChange = noteJson.indexOf(noteJson.filter(function(obj){return obj.name === props.route.params.name;})[0]);
                    noteJson[indexChange].values.push(newValue);
    
                    AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(noteJson)).then(() => {
                        AsyncStorage.setItem("TESTECOUNT2", JSON.stringify(countJson + 1));
                        setSaveControl(false);
                        setNote("");
                        setNoteTitle("");
                        navigation.navigate('allAnotation', {
                            id: props.route.params.id,
                            name: props.route.params.name
                        });
                    });
                });
    
    
            });
        } else {

            AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
                let noteJson = noteValue ? JSON.parse(noteValue) : [];

                const dateNow = new Date(Date.now());
                const dateString = `${dateNow.getUTCDate()}/${dateNow.getUTCMonth() + 1}/${dateNow.getUTCFullYear()}`;
                
                const newValue: NoteType = {
                    id: idAnotation,
                    text: note,
                    isRecording: false,
                    audioPath: '',
                    date: dateString,
                    title: noteTitle,
                }
                
                const indexChange = noteJson.indexOf(noteJson.filter(
                    function(obj){return obj.name === props.route.params.name;})[0]
                );
                const indexValue = noteJson[indexChange].values.indexOf(
                    noteJson[indexChange].values.filter(
                        function(obj){return obj.id === idAnotation;}
                    )[0]
                );

                noteJson[indexChange].values[indexValue] = newValue;

                AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(noteJson)).then(() => {
                    setSaveControl(false);
                    setNote("");
                    setNoteTitle("");
                    navigation.navigate('allAnotation', {
                        id: props.route.params.id,
                        name: props.route.params.name
                    });
                });

            });
        }
    }

    const mensageModal = () => {
        if (note.length === 0 && noteTitle.length === 0) {
            return 'Insira o título e o texto.'
        } else if (note.length === 0) {
            return 'Insira o texto.'
        } else if (noteTitle.length === 0) {
            return 'Insira o título.'
        } else {
            return
        }
    }

    const handleNewOrder = () => {
        navigation.goBack();
    }

    const handleGravation = () => {
        navigation.navigate('gravation', {
            id: props.route.params.id,
            name: props.route.params.name
        });
    }
    const TodaysDate = () => {
        const dateNow = new Date(Date.now());

        return `${dateNow.getDate()}/${dateNow.getUTCMonth()+1}/${dateNow.getFullYear()}`

    }

    return (
        <VStack flex={1} height={"100%"} bg="#180F34"  >

            <ScrollView
                contentContainerStyle={{
                    minHeight:'100%'
                }}
            >
                    
                <HStack paddingTop={'20px'} paddingBottom={'20px'} paddingX={4} style={styles.title}>


                    <IconButton
                        marginTop={-2}
                        icon={<ArrowLeft color="#FFFFFF" size={25} />}
                        onPress={handleNewOrder}
                    />

                    <TextInput
                        style={{
                            color: "#FFFFFF",
                            fontSize: 16,
                            marginTop: -10
                        }}
                        editable
                        multiline
                        value={noteTitle}
                        onChangeText={setNoteTitle}
                        placeholder={'Titulo'}
                        placeholderTextColor={"#FFFFFF"}
                    />

                    <Image style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />

                </HStack>

                <VStack width={'100%'} alignItems={'center'}>
                    <VStack width={'85%'} alignItems={'flex-start'}>
                        <VStack marginBottom={8} style={styles.divdata} alignItems={'center'} >
                            <Text marginTop={1}
                                color="#FFFFFF"
                                fontSize={"13px"}
                                fontFamily={'robolight'}>
                                {TodaysDate()}
                                
                            </Text>
                        
                        </VStack>
                    </VStack>
                </VStack>

                <View style={styles.enjoadinho} >
                    <TextInput
                        editable
                        multiline
                        value={note}
                        onChangeText={setNote}
                        placeholder={'Texto aqui'}
                        placeholderTextColor={"#FFFFFF"}
                        style={styles.input}
                    />
                </View>

                <Spacer/>
                
                <HStack marginBottom={'30px'} flexDirection={'row'} justifyContent={'center'}
                >

                    <Button style={styles.button} onPress={saveNote} disabled={saveControl}>
                        <Text style={styles.text}>
                            Salvar
                        </Text>
                    </Button>

                    <IconButton
                        _pressed={{
                            backgroundColor: "#180F34"
                        }}
                        icon={<Microphone style={styles.microphone} color="#FFFFFF" size={28} />}
                        onPress={handleGravation}
                    />
                </HStack>
            </ScrollView>

         

            <Modal isOpen={openBack} onClose={() => setOpenBack(false)} safeAreaTop={true}>
                <Modal.Content maxWidth="350" {...styles[placementBack]} bg="#5C4EBC">
                    <Modal.Header bg="#5C4EBC" borderColor={"#5C4EBC"}>
                        <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
                            Atenção
                        </Text>
                    </Modal.Header>

                    <Modal.Body>
                        <Text color="#FFFFFF" fontSize={"14px"} fontFamily={'robomedium'}>
                            {mensageModal()}
                        </Text>
                    </Modal.Body>

                    <Modal.Footer bg="#5C4EBC" borderColor={"#5C4EBC"}>
                        <Button.Group width={'100%'}>
                            <Spacer />
                            <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                                setOpenBack(false);
                            }}>
                                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                                    Ok
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

        </VStack>

    );
}

const styles = StyleSheet.create({
    title: {
        color: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#180F34",
        marginBottom: 10,
    },
    secondtitle: {
        color: "#FFFFFF",
        alignContent: "center",
    },
    divdata:{
        width: 100,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#5C4EBC",
    },
    imageLogo: {
        width: 35,
        height: 35,
        marginTop: -2
    },
    input: {
        width: '85%',
        minHeight: 600,
        padding: 20,
        color: "#FFFFFF",
        backgroundColor: "#5C4EBC",
        textAlignVertical: 'top',
        marginBottom: 50,
        borderRadius: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        borderRadius: 20,
        backgroundColor: "#5C4EBC",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    microphone: {

        marginRight: -200,
    },
    enjoadinho: {
        alignItems: 'center',

    },
    data: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#5C4EBC",
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        width: 110,
        fontSize: 12,
        letterSpacing: 1.1,
    },
});