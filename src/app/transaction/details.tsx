import { Stack } from "expo-router";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import { List, ListItem } from "@/components/core/lists";
import { shortText } from "@/lib/utils";

export default function TransactionDetailsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          // name=""
          options={{ title: "Transaction Details" }}
        />

        <View className="flex items-center justify-center my-4">
          <View className="items-center justify-center w-20 h-20 align-middle bg-green-500 rounded-full">
            <FontAwesome
              className="order-2 w-4 h-4"
              size={40}
              color={"white"}
              name={"check"}
            />
          </View>
        </View>

        <View className="items-center gap-3">
          <Text className={"font-semibold text-2xl"}>Success</Text>

          <Text className={"text-gray-500"}>
            This transaction was successful
          </Text>
        </View>

        <List>
          <ListItem
            title="Date"
            value={new Date().toLocaleString()}
            className="border-b-gray-200"
          />
          {/* <ListItem title="Status" value={"success"} /> */}
          <ListItem
            title="Network fee"
            value={"< 0.00001 SOL"}
            className="border-b-gray-200"
          />
          <ListItem
            title="ID"
            value={shortText(
              "2HJJYdCsaqSrQHgoQVrGZzWCmxXZQnSUkshhPg4rxcM6PQUYr7P2AxzNT1wNvbD6zkTQXwurBVNYvsWop4K3jDPq",
              8,
            )}
            onPress={() => Alert.alert("copy")}
            icon="copy"
          />
        </List>

        {/* todo: show the associated memo with this transaction? */}

        <Button
          label="Close"
          onPress={() => Alert.alert("close")}
          className="bg-blue-500"
          labelClassName="text-white"
        />

        <View className="flex flex-row flex-grow gap-2">
          <Button
            label="Open on Explorer"
            onPress={() => Alert.alert("explorer")}
            className="flex-grow bg-transparent border-gray-300"
            labelClassName="text-black text-base"
            icon="external-link"
          />
          {/* <Button
            onPress={() => Alert.alert("copy signature")}
            className="bg-transparent border-gray-300"
            labelClassName="text-black text-base"
            icon={"copy"}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    gap: 20,
  },
});
