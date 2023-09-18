import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthProvider";
import { shortText } from "@/lib/utils";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, ScrollView } from "@/components/core/Themed";
import { GhostLink } from "@/components/core/buttons";

export default function Screen() {
  const { walletDetails } = useAuth();

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: walletDetails?.label ?? shortText(walletDetails.address),
        }}
      />

      <View className="my-6">
        <View style={balance.container}>
          <Text
            style={balance.label}
            darkColor={Colors.dark.minorColor}
            lightColor={Colors.light.minorColor}
          >
            Balance
          </Text>

          <Text style={balance.amount}>$46.19</Text>
        </View>

        <PrimaryActionButtons />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View className="flex flex-row items-center justify-center gap-2 my-8">
        <GhostLink
          href="/accounts/seedPhrase/import"
          label="Import"
          className="rounded-lg"
        />
        <GhostLink
          href="/accounts/seedPhrase/generate"
          label="Generate"
          className="rounded-lg"
        />
      </View>

      <EditScreenInfo path="app/(wallet)/index.tsx" />
    </ScrollView>
  );
}

function PrimaryActionButtons() {
  return (
    <View className="flex flex-row items-center justify-center gap-2">
      <GhostLink
        href="/send"
        label="Send"
        icon="arrow-up"
        className="rounded-lg"
      />
      <GhostLink
        href="/request"
        label="Request"
        icon="arrow-down"
        className="rounded-lg"
      />
      {/* <GhostLink href="/swap" label="Swap" icon="arrows-h" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    // minHeight: "100%",
    // flex: 1,
    // alignItems: "baseline",
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 16,
    // gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    alignSelf: "center",
  },
});

const balance = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  amount: {
    fontSize: 48,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
