import {StyleSheet, View,} from 'react-native';
import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';

import Search from './Search';

import {Variables} from './assets/variables';

const Stack = createNativeStackNavigator();

let variableClass = new Variables();
variableClass.mode('white')
let colors = variableClass.colors

export default function App() {
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
