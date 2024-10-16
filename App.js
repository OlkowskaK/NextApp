import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { TimePickerModal } from "react-native-paper-dates";

const { width } = Dimensions.get("window");

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDateChange = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleTimeConfirm = ({ hours, minutes }) => {
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    setSelectedTime(formattedTime);
    setVisibleTime(false);
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        text: `${selectedDate} ${selectedTime}: ${note}`,
        date: new Date(`${selectedDate}T${selectedTime}`),
      };

      if (editingIndex !== null) {
        const updatedNotes = savedNotes.map((n, index) =>
          index === editingIndex ? newNote : n,
        );
        setSavedNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setSavedNotes([...savedNotes, newNote]);
      }

      // Sortuj notatki po dacie
      const sortedNotes = [...savedNotes, newNote].sort(
        (a, b) => a.date - b.date,
      );
      setSavedNotes(sortedNotes);

      setNote("");
    }
  };

  const handleEditNote = (index) => {
    setNote(savedNotes[index].text.split(": ")[1]);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameApp}>
        <Text style={styles.name}>NextApp</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonSpacing}>
            <Button
              title={selectedDate}
              onPress={() => setVisibleCalendar(true)}
            />
          </View>

          <View style={styles.buttonSpacing}>
            <Button title={selectedTime} onPress={() => setVisibleTime(true)} />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleCalendar}
          onRequestClose={() => setVisibleCalendar(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.dateLabel}>Wybierz datę</Text>

              <Calendar
                onDayPress={handleDateChange}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: "#6750a4" },
                }}
                theme={{
                  backgroundColor: "#e7e0ec",
                  calendarBackground: "#e7e0ec",
                  textSectionTitleColor: "#000",
                  selectedDayBackgroundColor: "#6750a4",
                  selectedDayTextColor: "#fff",
                  todayTextColor: "#6750a4",
                  dayTextColor: "#000",
                  textDisabledColor: "#f00",
                  monthTextColor: "#000",
                  indicatorColor: "#6750a4",
                }}
              />
              <View style={styles.calendarButtons}>
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => setVisibleCalendar(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => setVisibleCalendar(false)}
                >
                  <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TimePickerModal
          visible={visibleTime}
          onDismiss={() => setVisibleTime(false)}
          onConfirm={handleTimeConfirm}
          label="Wybierz godzinę"
          hours={
            selectedTime ? parseInt(selectedTime.split(":")[0]) : undefined
          }
          minutes={
            selectedTime ? parseInt(selectedTime.split(":")[1]) : undefined
          }
        />

        <TextInput
          style={styles.note}
          placeholder="Tu wpisz swoją notatkę..."
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>

      <Button title="Zapisz notatkę" onPress={handleSaveNote} />
      <View>
        <Text style={styles.tekstnote}>Moje notatki:</Text>
      </View>
      <ScrollView style={styles.savedNotesContainer}>
        {savedNotes.map((savedNote, index) => (
          <View key={savedNote.id} style={styles.noteContainer}>
            <Text style={styles.savedNote}>{savedNote.text}</Text>
            <View style={styles.noteButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditNote(index)}
              >
                <Text style={styles.buttonText}>Edytuj</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteNote(index)}
              >
                <Text style={styles.buttonText}>Usuń</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C3FFFE",
    padding: width > 400 ? 20 : 10,
    flexDirection: "column",
  },
  nameApp: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  name: {
    fontSize: width > 400 ? 40 : 30,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#A7E2E1",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonSpacing: {
    marginHorizontal: 5,
    width: "40%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#49454F",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  calendarButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    width: "100%",
  },
  customButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  note: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  tekstnote: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  savedNotesContainer: {
    marginTop: 10,
    flexGrow: 1,
    backgroundColor: "#A7E2E1",
  },
  savedNote: {
    fontSize: 16,
    marginVertical: 5,
  },
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  noteButtons: {
    flexDirection: "row",
  },
  editButton: {
    padding: 5,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 5,
    borderRadius: 5,
  },
});
