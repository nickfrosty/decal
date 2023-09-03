import { memo, useRef } from "react";
import { Text, View } from "@/components/core/Themed";
import { TextInput } from "react-native-gesture-handler";

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

    return (
      <View className="flex flex-row flex-wrap items-center justify-between max-w-sm gap-2">
        {words.map((item, id) => (
          <View key={`${item}-${id}`} className="flex max-w-[33%] w-[31%]">
            {isInput ? (
              <TextInput
                ref={(ref) => (inputRefs.current[id] = ref)}
                className="flex-row p-2 text-base bg-white border border-gray-300 !pl-8 rounded-xl"
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
              <Text className="flex-row p-2 text-base bg-white border border-gray-300 !pl-8 rounded-xl">
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
