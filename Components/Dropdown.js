import {View, TouchableOpacity, Text, FlatList, ScrollView, StyleSheet} from 'react-native';
import {useState} from 'react';

const variables = require('../assets/variables');
const colors = variables.colors

import Cart from './Cart';

export default (props) => {
    const [item, setItem] = useState({});
    const reset = () => setItem({})

    return (
        <>
            <Cart data={item} reset={reset}/>
            {
                props.data && <View style={[style.div]}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                        {props.data && props.data.map(t => {
                            return (
                                <TouchableOpacity key={t.name} onPress={(e) => {
                                    setItem({
                                        name: t.name,
                                        quantity: t.quantity,
                                        price: t.price,
                                        unit: t.unit,
                                    })
                                    e.stopPropagation();
                                }}>
                                    <View style={style.dropdown}>
                                        <Text>{t.name}</Text>
                                        <Text>{t.quantity} {t.unit}</Text>
                                        <Text>{t.price} Taka</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>}
        </>
    )
}

const style = StyleSheet.create({
    div: {
        borderColor: colors.primary,
        borderRadius: 10,
        borderWidth: 3,
        borderBottomWidth: 0,
        width: 340,
        maxWidth: 340,
        maxHeight: 200,
        backgroundColor: colors.white
    },
    dropdown: {
        justifyContent: "space-between",
        flexDirection: 'row',
        margin: 10,
    }
})
