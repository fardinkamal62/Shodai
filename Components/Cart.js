import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {storeData, getAll, storeMultiple, getMultiple, flush} from "../utils/AsyncStorage";
import {Entypo} from "@expo/vector-icons";

import * as utilities from '../utils/utilities';

export default ({data, reset}) => {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const countTotalPrice = (items) => {
        let total = 0;
        items.forEach((i) => {
            i.price !== 0 && (total += i.price)
        })
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

    const emptyCart = () => {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, paddingTop: '50%'}}>Empty
                </Text>
                <Entypo name={'shopping-bag'} size={70} style={{color: '#d35555'}}/>
            </View>
        )
    }

    const handleIncreaseDecrease = (product, newPrice, steps = 500) => {
        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) => {
              if (item.name === product.name) {
                return { ...item, quantity: item.quantity + steps, price: item.price + newPrice };
              }
              return item;
            });
            return updatedItems;
          });
    }

    const handleIncrease = (product, steps = 500) => {
        const newPrice = utilities.priceCalculate(product.price, product.quantity, steps, product.basePrice, product.baseQuantity);
        handleIncreaseDecrease(product, newPrice, steps)
      };

    const handleDecrease = (product, steps = 500) => {
        const newPrice = utilities.priceCalculate(product.price, product.quantity, steps, product.basePrice, product.baseQuantity);
        if(product.quantity < 1) return
        handleIncreaseDecrease(product, -newPrice, -steps)
    }

    const deleteItem = (product) => {
      setItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.name !== product.name);
        return updatedItems;
      });
    };

    useEffect(() => {
          countTotalPrice(items);
          flush();
          (async () => {
            await storeMultiple(items);
          })();
    }, [items]);

    return (
        <>
            {items.length < 1 ? emptyCart() :
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
                            <View style={[styles.cell, styles.border_left]}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Pressable onPress={() => handleDecrease(i, i.steps)}>
                                        <Entypo name='circle-with-minus' color={'#DD5353'} size={22}/>
                                    </Pressable>

                                    <Text>{utilities.changeQuantity(i.quantity)} {i.quantity > 999 ? 'KG' : 'Gram'}</Text>

                                    <Pressable onPress={() => handleIncrease(i, i.steps)}>
                                        <Entypo name='circle-with-plus' color={'#DD5353'} size={22}/>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={[styles.cell, styles.border_left]}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text>{i.price}</Text>
                                    <Entypo name='circle-with-cross' color={'#DD5353'} size={22} onPress={() => {deleteItem(i)} }/>
                                </View>
                            </View>
                        </View>
                    )}
                    <View style={{borderTopWidth: 2}}/>
                    <View style={styles.row}>
                        <Text style={[styles.cell, {borderBottomWidth: 0}]}/>
                        <Text style={[styles.cell, {borderBottomWidth: 0}]}/>
                        <Text style={[styles.cell, {borderBottomWidth: 0, fontWeight: 'bold'}]}>{totalPrice}</Text>
                    </View>
                </View>}
        </>
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
    button: {
        color: '#DD5353'
    }
});
