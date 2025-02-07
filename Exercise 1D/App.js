import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {Barometer} from "expo-sensors";

const styles = StyleSheet.create({
  container: {

  },
});

export default function App() {
    const [{Pressure,RelativeAltitude},setData] = useState({Pressure:0,RelativeAltitude:0});

    useEffect(()=> {
        Barometer.setUpdateInterval(100);

        const subscription = Barometer.addListener(setData);
        return () => subscription.remove();

    },[]);

  return (
      <View>
        <StatusBar/>
          <Text>Pressure: {Pressure}</Text>
          <Text>RelativeAltitude: {RelativeAltitude}</Text>


      </View>
  );
}



