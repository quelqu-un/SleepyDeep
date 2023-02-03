import { VStack, HStack, Text, ScrollView, IconButton, View, Spacer, TextArea, KeyboardAvoidingView, Button } from 'native-base';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { ArrowLeft, Trash, Microphone } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function TextInputAnotation(props) {
    const navigation = useNavigation();
    const [note, setNote] = useState('');
    const [allNotes, setAllNotes] = useState();
    const { onPress, title = 'Salvar' } = props;

    const saveNote = async () => {
        //NOTES
        //TESTE
        //TESTE1
        //TESTE2
        //TESTE3
        //TESTE4
		const value = await AsyncStorage.getItem("TESTE4").then((noteee) => {
            const n = noteee ? JSON.parse(noteee) : [];
            n.push(note);

            AsyncStorage.setItem("TESTE4", JSON.stringify(n)).then(() => {
                getNotes();
            });
        })
	}

    const getNotes = () => {
		AsyncStorage.getItem("TESTE4").then((notes) => {
            console.log("oi", notes)
            console.log("ai", JSON.parse(notes))
			// setAllNotes(JSON.parse(notes));
            // console.log(allNotes);
		});
	}

    const handleNewOrder = () => {
        navigation.goBack();
    }

    const handleGravation = () => {
        navigation.navigate('gravation');
    }

    return (
        <VStack flex={1} height={"100%"} bg="#180F34"  >

            <ScrollView
                height={"100%"}
            >

                <HStack paddingTop={4} paddingX={4} style={styles.title} >


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
                        Título
                    </Text>


                    <IconButton
                        marginTop={-2}
                        icon={<Trash color="#FFFFFF" size={25} />}
                        onPress={handleNewOrder}
                    />

                </HStack>

                <View style={styles.enjoadinho} >
                    <TextInput
                        editable
                        multiline
                        value={note}
                        onChangeText={setNote}
                        placeholder={'Texto aqui'}
                        style={styles.input}
                    />
                </View>

                <Spacer />

                <HStack marginBottom={5} flexDirection={'row'} justifyContent={'center'}
                >

                    <Button style={styles.button} width={'100px'} onPress={saveNote}>
                        <Text style={styles.text}>
                            Salvar
                        </Text>
                    </Button>

                    <IconButton
                        icon={<Microphone style={styles.microphone} color="#FFFFFF" size={25} />}
                        onPress={handleGravation}
                    />
                </HStack>

            </ScrollView>

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
    imageLogo: {
        width: 25,
        height: 25,

    },
    input: {
        width: 380,
        minHeight: 600,
        padding: 10,
        backgroundColor: "#5C4EBC",
        textAlignVertical: 'top',
        marginBottom: 50,
        borderRadius: 20,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
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
