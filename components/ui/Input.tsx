import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";

type InputProps = TextInputProps & {
  containerStyle?: object;
};

const Input = ({ style, containerStyle, ...props }: InputProps) => {
  const scheme = useColorScheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={scheme === "dark" ? "#aaa" : "#666"}
      style={[
        styles.input,
        {
          backgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
          color: scheme === "dark" ? "#fff" : "#000",
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#393939",
    padding: 12,
    borderRadius: 8,
  },
});

export default Input;
