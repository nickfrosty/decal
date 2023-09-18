import { useCallback } from "react";
import {
  BottomModal,
  BottomModalProps,
  ModalHeader,
} from "@/components/core/BottomModal";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

export const TransactionModal = ({ modalRef }: BottomModalProps) => {
  /**
   * Callback function to close the modal
   */
  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  return (
    <BottomModal modalRef={modalRef}>
      <ModalHeader
        handleCloseModal={closeModal}
        title="Transaction Request"
        // description="Change your active wallet account"
      />

      <HeroIcon
        background="bg-gray-300"
        icon={<QuestionMarkCircleIcon size={40} color={"white"} />}
        label="decal.app"
      />

      <HeroTitleSection
        title={"Transaction Request"}
        description={"You are being asked to approve a transaction"}
      />
    </BottomModal>
  );
};
