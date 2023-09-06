import clsx from "clsx";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View, ViewProps, useThemeColor } from "@/components/core/Themed";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/components/core/Styled";

export function List({
  children,
  className,
  style,
}: ViewProps & { className?: string }) {
  return (
    <View
      className={clsx("flex overflow-hidden border rounded-lg", className)}
      style={[style, { borderColor: useThemeColor("borderColor") }]}
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
  isTopItem?: boolean;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
} & TouchableOpacityProps;

export function ListItem({
  style,
  title,
  value,
  icon,
  isTopItem,
  onPress,
}: ListItemProps) {
  return (
    <TouchableOpacity
      className={clsx(
        "flex flex-row items-center justify-between px-4 py-3 space-x-2 align-middle border border-transparent",
        isTopItem && "border-t-0",
      )}
      style={[
        style,
        {
          backgroundColor: useThemeColor("minorBackground"),
          borderTopColor: !isTopItem && useThemeColor("borderColor"),
        },
      ]}
      onPress={onPress}
      disabled={typeof onPress != "function"}
    >
      <Text className={"text-base font-semibold"}>{title}</Text>

      {!!value && (
        <View className="flex flex-row items-center gap-2 bg-transparent">
          <Text
            className={"text-base"}
            style={{ color: useThemeColor("minorColor") }}
          >
            {value}
          </Text>

          {icon && <FontAwesome className="w-4 h-4" size={16} name={icon} />}
        </View>
      )}
    </TouchableOpacity>
  );
}
