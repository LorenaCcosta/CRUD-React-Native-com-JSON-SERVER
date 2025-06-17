import { StyleSheet } from "react-native";

// styles da pagina AddEditScreen
const styles = StyleSheet.create({
  container1: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  image:{
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },


  
  // styles da pagina HomeScreen
  container: { flex: 1, padding: 20, marginTop: 40 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius:40,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: { fontSize: 16, fontWeight: "bold" },
  email: { color: "#444" },
  address: { color: "#666", fontSize: 12 },
  actions: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 12,
  },
  addButton: {
    //flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "center",
  },
  addText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default styles;