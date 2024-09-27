import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import TimePicker from "./TimePicker"; // Komponent do wyboru godziny
import DatePicker from "./DatePicker"; // Komponent do wyboru daty

export default function App() {
  const [selectedDate, setSelectedDate] = useState("2024-09-27"); // Stan dla wybranej daty
  const [selectedTime, setSelectedTime] = useState("12:45"); // Stan dla wybranej godziny

  const handleDateChange = (date) => {
    setSelectedDate(date); // Ustawienie wybranej daty
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time); // Ustawienie wybranej godziny
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameApp}>
        <Text style={styles.name}>NextApp</Text>
      </View>

      <View style={styles.row}>
        <DatePicker
          onDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
        <TimePicker
          onTimeChange={handleTimeChange}
          selectedTime={selectedTime}
        />
        <TextInput style={styles.note} placeholder="Wpisz coś..." />
      </View>

      <View style={styles.row}></View>
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
  date: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  time: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  note: {
    fontSize: 16,
    flex: 2,
    textAlign: "right",
  },
});
