import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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

export default styles;
