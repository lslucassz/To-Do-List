import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";

import { ProductDatabase, useProductDatabase } from "../database/useProductDatabase";

import Ionicons from '@expo/vector-icons/Ionicons';


export default function Home() {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState<ProductDatabase[]>([]);

    const productDatabase = useProductDatabase()
    
    async function list() {
        try {
            const response = await productDatabase.searchByName(search)
            setProducts(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        list()
    }, [search])
    

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.vItens}>

                <FlatList
                    data={products}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 50 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.navigate({
                                pathname: '../Details',
                                params: {
                                    id: item.id
                                }
                            })}
                        >

                            <View style={{ gap: 10 }}>

                                <Text
                                    style={styles.text}
                                    numberOfLines={1}>
                                    {item.name}
                                </Text>
                                
                                <Text
                                    style={styles.text}
                                    numberOfLines={1}
                                >
                                    {item.description}
                                </Text>

                            </View>
                            
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
            

            <View style={{ position: 'absolute', bottom: 55, left: 25 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/AddList')}
                >
                    <Ionicons name="add" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    vItens: {
        alignItems: 'center',
        paddingTop: 50
    },
    card: {
        borderRadius: 10,
        width: 400,
        height: 70,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#CFCFCF'
    },
    text: {
        width: 250,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#46a32f',
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})