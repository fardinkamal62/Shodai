import { View, Text } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Home from './App'

export default function Settings({navigation}) {
    return (
        <View>
            <Stack.Navigator
                    screenOptions={({ navigation }) => ({
                        headerStyle: { backgroundColor: '#DD5353' },
                        headerTintColor: 'white',
                        contentStyle: { backgroundColor: "white" },
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontSize: 40, fontWeight: 'bold', color: 'white' },
                        headerTitle: 'সদাই',
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <FontAwesome name="gear" size={24} color="white" onPress={() => navigation.navigate('Settings')} />
                            </View>
                        ),
                    })}
                >
                <Stack.Screen name='Home' component={Home} />
                
            </Stack.Navigator>
            <Text>Settings Page fr</Text>
        </View>
    )
}