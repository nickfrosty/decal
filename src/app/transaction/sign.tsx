import { Stack } from "expo-router";
import { Alert, StyleSheet } from "react-native";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import { MonoText, ViewBox } from "@/components/core/Styled";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { BoltIcon } from "react-native-heroicons/solid";

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

        <HeroIcon
          background="bg-green-500"
          icon={<BoltIcon size={40} color={"white"} />}
          label="decal.app"
        />

        <HeroTitleSection
          title={"You are being asked to\nsign a message"}
          description={
            "Message signing is often used to verify\n ownership of an account, at no cost."
          }
        />

        <ViewBox>
          <MonoText className="text-base">
            this is simple message that is so long that it should handle the
            word wrap
          </MonoText>
        </ViewBox>

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
