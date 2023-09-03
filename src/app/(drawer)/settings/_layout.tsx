import { Stack } from "expo-router";
// import { useColorScheme } from "react-native";
// import Colors from "@/constants/Colors";

export default function Layout({ children }: any) {
  // const colorScheme = useColorScheme();

  return (
    <Stack
      // initialRouteName="home"
      screenOptions={{
        headerShown: false,
        title: "Settings",
        headerTitle: "Settings",
      }}
    >
      {/* <Stack.Screen name="home" /> */}
      {/* <Stack.Screen name="index" /> */}
    </Stack>
  );
}
