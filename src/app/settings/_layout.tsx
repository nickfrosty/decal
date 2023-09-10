import { Stack } from "expo-router";
import { MasterStyles, useThemeColor } from "@/components/core/Themed";
import { XMarkIcon } from "react-native-heroicons/solid";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Settings",
        headerTitle: "Settings",
        headerLeft: () => (
          <XMarkIcon
            color={useThemeColor("iconColor")}
            style={MasterStyles.icon}
            // onPress={() => navigation.goBack()}
          />
        ),
      }}
    >
      {/* <Stack.Screen name="settings" /> */}
      {/* <Stack.Screen name="changeWallet" /> */}
    </Stack>
  );
}
