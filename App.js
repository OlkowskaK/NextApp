import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars"; // Nowy import kalendarza
import TimePicker from "./TimePicker"; // Komponent do wyboru godziny
import DatePicker from "./DatePicker"; // Komponent do wyboru daty

export default function App() {
  const [selectedDate, setSelectedDate] = useState("2024-09-27"); // Stan dla wybranej daty
  const [selectedTime, setSelectedTime] = useState("12:45"); // Stan dla wybranej godziny
  const [note, setNote] = useState(""); // Stan dla bieżącej notatki
  const [savedNotes, setSavedNotes] = useState([]); // Stan dla zapisanych notatek

  const handleDateChange = (day) => {
    setSelectedDate(day.dateString); // Ustawienie wybranej daty
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time); // Ustawienie wybranej godziny
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote = `${selectedDate} ${selectedTime}: ${note}`;
      setSavedNotes([...savedNotes, newNote]); // Zapisuje notatkę
      setNote(""); // Czyści pole tekstowe po zapisaniu notatki
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameApp}>
        <Text style={styles.name}>NextApp</Text>
      </View>

      <View style={styles.row}>
        {/* Komponent kalendarza */}
        <Calendar
          onDayPress={handleDateChange} // Obsługa wyboru daty
          markedDates={{
            [selectedDate]: { selected: true },
          }}
        />
        <TimePicker
          onTimeChange={handleTimeChange}
          selectedTime={selectedTime}
        />
        <TextInput
          style={styles.note}
          placeholder="Wpisz coś..."
          value={note} // Wiąże wartość z polem tekstowym
          onChangeText={(text) => setNote(text)} // Aktualizuje stan notatki
        />
      </View>
      <Button title="Zapisz notatkę" onPress={handleSaveNote} />
      <ScrollView style={styles.savedNotesContainer}>
        {savedNotes.map((savedNote, index) => (
          <Text key={index} style={styles.savedNote}>
            {savedNote}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C3FFFE",
    padding: 20,
  },
  nameApp: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 40,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#1BC1C1",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 2,
  },
  note: {
    fontSize: 16,
    flex: 2,
    textAlign: "right",
  },
  savedNotesContainer: {
    marginTop: 20,
  },
  savedNote: {
    fontSize: 16,
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 3,
  },
});
