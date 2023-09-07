import { TouchableOpacity as DefaultTouchableOpacity } from "react-native-gesture-handler";
import { Text, TextProps } from "./Themed";
import { forwardRef } from "react";

import { useColorScheme, TextInput as DefaultTextInput } from "react-native";
import Colors from "@/constants/Colors";

export type TouchableOpacityProps = DefaultTouchableOpacity["props"];
export type TextInputProps = DefaultTextInput["props"];

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export const TouchableOpacity = forwardRef<
  DefaultTouchableOpacity,
  TouchableOpacityProps
>((props: TouchableOpacityProps, ref) => {
  return <DefaultTouchableOpacity {...props} activeOpacity={0.7} />;
});

export const TextInput = forwardRef<DefaultTextInput, TextInputProps>(
  ({ style, ...otherProps }: TextInputProps, ref) => {
    const theme = useColorScheme() ?? "light";

    return (
      <DefaultTextInput
        placeholderTextColor={Colors[theme].minorColor}
        style={[
          {
            backgroundColor: Colors[theme].background,
            color: Colors[theme].text,
            borderColor: Colors[theme].borderColor,
          },
          style,
        ]}
        {...otherProps}
      />
    );
  },
);
