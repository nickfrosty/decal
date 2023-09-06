import { memo, useRef } from "react";
import { useColorScheme } from "react-native";
import { Text, View } from "@/components/core/Themed";
import { TextInput } from "@/components/core/Styled";
import Colors from "@/constants/Colors";

/**
 * display the seed phrase word list in a 3 column grid
 * (and memoize it)
 *
 * note: there is an edge case of the map `key` not being unique if the
 * user continues to generate multiple seed phrases
 */
export const SeedPhraseWordList = memo(
  ({ words, isInput }: { words: string[]; isInput?: boolean }) => {
    // create an array of refs to use to travel between input boxes
    const inputRefs = useRef(new Array());

    const theme = useColorScheme() ?? "light";

    return (
      <View className="flex flex-row flex-wrap items-center justify-between max-w-sm gap-2">
        {words.map((item, id) => (
          <View key={`${item}-${id}`} className="flex max-w-[33%] w-[31%]">
            {isInput ? (
              <TextInput
                ref={(ref) => (inputRefs.current[id] = ref)}
                className="flex-row p-2 text-base border !pl-8 rounded-xl"
                placeholder={(id + 1).toString()}
                keyboardType="default"
                returnKeyType={id + 1 == words.length ? "done" : "next"}
                onSubmitEditing={() =>
                  id + 1 < words.length
                    ? inputRefs?.current[id + 1]?.focus()
                    : undefined
                }
              />
            ) : (
              <Text
                className="flex-row p-2 text-base border !pl-8 rounded-xl"
                style={[
                  // note: update the TextInput styles to match this
                  {
                    backgroundColor: Colors[theme].background,
                    color: Colors[theme].text,
                    borderColor: Colors[theme].borderColor,
                  },
                ]}
              >
                {item}
              </Text>
            )}

            <Text className="absolute text-sm text-gray-400 top-1 left-2">
              {id + 1}.
            </Text>
          </View>
        ))}
      </View>
    );
  },
);
