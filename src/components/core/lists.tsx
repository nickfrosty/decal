import clsx from "clsx";
import { Pressable } from "react-native";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View, ViewProps } from "./Themed";

export function List({
  children,
  className,
}: ViewProps & { className?: string }) {
  return (
    <View
      className={clsx(
        "flex overflow-hidden border border-gray-200 rounded-lg",
        className,
      )}
      // style={style}
      children={children}
    ></View>
  );
}

type ListItemProps = {
  className?: string;
  style?: any;
  title: string;
  value?: string;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
} & PressableProps;

export function ListItem({
  style,
  title,
  value,
  icon,
  onPress,
}: ListItemProps) {
  return (
    <Pressable
      className={clsx(
        "flex flex-row items-center justify-between px-4 py-3 space-x-2 align-middle bg-gray-100 border border-transparent ",
      )}
      style={style}
      onPress={onPress}
    >
      <Text className={"text-base font-semibold text-black"}>{title}</Text>

      {!!value && (
        <View className="flex flex-row items-center gap-2 bg-transparent">
          <Text className={"text-base text-gray-600"}>{value}</Text>

          {icon && <FontAwesome className="w-4 h-4" size={16} name={icon} />}
        </View>
      )}
    </Pressable>
  );
}
