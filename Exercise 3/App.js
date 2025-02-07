import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    shakeText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'red',
    },
});

export default function App() {
    const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
    const [mySound, setMySound] = useState(null);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);
        const subscription = Gyroscope.addListener(setData);

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (x > 1.5 || x < -1.5 || y > 1.5 || y < -1.5 || z > 1.5 || z < -1.5) {
            if (!isShaking) {
                setIsShaking(true);
                playSound();
            }
        } else {
            setIsShaking(false);
        }
    }, [x, y, z]);

    async function playSound() {
        const soundfile = require('./short1.wav');
        const { sound } = await Audio.Sound.createAsync(soundfile);
        setMySound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return () => {
            if (mySound) {
                mySound.unloadAsync();
            }
        };
    }, [mySound]);

    return (
        <View style={styles.container}>
            <StatusBar />
            {isShaking && <Text style={styles.shakeText}>SHAKE</Text>}
            <Text style={styles.text}>x: {x}</Text>
            <Text style={styles.text}>y: {y}</Text>
            <Text style={styles.text}>z: {z}</Text>
        </View>
    );
}





