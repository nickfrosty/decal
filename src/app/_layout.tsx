import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ConnectionProvider } from "@/context/ConnectionProvider";

// import various global libraries
import "@/styles/global.css";
import "@/shims";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ConnectionProvider>
        <Stack screenOptions={{}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="wallet/generate" options={{}} />
          {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
          {/* <Stack.Screen name="settings" options={{}} /> */}
          <Stack.Screen name="send" options={{ presentation: "modal" }} />
          <Stack.Screen name="request" options={{ presentation: "modal" }} />
        </Stack>
      </ConnectionProvider>
    </ThemeProvider>
  );
}
