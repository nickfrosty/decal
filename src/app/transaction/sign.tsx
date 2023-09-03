import { Stack } from "expo-router";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import { List, ListItem } from "@/components/core/lists";
import { MonoText } from "@/components/StyledText";

export default function Screen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            // comment for better diffs
            title: "Request to Sign a Message",
          }}
        />

        <View className="flex items-center justify-center gap-2 my-4">
          <View className="items-center justify-center w-20 h-20 align-middle bg-green-500 rounded-full">
            <FontAwesome
              className="order-2 w-4 h-4"
              size={40}
              color={"white"}
              name={"bolt"}
            />
          </View>
          <MonoText className={"text-lg text-gray-600 text-center"}>
            decal.app
          </MonoText>
        </View>

        <View className="items-center gap-3">
          <Text className={"font-semibold text-2xl text-center"}>
            You are being asked to sign a message
          </Text>

          <Text className={"text-gray-500 text-base"}>
            Message signing is often used to verify ownership of an account, at
            no cost.
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between px-4 py-3 space-x-2 overflow-hidden align-middle bg-gray-100 border border-transparent border-gray-200 rounded-lg">
          <MonoText className={"text-base text-black"}>
            this is simple message that is so long that it should handle the
            word wrap
          </MonoText>
        </View>

        <Text className={"text-gray-500 text-center"}>
          No funds will be exchanged and no fees will be paid.
        </Text>

        <View className="flex flex-col gap-2">
          <Button
            label="Approve & Sign"
            onPress={() => Alert.alert("sign it")}
            className="bg-blue-500"
            labelClassName="text-white"
          />
          <Button
            label="Reject"
            onPress={() => Alert.alert("reject")}
            className="bg-transparent border-gray-300"
            labelClassName="text-black text-base"
            // icon="external-link"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: {
    // flex: 1,
    // height: "100%",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    gap: 20,
  },
});
