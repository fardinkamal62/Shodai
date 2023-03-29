import * as AsyncStorage from '@react-native-async-storage/async-storage'

export async function storeData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.default.setItem(key, jsonValue)
    } catch (e) {
        console.error(e);
    }
}

export async function getData(key) {
    try {
        const jsonValue = await AsyncStorage.default.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
    }
}

export async function getAll() {
    let keys = []
    try {
        keys = await AsyncStorage.default.getAllKeys()
    } catch (error) {
        console.error(error);
    } finally {
        return keys;
    }
}

export async function flush() {
    try {
        await AsyncStorage.default.clear();
        return await getAll();
    } catch (error) {
        console.log(error);
    }
}

export async function getMultiple(keys) {
    let values
    try {
        values = await AsyncStorage.default.multiGet(keys);
        return values
    } catch (e) {
        console.error(e)
    }
}