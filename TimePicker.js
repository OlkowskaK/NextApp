import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const TimePicker = ({ onTimeChange, selectedTime }) => {
  const [inputTime, setInputTime] = useState(selectedTime); // Stan dla godziny wpisanej przez użytkownika

  const handleInputChange = (text) => {
    // Usuwamy wszystkie znaki, które nie są cyframi
    const cleanedText = text.replace(/[^0-9]/g, "");

    let formattedTime = "";
    if (cleanedText.length >= 2) {
      // Dodaj dwukropek po dwóch cyfrach
      formattedTime = `${cleanedText.slice(0, 2)}:${cleanedText.slice(2, 4)}`;
    } else {
      formattedTime = cleanedText; // Jeśli mniej niż 2 cyfry, nie dodawaj dwukropka
    }

    // Walidacja godziny i minut
    const timeParts = formattedTime.split(":");
    if (timeParts.length === 2) {
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      // Sprawdź, czy godziny są w zakresie 0-23 i minuty w zakresie 0-59
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        setInputTime(formattedTime); // Ustawienie sformatowanej godziny
        onTimeChange(formattedTime); // Przekazanie godziny do rodzica
      }
    } else {
      setInputTime(formattedTime); // Ustawienie sformatowanej godziny
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text>Wybierz godzinę:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
          width: "80%",
          textAlign: "center",
        }}
        value={inputTime}
        placeholder="HH:MM"
        onChangeText={handleInputChange} // Zaktualizuj stan podczas pisania
        maxLength={5} // Maksymalna długość dla HH:MM
      />
    </View>
  );
};

export default TimePicker;
