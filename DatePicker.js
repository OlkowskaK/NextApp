import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const DatePicker = ({ onDateChange, selectedDate }) => {
  const [inputDate, setInputDate] = useState(selectedDate); // Stan dla daty wpisanej przez użytkownika

  const handleInputChange = (text) => {
    // Usuwamy wszystkie znaki, które nie są cyframi lub myślnikami
    const cleanedText = text.replace(/[^0-9-]/g, "");

    let formattedDate = cleanedText;

    // Walidacja daty w formacie RRRR-MM-DD
    const dateParts = formattedDate.split("-");

    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);

      // Sprawdź, czy rok, miesiąc i dzień są w poprawnych zakresach
      if (
        year > 0 && // Rok musi być większy od 0
        month >= 1 &&
        month <= 12 && // Miesiąc musi być od 1 do 12
        day >= 1 &&
        day <= 31 // Dzień musi być od 1 do 31 (wymaga dodatkowej walidacji dla miesięcy)
      ) {
        // Dodatkowa walidacja dni dla miesięcy
        const daysInMonth = new Date(year, month, 0).getDate(); // Liczba dni w danym miesiącu
        if (day <= daysInMonth) {
          formattedDate = `${String(year).padStart(4, "0")}-${String(
            month,
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          setInputDate(formattedDate); // Ustawienie sformatowanej daty
          onDateChange(formattedDate); // Przekazanie daty do rodzica
        }
      }
    }

    // Jeśli nie ma pełnego formatu, po prostu ustaw jako tekst
    setInputDate(formattedDate);
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text>Wybierz datę:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
          width: "80%",
          textAlign: "center",
        }}
        value={inputDate}
        placeholder="RRRR-MM-DD"
        onChangeText={handleInputChange} // Zaktualizuj stan podczas pisania
        maxLength={10} // Maksymalna długość dla RRRR-MM-DD
      />
    </View>
  );
};

export default DatePicker;
