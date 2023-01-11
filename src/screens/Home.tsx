import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VStack, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function Home() {


  return (
    <VStack flex={1} pb={6} bg="#2F2570">
      <Text style={styles.container}>Gabriel é o cara</Text>
      <Text>Gabriel é enjoadinho</Text>
      <Text>Gabriel é enjoadinho</Text>
      <Text>Laura é a cara</Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#FF00FF"
  },
});