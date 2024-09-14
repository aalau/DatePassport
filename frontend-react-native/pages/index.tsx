import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapDiscovery
//import Geolocation from '@react-native-community/geolocation';

export default function Index() {
  return (
    <View>
        <MapDiscoveryView/>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
