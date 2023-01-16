import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base'

export function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView 
        {...props}
        style={{flex:1, backgroundColor: "#6728B7", height: '100%'}}
        contentContainerStyle={{
            backgroundColor: "#6728B7",
        }}>
            <Text 
            marginLeft={4} 
            marginBottom={6}
            fontSize={16}
            color="#FFFFFF"
            fontFamily={'bold'}
            >
                Todas Categorias
            </Text>

            <View>
                <DrawerItemList 
                    {...props} 
                />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});