import React from "react";
import { TextInput } from "react-native";
import commonStyles from "../styles/commonStyles";

export default function NoteInput({ value, onChangeText }) {
  return (
    <TextInput
      style={commonStyles.note}
      placeholder="Tu wpisz swoją notatkę..."
      value={value}
      onChangeText={onChangeText}
    />
  );
}
