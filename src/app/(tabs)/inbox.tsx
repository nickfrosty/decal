import { Stack } from "expo-router";
import { ScrollView, Text, View } from "@/components/core/Themed";

export default function Screen() {
  return (
    <ScrollView className={"flex flex-1 p-4 gap-8"}>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Inbox",
        }}
      />

      <Text>inbox home</Text>
    </ScrollView>
  );
}
