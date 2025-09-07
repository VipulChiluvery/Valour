// app/index.tsx
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Hello Valour 🚀</Text>
      <Link href="/stash" asChild>
        <Button title="Open Stash" />
      </Link>
    </View>
  );
}
