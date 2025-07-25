import { TextInput, TextInputProps } from "react-native";

export default function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            style={{ borderWidth: 1, borderColor: 'black', width: 400, height: 50, borderRadius: 10 }}
            multiline={true}
            {...rest}
        />
    )  
}