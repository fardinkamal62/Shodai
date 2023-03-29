import { Text, TextInput, TouchableOpacity, View, Pressable, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import { Entypo } from "@expo/vector-icons"

import Dropdown from "./Components/Dropdown.js";

const variables = require('./assets/variables')

const API_URL = "https://shodai-backend.glitch.me/items?item=";

const colors = variables.colors

export default () => {
    const [result, setResult] = useState(); // result fetched from api
    const [input, setInput] = useState(''); // input textarea

    const clearInput = () => {
        setInput('')
        setResult();
    }

    // clear result on empty textare
    useEffect(() => {
        if (input.length < 2) {
            setResult()
        }
    }, [input])

    return (
        <>
            <Dropdown data={result}/>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput placeholder='Start adding some সদাই' multiline={false} numberOfLines={1} spellCheck={false}
                    cursorColor='white' placeholderTextColor={colors.white} autoCorrect={false} value={input}
                    onChangeText={(e) => {
                        e.length > 1 && getItems(e).then(r => setResult(r));
                        setInput(e);
                    }}
                    style={[styles.textarea, result !== undefined && styles.textarea_secondary]} />
                <Pressable style={styles.button} onPress={() => clearInput()} >
                    <Entypo name='circle-with-cross' color={colors.white} size={24} />
                </Pressable>
            </View>
        </>
    )
}

// api call
const getItems = (item) => {
    return fetch(`${API_URL}${item}`)
        .then(response => response.json())
        .then(json => {
            if (json.length > 0) return json;
        })
        .catch(error => {
            console.error(error);
        });
}

const styles = StyleSheet.create({
    textarea: {
        backgroundColor: colors.primary, padding: 10, borderRadius: 5, color: 'white', width: 320, textAlign: 'center'
    },
    textarea_secondary: {
        borderTopLeftRadius: 0, borderTopRightRadius: 0,
    },
    button: {
        position: 'absolute', top: 13, right: 10, backgroundColor: colors.primary
    },
})