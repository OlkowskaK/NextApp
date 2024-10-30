import React from "react";
import { TimePickerModal } from "react-native-paper-dates";

export default function CustomTimePickerModal({
  visible,
  selectedTime,
  onConfirm,
  onDismiss,
}) {
  return (
    <TimePickerModal
      visible={visible}
      onDismiss={onDismiss}
      onConfirm={onConfirm}
      label="Wybierz godzinę"
      hours={selectedTime ? parseInt(selectedTime.split(":")[0]) : undefined}
      minutes={selectedTime ? parseInt(selectedTime.split(":")[1]) : undefined}
    />
  );
}
