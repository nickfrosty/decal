import { Link, Tabs, Redirect } from "expo-router";
import { useColorScheme } from "react-native";
import { useAuth } from "@/context/AuthProvider";

import Colors from "@/constants/Colors";
import { MasterStyles, View, useThemeColor } from "@/components/core/Themed";

import {
  WalletIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  NewspaperIcon,
  QrCodeIcon,
  PhotoIcon,
  RectangleStackIcon,
  SparklesIcon,
  Squares2X2Icon,
  UsersIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from "react-native-heroicons/outline";
import {
  SettingsToggleButton,
  TouchableOpacity,
} from "@/components/core/Styled";

export default function TabLayout() {
  const { walletAddress, loaded } = useAuth();
  const colorScheme = useColorScheme();

  // do nothing while the app is still loading
  if (!loaded) return null;

  // after loaded, handle the auth state
  if (loaded && typeof walletAddress == "undefined") {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarShowLabel: false,
        headerLeft: () => <SettingsToggleButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <SparklesIcon size={32} color={color} />,
          headerRight: () => (
            <View className="flex-row items-center align-middle bg-transparent">
              <Link href={"/qr"} asChild>
                <TouchableOpacity>
                  <QrCodeIcon
                    color={useThemeColor("iconColor")}
                    style={MasterStyles.icon}
                  />
                </TouchableOpacity>
              </Link>
              {/* <Link href={"/send"} asChild>
                <TouchableOpacity>
                    <FontAwesome
                      name="send-o"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                </TouchableOpacity>
              </Link> */}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="dev"
        options={{
          tabBarIcon: ({ color }) => (
            <CodeBracketIcon size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => (
            <RectangleStackIcon size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          tabBarIcon: ({ color }) => <PhotoIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarIcon: ({ color }) => (
            <EnvelopeIcon size={30} color={color} />
            // <TabBarIcon name="envelope" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
