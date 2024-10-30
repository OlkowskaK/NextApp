import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import commonStyles from "../styles/commonStyles";

export default function CalendarModal({
  visible,
  selectedDate,
  onDateChange,
  onClose,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={commonStyles.modalBackground}>
        <View style={commonStyles.modalContainer}>
          <Text style={commonStyles.dateLabel}>Wybierz datę</Text>
          <Calendar
            onDayPress={(day) => onDateChange(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#6750a4" },
            }}
          />
          <View style={commonStyles.calendarButtons}>
            <TouchableOpacity
              style={commonStyles.customButton}
              onPress={onClose}
            >
              <Text style={commonStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
