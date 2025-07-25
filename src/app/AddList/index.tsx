import { useState } from "react";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import Input from "../../components/Input";
import { useProductDatabase } from "../../database/useProductDatabase";

export default function AddList() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    
    const productDatabase = useProductDatabase();

    async function create() {
        try {
            const response = await productDatabase.create({ name, description })

            Alert.alert("Lista Cadastrada!")
            router.navigate("../Home")

            return response
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <View style={styles.container}>

            <View style={styles.vInput}>

                <Text style={styles.text}>
                    Nome:
                </Text>

                <Input onChangeText={setName} value={name} />

                <Text style={styles.text}>
                    Descrição:
                </Text>

                <Input onChangeText={setDescription} value={description} />

            </View>

            <View style={styles.vButton}>

                <TouchableOpacity style={styles.button} onPress={create}>

                    <Text>Save</Text>
                    
                </TouchableOpacity>

            </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80,
        alignItems: 'center'
    },
    vInput: {
        gap: 16
    },
    text: {
        fontSize: 20,
        paddingLeft: 10
    },
    vButton: {
        position: 'absolute',
        bottom: 80
    },
    button: {
        backgroundColor: '#46a32f',
        borderRadius: 10,
        width: 100,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})