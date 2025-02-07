import React, { useState, useEffect } from 'react';
import { StatusBar, Button, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
    container: {},
});

export default function App() {
    const [mySound, setMySound] = useState(null);

    async function playSound() {
        const soundfile = require('./short1.wav');
        const { sound } = await Audio.Sound.createAsync(soundfile);
        setMySound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return () => {
            if (mySound) {
                console.log('Unloading Sound');
                mySound.unloadAsync();
            }
        };
    }, [mySound]);

    return (
        <View>
            <StatusBar />
            <Button title="Play Sound" onPress={playSound} />
        </View>
    );
}



