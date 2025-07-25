import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Button() {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.container}>

            <Ionicons name="add" size={40} color="black" />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})