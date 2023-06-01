import {StyleSheet, View,} from 'react-native';
import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen'

import Search from './Search';

import {Variables} from './assets/variables';
import * as ServerStartup from './utils/ServerStartup';
import {useEffect, useState} from "react";

const Stack = createNativeStackNavigator();

let variableClass = new Variables();
variableClass.mode('white')
let colors = variableClass.colors

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    const [serverUp, setServerUp] = useState(false)

    // checks if server is up and running
    useEffect(() => {
        (async () => {
            try {
                const check = await ServerStartup.check()
                console.log(check)
                if (check.status === 200) {
                    setServerUp(true)
                    await SplashScreen.hideAsync();
                }
                else{
                    const interval = setInterval(async () => {
                        const check = await ServerStartup.check()
                        console.log(check)
                        if (check.status === 200) {
                            clearInterval(interval)
                            setServerUp(true)
                            await SplashScreen.hideAsync();
                        }
                    }, 5000)
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, [])

    if (!serverUp) {
        return null
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({navigation}) => ({
                    headerStyle: {backgroundColor: '#DD5353'},
                    headerTintColor: colors.white,
                    contentStyle: {backgroundColor: colors.white},
                    headerTitleAlign: 'center',
                    headerTitleStyle: {fontSize: 40, fontWeight: 'bold', color: 'white'},
                    headerTitle: 'সদাই',
                })}
            >
                <Stack.Screen name='Home' component={Home}/>
            </Stack.Navigator>
            <StatusBar style='light'/>

        </NavigationContainer>
    );
}

const Home = () => {
    return (
        <>
            <View style={styles.container}>
                <Search/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 1,
    },
    brand: {
        fontSize: 35,
        color: colors.black
    },
    add_item_button_text: {
        color: colors.black,
        fontWeight: '400',
        fontSize: 20,
    }
});
