import { Stack } from "expo-router";
import { Alert, StyleSheet } from "react-native";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import { List, ListItem } from "@/components/core/lists";
import { shortText } from "@/lib/utils";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { CheckIcon } from "react-native-heroicons/outline";

export default function Screen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            // comment for better diffs
            title: "Transaction Details",
          }}
        />

        <HeroIcon
          background="bg-green-500"
          icon={<CheckIcon size={40} color={"white"} />}
        />

        <HeroTitleSection
          title={"Success"}
          description={"This transaction was successful"}
        />

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

        <View className="flex flex-col w-full gap-2">
          <Button
            label="Open on Explorer"
            onPress={() => Alert.alert("explorer")}
            className="flex-grow bg-transparent border-gray-300"
            labelClassName="text-black text-base"
            icon="external-link"
          />
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
