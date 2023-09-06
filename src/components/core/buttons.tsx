import clsx from "clsx";
import { Link, LinkProps as DefaultLinkProps } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, useThemeColor } from "@/components/core/Themed";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/components/StyledText";

type ButtonGenericProps = {
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  // iconPosition?: "left" | "right";
  label?: string;
  className?: string;
  labelClassName?: string;
};

type LinkProps = ButtonGenericProps & DefaultLinkProps<string>;

type ButtonProps = ButtonGenericProps & TouchableOpacityProps;

/**
 * todo: add support for the label and button styles for manually defining themed styled via the props
 */
export function Button({ icon, label, labelClassName, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className={
        "flex flex-row items-center justify-center w-full px-4 py-3 space-x-2 text-center rounded-full"
      }
      {...props}
    >
      {!!label && (
        <Text className={clsx("text-lg", labelClassName)}>{label}</Text>
      )}

      {!!icon && (
        <FontAwesome
          className="w-4 h-4"
          size={16}
          name={icon}
          color={useThemeColor("iconColor")}
        />
      )}
    </TouchableOpacity>
  );
}

export function GhostButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="bg-transparent border"
      style={[
        props.style,
        {
          borderColor: useThemeColor("borderColor"),
        },
      ]}
    />
  );
}

export function LinkButton({ icon, label, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={"rounded-lg border w-min flex flex-row px-4 py-2 mx-1"}
      asChild
    >
      <TouchableOpacity className="flex flex-row items-center justify-between space-x-2 w-min">
        {icon && (
          <FontAwesome
            className="w-4 h-4"
            size={16}
            name={icon}
            color={useThemeColor("iconColor")}
          />
        )}

        <Text className="text-lg">{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export function GhostLink(props: LinkProps) {
  return (
    <LinkButton
      {...props}
      className="bg-transparent"
      style={[
        props.style,
        {
          borderColor: useThemeColor("borderColor"),
        },
      ]}
    />
  );
}
