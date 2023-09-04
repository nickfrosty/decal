import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { DrawerToggleButton, View } from "@/components/core/Themed";

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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarShowLabel: false,
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <SparklesIcon size={32} color={color} />,
          headerRight: () => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Link href={"/qr"} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <QrCodeIcon
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              {/* <Link href={"/send"} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="send-o"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
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
