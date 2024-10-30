import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import commonStyles from "../styles/commonStyles";

export default function NoteList({ notes, onEdit, onDelete }) {
  return (
    <>
      {notes.map((note, index) => (
        <View key={note.id} style={commonStyles.noteContainer}>
          <Text style={commonStyles.savedNote}>{note.text}</Text>
          <View style={commonStyles.noteButtons}>
            <TouchableOpacity
              style={commonStyles.editButton}
              onPress={() => onEdit(index)}
            >
              <Text style={commonStyles.buttonText}>Edytuj</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={commonStyles.deleteButton}
              onPress={() => onDelete(index)}
            >
              <Text style={commonStyles.buttonText}>Usuń</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
}
