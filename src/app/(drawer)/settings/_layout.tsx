import { Stack, useNavigation } from "expo-router";
import { HeaderStyles, useThemeColor } from "@/components/core/Themed";
import { DrawerActions, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { XMarkIcon } from "react-native-heroicons/solid";

export default function Layout({ children }: any) {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        // title: "Settings",
        // headerTitle: "Settings",
        headerRight: () => (
          <XMarkIcon
            color={useThemeColor("iconColor")}
            style={HeaderStyles.icon}
            onPress={() => {
              navigation.navigate("index");
              navigation.jumpTo("(tabs)");
            }}
          />
        ),
      }}
    >
      {/* <Stack.Screen name="home" /> */}
      {/* <Stack.Screen name="index" /> */}
    </Stack>
  );
}
