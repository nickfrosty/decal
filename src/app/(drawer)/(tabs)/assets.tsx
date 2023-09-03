import { Stack } from "expo-router";
import { Text, ScrollView } from "@/components/core/Themed";

export default function AssetsScreen() {
  return (
    <ScrollView className={"flex flex-1 p-4 gap-8"}>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Assets",
        }}
      />
      <Text>assets home</Text>
    </ScrollView>
  );
}
