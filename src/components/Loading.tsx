import { Center, Spinner } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export function Loading() {
  return ( 
    <Center flex={1} bg="gray.700" style={styles.container}>
      <Spinner color="secondary.700" />
    </Center>
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