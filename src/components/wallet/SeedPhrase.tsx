import { memo, useRef } from "react";
import { useColorScheme } from "react-native";
import { Text, View } from "@/components/core/Themed";
import { TextInput } from "@/components/core/Styled";
import Colors from "@/constants/Colors";

type SeedPhraseWordListProps = {
  seedPhrase: string[];
  setSeedPhrase?: React.Dispatch<React.SetStateAction<string[]>>;
  isInput?: boolean;
};

/**
 * display the seed phrase word list in a 3 column grid
 * (and memoize it)
 *
 * note: there is an edge case of the map `key` not being unique if the
 * user continues to generate multiple seed phrases
 */
export const SeedPhraseWordList = memo(
  ({ seedPhrase, isInput, setSeedPhrase }: SeedPhraseWordListProps) => {
    // create an array of refs to use to travel between input boxes
    const inputRefs = useRef(new Array());
    const theme = useColorScheme() ?? "light";

    // if (!setSeedPhrase) setSeedPhrase = () => {};

    // handler function to actually update the state
    function handleTextChange(id: number, text: string) {
      if (!setSeedPhrase) return;

      setSeedPhrase((prev) => {
        // console.log(text.valueOf());
        prev[id] = text.valueOf().trim();
        return prev;
      });
    }

    return (
      <View className="flex flex-row flex-wrap items-center justify-between max-w-sm gap-2">
        {seedPhrase.map((item, id) => (
          <View key={`${item}-${id}`} className="flex max-w-[33%] w-[31%]">
            {isInput ? (
              <TextInput
                ref={(ref) => (inputRefs.current[id] = ref)}
                className="flex-row p-2 text-base border !pl-8 rounded-xl"
                // placeholder={(id + 1).toString()}
                keyboardType="default"
                returnKeyType={id + 1 == seedPhrase.length ? "done" : "next"}
                onSubmitEditing={() =>
                  id + 1 < seedPhrase.length
                    ? inputRefs?.current[id + 1]?.focus()
                    : undefined
                }
                value={seedPhrase[id]}
                onChangeText={(text) => handleTextChange(id, text)}
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
