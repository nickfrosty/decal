import { Stack } from "expo-router";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { useRef } from "react";

export default function Screen() {
  const searchInputRef = useRef<TextInput>(null);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          // name=""
          options={{
            title: "Search",
            // headerTitle: () => (
            //   <TextInput
            //     className="px-4 py-2 text-lg border border-gray-300 rounded-lg "
            //     placeholder="Search for a friend or address"
            //     // keyboardType="default"
            //   />
            // ),
          }}
        />

        {/* <View className="items-center gap-3">
          <Text className={"font-semibold text-2xl text-center"}>
            Search for someone
          </Text>

          <Text className={"text-gray-500 text-base"}>
            Message signing is often used to verify ownership of an account, at
            no cost.
          </Text>
        </View> */}

        <View className="flex flex-row items-center justify-between px-2 align-middle border border-gray-300 rounded-lg gap-x-2">
          <Pressable
            className="text-gray-400"
            onPress={() => searchInputRef.current?.focus()}
          >
            <FontAwesome size={18} name="search" color={"#aaa"} />
          </Pressable>
          <TextInput
            ref={searchInputRef}
            className="flex-grow px-2 py-2 text-lg"
            placeholder="Search for a friend or address"
            keyboardType="default"
          />
          <Pressable className="p-1" onPress={() => Alert.alert("qr code")}>
            <FontAwesome size={24} name="qrcode" />
          </Pressable>
        </View>

        {/* favorites list */}
        <View className="gap-2 pb-4 mb-4 border-b border-gray-300">
          <Text className={"font-semibold text-base text-gray-500"}>
            Favorites
          </Text>

          <View className="flex flex-row gap-x-4">
            {[0, 1, 2, 3].map((item, id) => (
              <Pressable
                key={id}
                onPress={() => Alert.alert("person")}
                className="flex flex-col items-center"
              >
                <View className="flex items-center justify-center align-middle bg-gray-200 rounded-full w-14 h-14">
                  <FontAwesome
                    className="w-4 h-4 border"
                    color={"#414141"}
                    size={32}
                    name="user"
                  />
                </View>
                <Text className={"text-base text-gray-500"}>Name</Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => Alert.alert("add new")}
              className="flex flex-col items-center"
            >
              <View className="flex items-center justify-center align-middle bg-gray-200 rounded-full w-14 h-14">
                <FontAwesome
                  className="w-4 h-4 border"
                  color={"#666"}
                  size={24}
                  name="plus"
                />
              </View>
              <Text className={"text-base text-gray-500"}></Text>
            </Pressable>
          </View>
        </View>

        {/* full width person card */}
        <Pressable
          onPress={() => Alert.alert("person")}
          className="flex flex-row items-center gap-5"
        >
          <View className="flex items-center justify-center align-middle bg-gray-200 rounded-full w-14 h-14">
            <FontAwesome
              className="w-4 h-4 border"
              color={"#414141"}
              size={32}
              name="user"
            />
          </View>

          <View className="space-y-0">
            <Text className={"font-semibold text-xl"}>Person Name</Text>
            <Text className={"text-base text-gray-400 tracking-widest"}>
              @username
            </Text>
          </View>
        </Pressable>
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
