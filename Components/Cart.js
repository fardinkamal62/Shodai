import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {storeData, getAll, getData, getMultiple, flush} from "../utils/AsyncStorage";
import {Entypo} from "@expo/vector-icons";

export default ({data, reset}) => {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const countTotalPrice = (items) => {
        let total = 0;
        items.forEach((i) => total += i.price)
        setTotalPrice(total)
    };
    const getDataFromStorage = async () => {
        const all = await getMultiple(await getAll())
        let ab = [];
        all.map(a => {
            ab.push(a[1]);
        })
        let abc = [];
        ab.forEach((item) => {
            const parsedItem = JSON.parse(item);
            abc.push(parsedItem);
        });
        countTotalPrice(abc)
        setItems(abc)
    }

    useEffect(() => {
        if (data.name !== undefined) {
            reset();
            (async () => {
                await storeData(data.name, data);
                await getDataFromStorage()
            })()
        }
    }, [data]);

    useEffect(() => {
        (async () => {
            await getDataFromStorage()
        })()
    }, [])

    const def = () => {
        setItems([])
        flush()
        setTotalPrice(0)
    }
    return (
        <View style={styles.table}>
            <Entypo name='trash' size={24} onPress={def} style={{textAlign: 'right', padding: 5}}/>
            <View style={styles.row}>
                <Text style={styles.header}>Item</Text>
                <Text style={styles.header}>Quantity</Text>
                <Text style={styles.header}>Price(Taka)</Text>
            </View>

            {items.map(i =>
                <View style={styles.row} key={i.name}>
                    <Text style={styles.cell}>{i.name}</Text>
                    <Text style={[styles.cell, styles.border_left]}>{i.quantity} {i.unit}</Text>
                    <Text style={[styles.cell, styles.border_left]}>{i.price}</Text>
                </View>
            )}
            <View style={{borderTopWidth: 2}}/>
            <View style={styles.row}>
                <Text style={[styles.cell, {borderBottomWidth: 0}]}/>
                <Text style={[styles.cell, {borderBottomWidth: 0}]}/>
                <Text style={[styles.cell, {borderBottomWidth: 0, fontWeight: 'bold'}]}>{totalPrice}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        padding: 5,
        flex: 1,
        width: 400,
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
    },
    header: {
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        flex: 1,
    },
    cell: {
        flex: 1,
        textAlign: "center",
        padding: 5,
        textAlignVertical: 'center',
        borderBottomWidth: 1,
    },
    border_left: {
        borderLeftWidth: 2,
    },
});
