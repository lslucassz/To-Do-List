import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ProductDatabase, useProductDatabase } from "../../database/useProductDatabase";

import Feather from '@expo/vector-icons/Feather';

export default function Details() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [data, setData] = useState<ProductDatabase[]>([]);

    const productDatabase = useProductDatabase();

    async function list() {
        try {
            const response = await productDatabase.searchById(id)
            setData(response)
        } catch (error) {
            throw error
        }
    }

    async function remove(id: number) {
        try {
            await productDatabase.remove(id)

            router.navigate({
                pathname: "../Home"
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        list()
    }, [])
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.buttonDelete} onPress={() => remove(Number(id))}>

                <Feather name="trash-2" size={30} color="red"  />
                
            </TouchableOpacity>
            
            {data.map((item) => (
                <View key={item.id} style={styles.info}>

                    <View style={styles.vName}>

                        <Text style={styles.name}>{item.name}</Text>

                    </View>

                    <ScrollView style={styles.vDescription}>

                        <Text style={{ fontSize: 20 }}>Descrição:</Text>
                        <Text style={styles.description}>{item.description}</Text>

                    </ScrollView>
                    
                </View>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 25
    },
    description: {
        fontSize: 16,
        paddingTop: 40
    },
    buttonDelete: {
        marginTop: 50,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    vName: {
        paddingVertical: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vDescription: {
        paddingTop: 30,
        paddingHorizontal: 20,
    }

})