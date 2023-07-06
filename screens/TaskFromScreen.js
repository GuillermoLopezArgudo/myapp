import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Layaout from "../components/Layaout";
import { saveTask, getTask, updateTask } from "../api";

const TaskFromScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTask(task);
      } else {
        await updateTask(route.params.id, task);
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: "Actualizar la tarea" });
      setEditing(true);

      (async () => {
        const task = await getTask(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  return (
    <Layaout>
      <TextInput
        style={styles.input}
        placeholder="Escribe un titulo"
        placeholderTextColor="#576574"
        onChangeText={(text) => handleChange("title", text)}
        value={task.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Escribe la descripción"
        placeholderTextColor="#576574"
        onChangeText={(text) => handleChange("description", text)}
        value={task.description}
      />
      {
        !editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Guardar Tarea</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Actualizar Tarea</Text>
          </TouchableOpacity>
        )}
      </Layaout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 35,
    color: "#ffffff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginbottom: 10,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },

  buttonUpdate: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBotton: 3,
    backgroundColor: "#e58e26",
    width: "90%"
  }
});

export default TaskFromScreen;
