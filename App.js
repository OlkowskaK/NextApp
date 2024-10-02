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
  TouchableOpacity, // Import TouchableOpacity
} from "react-native";
import { Calendar } from "react-native-calendars"; // Kalendarz
import { TimePickerModal } from "react-native-paper-dates"; // Komponenty daty i czasu

const { width } = Dimensions.get("window"); // Pobranie wymiarów ekranu

export default function App() {
  const [selectedDate, setSelectedDate] = useState("2024-09-27"); // Stan dla wybranej daty
  const [selectedTime, setSelectedTime] = useState("12:00"); // Ustawienie domyślnej godziny
  const [note, setNote] = useState(""); // Stan dla bieżącej notatki
  const [savedNotes, setSavedNotes] = useState([]); // Stan dla zapisanych notatek
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false); // Stan dla widoczności modalnego selektora czasu

  const handleDateChange = (day) => {
    setSelectedDate(day.dateString); // Ustawienie wybranej daty
  };

  const handleTimeConfirm = ({ hours, minutes }) => {
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`; // Formatowanie godziny
    setSelectedTime(formattedTime); // Ustawienie wybranej godziny
    setVisibleTime(false); // Zamknięcie modalnego selektora czasu
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
        <View style={styles.buttonContainer}>
          {/* Przycisk do wyboru daty */}
          <View style={styles.buttonSpacing}>
            <Button
              title={selectedDate}
              onPress={() => setVisibleCalendar(true)}
            />
          </View>

          {/* Przycisk do wyboru godziny */}
          <View style={styles.buttonSpacing}>
            <Button
              title={selectedTime} // Użycie wybranej godziny
              onPress={() => setVisibleTime(true)}
            />
          </View>
        </View>

        {/* Wyświetlenie kalendarza w modalu */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleCalendar}
          onRequestClose={() => setVisibleCalendar(false)} // Zamykanie modalu
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Napis nad kalendarzem */}
              <Text style={styles.dateLabel}>Wybierz datę</Text>

              <Calendar
                onDayPress={handleDateChange}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: "#6750a4" }, // Zaznaczona data
                }}
                theme={{
                  backgroundColor: "#e7e0ec", // Tło kalendarza
                  calendarBackground: "#e7e0ec", // Tło kalendarza
                  textSectionTitleColor: "#000", // Kolor tytułu sekcji
                  selectedDayBackgroundColor: "#6750a4", // Tło dla wybranego dnia
                  selectedDayTextColor: "#fff", // Kolor tekstu dla wybranego dnia
                  todayTextColor: "#6750a4", // Kolor dla dzisiejszej daty
                  dayTextColor: "#000", // Kolor tekstu dla dni
                  textDisabledColor: "#f00", // Kolor tekstu dla nieaktywnych dni
                  monthTextColor: "#000", // Kolor tekstu miesiąca
                  indicatorColor: "#6750a4", // Kolor wskaźnika
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
          placeholder="Wpisz coś..."
          value={note} // Wiąże wartość z polem tekstowym
          onChangeText={(text) => setNote(text)} // Aktualizuje stan notatki
        />
      </View>

      <Button title="Zapisz notatkę" onPress={handleSaveNote} />
      <View>
        <Text style={styles.tekstnote}>Moje notatki</Text>
      </View>
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
    padding: width > 400 ? 20 : 10, // Zwiększony padding dla większych ekranów
    width: "100%",
    height: "100%",
  },
  nameApp: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  name: {
    fontSize: width > 400 ? 40 : 30, // Dynamiczny rozmiar czcionki w zależności od szerokości ekranu
    fontWeight: "bold",
  },
  row: {
    flexDirection: "column",
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 10,
  },
  buttonSpacing: {
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Przezroczyste tło
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 2,
  },
  dateLabel: {
    fontFamily: "Roboto",
    letterSpacing: 0.5,
    fontWeight: "500",
    lineHeight: 16,
    fontSize: 12,
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
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  tekstnote: {
    fontWeight: "bold",
    fontSize: 18,
  },
  savedNotesContainer: {
    marginTop: 10,
    width: "100%",
  },
  savedNote: {
    fontSize: 16,
    marginVertical: 5,
  },
});
