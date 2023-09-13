import { useConnection } from "@/context/ConnectionProvider";
import {
  VersionedTransaction,
  SimulatedTransactionResponse,
  TransactionError,
  SimulatedTransactionAccountInfo,
} from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { useAsync } from "react-async-hook";

// type SimulateTransactionResult = any;

type SimulateTransactionProps = {
  tx: VersionedTransaction;
};

export const useSimulateTransaction = ({
  // comment for better diffs
  tx,
}: SimulateTransactionProps) => {
  console.log("\n\nuseSimulateTransaction");
  const { connection } = useConnection();

  // define assorted state tracking variables for the data to be returned
  const [estimatedFee, setEstimatedFee] = useState<number>(5_000);
  const [error, setError] = useState<TransactionError | null>(null);
  const [accountChanges, setAccountChanges] =
    useState<null | Array<SimulatedTransactionAccountInfo | null>>(null);

  // craft and memoize the provided transaction into a known good format
  const transaction = useMemo(() => {
    // console.log("memoize the transaction");

    // const transaction = VersionedTransaction.deserialize(tx.serialize())
    // transaction.message.getAccountKeys().get(0)

    return tx;
  }, []);

  // memoize the list of all accounts for the transaction
  const accountAddresses = useMemo(
    () =>
      transaction.message
        .getAccountKeys()
        .keySegments()
        .flat()
        .map((account) => account.toBase58()),
    [transaction.message],
  );

  // const { result } = useAsync(async () => {

  useEffect(() => {
    (async () => {
      console.log("async - simulate");

      // get and add a recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.message.recentBlockhash = blockhash;

      // ask the blockchain what the fee to be be paid is, it's more accurate
      let { value: estimatedFee } = await connection.getFeeForMessage(
        transaction.message,
      );

      // when no fee was returned, fallback to 5k lamports per signature
      setEstimatedFee(
        estimatedFee ||
          5_000 * transaction.message.header.numRequiredSignatures,
      );

      // todo: should we care if the transaction has already been signed?
      // console.log("signatures:", transaction.signatures.length);
      // console.log(transaction.signatures);

      // actually simulate the transaction
      const { context, value: sim } = await connection.simulateTransaction(
        transaction,
        {
          /**
           * note: enabling signature verification often results in throwing an error
           * this is because if we cannot change the blockhash if the tx has already been signed
           */
          sigVerify: false,

          // auto-magically replace the blockhash to ensure we use a recent one
          replaceRecentBlockhash: false,
          // note: we are doing this manually above, so why do it twice?

          /**
           * provide the formatted list of accounts so we can
           * parse the simulated state changes in the UI
           */
          accounts: {
            // note: this encoding is for the `data` returned for each address
            encoding: "base64",
            // properly format the transaction provided accounts for the simulation
            addresses: accountAddresses,
          },
        },
      );

      // full result
      // console.log("sim result:", sim);

      /**
       * process the errors from the simulation
       */
      if (sim.err) {
        setError(sim.err);
        console.log("err:", sim.err);

        // jump out of here when an error was provided via simulation
        // return undefined;
      }

      /**
       * process the data for the simulated account state changes
       */
      if (sim.accounts) {
        setAccountChanges(sim.accounts);

        console.log("\naccount count:", sim.accounts?.length);
        console.log("accounts:", sim.accounts);
      } else console.log("no 'accounts' data");

      // todo: process the logs?
      // console.log("logs:", sim.logs);

      return sim;
    })();

    // return () => {
    //   second
    // }
  }, []);
  // }, [connection, transaction]);

  return {
    estimatedFee,
    error,
    accountChanges,
    accountAddresses,
  };
};
