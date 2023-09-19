import { RefObject } from "react";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import {
  MasterStyles,
  Text,
  View,
  useThemeColor,
} from "@/components/core/Themed";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { TouchableOpacity } from "@/components/core/Styled";
import { XMarkIcon } from "react-native-heroicons/solid";
import clsx from "clsx";

export type ModalHeaderProps = {
  title?: string;
  description?: string;
  handleCloseModal: any;
};

export type BottomModalProps = {
  modalRef: RefObject<BottomSheetModal>;
  // title?: string;
  snapPoints?: Array<string>;
  children?: React.ReactNode;
};

export const DEFAULT_MODAL_SNAP_POINTS = ["45%", "80%"];

export const BottomModal = ({
  children,
  modalRef,
  snapPoints = DEFAULT_MODAL_SNAP_POINTS,
}: BottomModalProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
      handleStyle={{
        // backgroundColor: "red",
        paddingVertical: 16,
      }}
      handleIndicatorStyle={{
        backgroundColor: Colors[theme].text,
      }}
      backgroundStyle={{
        backgroundColor: Colors[theme].minorBackground,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
          {...props}
        />
      )}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          // backgroundColor: "red",
          paddingHorizontal: 12,
          rowGap: 8,
        }}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export const ModalHeader = ({
  title,
  description,
  handleCloseModal,
}: ModalHeaderProps) => {
  return (
    <View className="mb-5 bg-transparent">
      <View
        className={clsx(
          "flex flex-row items-center bg-transparent",
          !!title ? "justify-between w-full" : "right-0 justify-end absolute",
        )}
      >
        {!!title && <Text className={"font-semibold text-xl"}>{title}</Text>}

        <TouchableOpacity onPress={handleCloseModal} className="">
          <XMarkIcon
            // color={"black"}
            color={useThemeColor("iconColor")}
            style={MasterStyles.icon}
          />
        </TouchableOpacity>
      </View>

      {!!description && (
        <Text className={"text-base text-gray-500"}>{description}</Text>
      )}
    </View>
  );
};
