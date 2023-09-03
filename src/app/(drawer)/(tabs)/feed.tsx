import { Stack } from "expo-router";
import { ScrollView, Text } from "@/components/core/Themed";

export default function Screen() {
  return (
    <ScrollView className={"flex-1 p-4 gap-8"}>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Feed",
        }}
      />

      <Text>feed home page</Text>
    </ScrollView>
  );
}
