import clsx from "clsx";
import { Link, LinkProps as DefaultLinkProps } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, useThemeColor } from "@/components/core/Themed";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/components/core/Styled";
import { forwardRef, memo } from "react";

type ButtonGenericProps = {
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  // iconPosition?: "left" | "right";
  label?: string;
  className?: string;
  labelClassName?: string;
};

export type LinkProps = ButtonGenericProps & DefaultLinkProps<string>;

export type ButtonProps = ButtonGenericProps & TouchableOpacityProps;

/**
 * todo: add support for the label and button styles for manually defining themed styled via the props
 */
export const Button = forwardRef(
  ({ icon, label, labelClassName, children, ...props }: ButtonProps, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        className={
          "flex flex-row items-center justify-center px-4 py-2 space-x-2 text-center rounded-full"
        }
        {...props}
      >
        {!!label && (
          <Text className={clsx("text-base", labelClassName)}>{label}</Text>
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
  },
);

export const GhostButton = (props: ButtonProps) => (
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

export const LinkButton = ({
  icon,
  label,
  labelClassName,
  ...props
}: LinkProps) => (
  <Link {...props} asChild>
    <Button icon={icon} label={label} labelClassName={labelClassName} />
  </Link>
);

export const GhostLink = (props: LinkProps) => (
  <LinkButton
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
