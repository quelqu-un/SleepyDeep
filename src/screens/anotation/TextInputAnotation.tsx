import { VStack, HStack, Text, ScrollView, IconButton, Center, View, Flex, Spacer } from 'native-base';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Globe, ArrowLeft, Trash, Microphone } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';
import { background } from 'native-base/lib/typescript/theme/styled-system';


export function TextInputAnotation(props) {
    const navigation = useNavigation();
    const [value, setUserName] = useState('');
    const { onPress, title = 'Salvar' } = props;

    function handleNewOrder() {
        navigation.goBack();
    }

    return (
        <VStack flex={1} height={"100%"} bg="#180F34"  >

            <ScrollView
             _contentContainerStyle={{

              h: "100%",
              w: "100%",
            }}
            >         
                   
                    <HStack marginTop={2}  paddingX={4} style={styles.title} >


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
                    
                    <Text style={styles.data} >
                        01/50/22
                    </Text>

                   

                    <View style={styles.enjoadinho} >
                    <TextInput
                            editable
                            multiline
                            value={value}
                            onChangeText={(text) => setUserName(text)}
                            placeholder={'Texto aqui'}
                            style={styles.input}
                        />
                    </View>
                       
                     
                      <Spacer />
                      
                        <HStack marginBottom = {5} flexDirection = {'row'} justifyContent ={'center'}
                          >
                        
                            <Pressable style={styles.button} onPress={onPress}>
                                <Text style={styles.text}>{title}</Text>
                            </Pressable>

                            <IconButton
                                icon={<Microphone style={styles.microphone} color="#FFFFFF" size={25} />}
                                onPress={handleNewOrder}
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
        backgroundColor: "#180F34"
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
        width: 350,
        height: 200,
        padding: 10,
        backgroundColor: "#5C4EBC",
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
         flex: 1,
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
