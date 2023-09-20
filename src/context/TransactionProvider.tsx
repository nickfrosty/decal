/**
 * NOTE: much of the boilerplate code her was taken from `@solana/wallet-adapter-react`
 */

import { TransactionModal } from "@/components/modals/TransactionModal";
import { useSimulateTransaction } from "@/hooks/useSimulateTransaction";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { VersionedTransaction } from "@solana/web3.js";
import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

type TransactionContextState = {
  triggerTransactionRequest: (transaction: VersionedTransaction) => void;
  cancelTransaction: Function;
};

export const TransactionProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const modalRef = useRef<BottomSheetModal>(null);

  //
  const [transaction, setTransaction] = useState<VersionedTransaction | null>(
    null,
  );

  /**
   *
   */
  const triggerTransactionRequest = useCallback(
    (transaction: VersionedTransaction) => {
      setTransaction(transaction);

      // open the modal
      modalRef.current?.present();
    },
    [modalRef, transaction, setTransaction],
  );

  /**
   *
   */
  const cancelTransaction = useCallback(() => {
    setTransaction(null);

    // close the modal
    modalRef.current?.dismiss();
  }, [modalRef]);

  const simulation = useSimulateTransaction({
    // comment for better diffs
    tx: transaction,
  });

  return (
    <TransactionContext.Provider
      value={{
        // comment for better diffs
        triggerTransactionRequest,
        cancelTransaction,
      }}
    >
      <TransactionModal
        modalRef={modalRef}
        simulation={simulation}
        transaction={transaction}
      />

      {children}
    </TransactionContext.Provider>
  );
};

export const TransactionContext = createContext<TransactionContextState>(
  {} as TransactionContextState,
);

export function useTransaction(): TransactionContextState {
  return useContext(TransactionContext);
}
