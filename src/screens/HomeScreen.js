import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import CalendarModal from "../components/CalendarModal";
import TimePickerModal from "../components/TimePickerModal";
import NoteInput from "../components/NoteInput";
import NoteList from "../components/NoteList";

import { getTodayDate } from "../utils/getTodayDate";
import { loadNotes, saveNotes } from "../services/storage";
import commonStyles from "../styles/commonStyles";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const initializeNotes = async () => {
      const loadedNotes = await loadNotes();
      if (loadedNotes) setSavedNotes(loadedNotes);
    };
    initializeNotes();
  }, []);

  const handleSaveNote = async () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        text: `${selectedDate} ${selectedTime}: ${note}`,
        date: new Date(`${selectedDate}T${selectedTime}`),
      };
      let updatedNotes =
        editingIndex !== null
          ? savedNotes.map((n, i) => (i === editingIndex ? newNote : n))
          : [...savedNotes, newNote];
      updatedNotes.sort((a, b) => a.date - b.date);
      setSavedNotes(updatedNotes);
      await saveNotes(updatedNotes);
      setEditingIndex(null);
      setNote("");
    }
  };

  const handleEditNote = (index) => {
    setNote(savedNotes[index].text.split(": ")[1]);
    setEditingIndex(index);
  };

  const handleDeleteNote = async (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.nameApp}>
        <Text style={commonStyles.name}>NextApp</Text>
      </View>
      <View style={commonStyles.row}>
        <View style={commonStyles.buttonContainer}>
          <Button
            title={selectedDate}
            onPress={() => setVisibleCalendar(true)}
          />
          <Button title={selectedTime} onPress={() => setVisibleTime(true)} />
        </View>
        <CalendarModal
          visible={visibleCalendar}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onClose={() => setVisibleCalendar(false)}
        />
        <TimePickerModal
          visible={visibleTime}
          selectedTime={selectedTime}
          onConfirm={({ hours, minutes }) =>
            setSelectedTime(`${hours}:${minutes < 10 ? "0" : ""}${minutes}`)
          }
          onDismiss={() => setVisibleTime(false)}
        />
        <NoteInput value={note} onChangeText={setNote} />
      </View>
      <Button title="Zapisz notatkę" onPress={handleSaveNote} />
      <Text style={commonStyles.tekstnote}>Moje notatki:</Text>
      <ScrollView style={commonStyles.savedNotesContainer}>
        <NoteList
          notes={savedNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </ScrollView>
    </View>
  );
}
