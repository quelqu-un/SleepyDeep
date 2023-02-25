import { VStack, Box, Divider, Input } from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { LangContext } from '../contexts/langProvider';

export function SearchBarComponent() {
    const context:any = useContext(LangContext);
    
    return (
        <VStack my="5" space={5} w="100%" maxW="330px" divider={<Box px="2">
            <Divider />
        </Box>}>
            <VStack w="100%" space={5} alignSelf="center">

                <Input
                    marginTop={4}
                    style={styles.lupa}
                    marginLeft={7}
                    bg="#310569"
                    placeholder={context.language == 0
                        ? "Search"
                        : context.language == 1
                        ? "Pesquisar"
                        : null}
                    placeholderTextColor={"#FFFFFF"}
                    variant="filled"
                    width="100%"
                    borderRadius="10"
                    py="1"
                    px="3"
                    InputLeftElement={<MagnifyingGlass style={styles.lupa} color="#FFFFFF" size={25} />} />
            </VStack>
        </VStack>
    )
}


const styles = StyleSheet.create({
    lupa: {
        color: "#FFFFFF",
        marginLeft: 15,
    },
    lupaTexto: {
        color: "##310569",

    },
})