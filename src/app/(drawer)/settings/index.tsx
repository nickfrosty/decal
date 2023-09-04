import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import {
  Text,
  View,
  ScrollView,
  useThemeColor,
} from "@/components/core/Themed";

export default function Screen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
            title: "Settings",
          }}
        />

        <Text
          className="text-base"
          style={{ color: useThemeColor("minorColor") }}
        >
          Developer Settings
        </Text>

        <View
          style={{
            // flex: 1,
            width: "100%",
            borderRadius: 8,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: useThemeColor("borderColor"),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 12,
              paddingHorizontal: 16,
              // borderColor: useThemeColor("borderColor"),
              // backgroundColor: useThemeColor("backgroundColor"),
              gap: 4,
            }}
          >
            <Text style={styles.text}>Settings home</Text>
          </View>
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 16,
    gap: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    marginHorizontal: "auto",
  },
  text: {
    fontSize: 18,
    // fontWeight: "400",
  },
  label: {
    fontSize: 16,
    // marginHorizontal: 10,
    // marginBottom: 2,
    fontWeight: "500",
    // color: useThemeColor("minorColor"),
  },
});
