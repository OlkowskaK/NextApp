import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadNotes = async () => {
  const savedNotes = await AsyncStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
};

export const saveNotes = async (notes) => {
  await AsyncStorage.setItem("notes", JSON.stringify(notes));
};
