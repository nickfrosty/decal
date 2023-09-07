import { forwardRef } from "react";
import { TouchableOpacity as DefaultTouchableOpacity } from "react-native-gesture-handler";

import { useColorScheme, TextInput as DefaultTextInput } from "react-native";
import { Text, TextProps, View, ViewProps } from "@/components/core/Themed";
import Colors from "@/constants/Colors";

export type TouchableOpacityProps = DefaultTouchableOpacity["props"];
export type TextInputProps = DefaultTextInput["props"];

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function ViewBox({ children, style, ...props }: ViewProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      className="flex flex-row items-center justify-between px-4 py-3 space-x-2 overflow-hidden align-middle border rounded-lg"
      style={[
        {
          borderColor: Colors[theme].borderColor,
          backgroundColor: Colors[theme].minorBackground,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
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
