import { VStack, HStack, Text, ScrollView, IconButton, Center, Spacer, Button, Modal } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Globe, ArrowLeft, CaretDown } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';


export function DonateScreen() {
  const navigation = useNavigation();
  const [openBack, setOpenBack] = useState(false);
  const [placementBack, setPlacementBack] = useState(undefined);
  
  function handleNewOrder() {
    setOpenBack(true);
  }
  
  function handleNewNewOrder() {
    navigation.navigate("alarm");
  }


  return (
    
    <VStack flex={1}
      bg="#251751"
     
    >
    <ScrollView
        contentContainerStyle={{
          minHeight:'100%'
      }}
     >

        <HStack paddingTop={4} paddingX={4} style={styles.title} >


          <IconButton
            marginTop={-2}
            icon={<ArrowLeft color="#FFFFFF" size={25} />}
            onPress={handleNewNewOrder}
          />

          <Text
            marginRight={5}
            fontFamily="robobold"
            textAlign="center"
            color={'#FFFFFF'}
            fontSize={18}>
            Quero Doar
          </Text>

          <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
        </HStack>

        <VStack height = '30%' justifyContent={'center'} alignSelf={'center'} >
        
        <Text style= {styles.info}>
          Doe usando seu cartão de crédito
          </Text>
  
        </VStack>
       
        <VStack justifyContent={'center'} alignItems={'center'}
                >

                    <Button style={styles.button} >
                        <Text style={styles.text}>
                           PIX
                        </Text>
                    </Button>
                    <Button style={styles.button} >
                        <Text style={styles.text}>
                        Pay-pal
                        </Text>
                    </Button>
                    <Button style={styles.button} >
                        <Text style={styles.text}>
                           
                            Cartão de crédito
                        </Text>
                    </Button>
         </VStack>
    <Spacer />
    <HStack marginBottom={'30px'} flexDirection={'row'} justifyContent={'center'}>
    <Text style={styles.text}> Saiba mais</Text>
    <IconButton
            marginTop={-2}
            icon={<CaretDown color="#FFFFFF" size={20} />}
            onPress={handleNewOrder }
          />
    </HStack>
    
    </ScrollView>
    <Modal isOpen={openBack} onClose={() => setOpenBack(false)} safeAreaTop={true}>
        <Modal.Content height = "800" width="350"  alignItems={'center'}  
        {...styles[placementBack]} bg="#5C4EBC">
          <Modal.Header  bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
              Atenção
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Text color="#FFFFFF" fontSize={"14px"} fontFamily={'robomedium'}>
              Não é possível criar uma seção com um nome já existente.
            </Text>
          </Modal.Body>

          <Modal.Footer  bg="#5C4EBC"
          borderColor={"#5C4EBC"}
          >
            <Button.Group alignItems={'center'} justifyContent={"center"} width={'100%'}>
              
              <Button  bg="#2F2570" width={'120px'} height={'40px'}  onPress={() => {
                setOpenBack(false);
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                  OK
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
    justifyContent: "space-between"
  },
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",

  },
  imageLogo: {
    width: 25,
    height: 25,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "#6728B7",
    width: 180,
    height:50,
    marginBottom: 40,
},
text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    color: 'white',
},
info: {
  fontSize: 17,
  lineHeight: 21,
  fontWeight: 'normal',
  letterSpacing: 0.7,
  color: 'white',
  marginBottom: 50,
},
});