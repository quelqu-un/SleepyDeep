import { Text, useTheme, VStack, Pressable, IPressableProps, Box, Divider, Heading, Input } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';




export function SearchBarComponent(){
       return(
           <VStack   my="5" space={5} w="100%" maxW="330px" divider={<Box  px="2">
            <Divider />
            </Box>}>
            <VStack w="100%" space={5} alignSelf="center">
                   
               <Input marginTop={4} marginLeft = {7} bg="#310569" placeholder="Pesquisar"  variant="filled" width="100%" borderRadius="10" py="1" px="3" InputLeftElement={<MagnifyingGlass  style={styles.lupa} color="#FFFFFF" size={25}/> }/>
           </VStack>
           </VStack>   
       )
}

// function SearchBar() {
//     return <VStack my="4" space={5} w="100%" maxW="300px" divider={<Box px="2">
//             <Divider />
//           </Box>}>
//         <VStack w="100%" space={5} alignSelf="center">
//           <Heading fontSize="lg">Cupertino</Heading>
//           <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
//         </VStack>
  
//         <VStack w="100%" space={5} alignSelf="center">
//           <Heading fontSize="lg">Material</Heading>
//           <Input placeholder="Search People & Places" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} />
//         </VStack>
//       </VStack>;
//   }
  
//   function Example() {
//     return <Center flex={1} px="2">
//         <SearchBar />
//       </Center>;
//   }

const styles = StyleSheet.create({
    lupa: {
      color: "#FFFFFF",
       marginLeft: 15,
    },
})