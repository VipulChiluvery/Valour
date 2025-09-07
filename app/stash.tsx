// app/stash.tsx
import { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/Task";

export default function StashScreen() {
  const { tasks, addTask, removeTask, editTask } = useTasks();

  // add form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState<"low" | "medium" | "high">("medium");

  // edit form
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stash</Text>

      {/* Add Task Form */}
      <TextInput
        placeholder="Task name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      {/* Importance buttons */}
      <View style={styles.importanceRow}>
        {["low", "medium", "high"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setImportance(level as "low" | "medium" | "high")}
            style={[
              styles.importanceBtn,
              { backgroundColor: importance === level ? "#ddd" : "#fff" },
            ]}
          >
            <Text style={{ textTransform: "capitalize" }}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Add Task"
        onPress={() => {
          if (name.trim() !== "") {
            addTask(name, { description, importance });
            setName("");
            setDescription("");
            setImportance("medium");
          }
        }}
      />

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onDelete={removeTask}
            onEdit={(task) => setEditingTask(task)} // open modal
          />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      {/* Edit Modal */}
      <Modal visible={!!editingTask} animationType="slide">
        <SafeAreaView style={styles.container}>
          <Text style={[styles.heading, styles.editHeading]}>Edit Task</Text>

          <TextInput
            placeholder="Task name"
            value={editingTask?.name || ""}
            onChangeText={(text) =>
              setEditingTask((t) => (t ? { ...t, name: text } : null))
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={editingTask?.description || ""}
            onChangeText={(text) =>
              setEditingTask((t) => (t ? { ...t, description: text } : null))
            }
            style={styles.input}
          />

          {/* Importance buttons */}
          <View style={styles.importanceRow}>
            {["low", "medium", "high"].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() =>
                  setEditingTask((t) => (t ? { ...t, importance: level as any } : null))
                }
                style={[
                  styles.importanceBtn,
                  {
                    backgroundColor:
                      editingTask?.importance === level ? "#ddd" : "#fff",
                  },
                ]}
              >
                <Text style={{ textTransform: "capitalize" }}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="Save"
            onPress={() => {
              if (editingTask) {
                editTask(editingTask.id, {
                  name: editingTask.name,
                  description: editingTask.description,
                  importance: editingTask.importance,
                });
                setEditingTask(null);
              }
            }}
          />
          <Button title="Cancel" onPress={() => setEditingTask(null)} />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: "600", marginBottom: 12},
  editHeading: {marginTop: 70}, 
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  importanceRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  importanceBtn: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
  },
});
