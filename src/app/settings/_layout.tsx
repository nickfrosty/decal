import { Stack, useNavigation } from "expo-router";
import { MasterStyles, useThemeColor } from "@/components/core/Themed";
import { XMarkIcon } from "react-native-heroicons/solid";

export default function Layout() {
  // const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        // title: "Settings",
        // headerTitle: "Settings",
        // headerRight: () => (
        //   <XMarkIcon
        //     color={useThemeColor("iconColor")}
        //     style={MasterStyles.icon}
        //     // onPress={() => navigation.goBack()}
        //   />
        // ),
      }}
    >
      {/* <Stack.Screen name="home" /> */}
      {/* <Stack.Screen name="index" /> */}
    </Stack>
  );
}
