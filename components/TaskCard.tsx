// components/TaskCard.tsx
import { Button, StyleSheet, Text, View } from "react-native";
import type { Task } from "../types/Task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void; // pass the whole task to edit
};

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.name}</Text>
      {task.description && <Text>{task.description}</Text>}
      {task.dueDate && <Text>Due: {task.dueDate.toDateString()}</Text>}
      <Text>Importance: {task.importance}</Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
        <Button title="Edit" onPress={() => onEdit(task)} />
        <Button title="Delete" onPress={() => onDelete(task.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
