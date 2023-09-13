/**
 * NOTE: much of the boilerplate code her was taken from `@solana/wallet-adapter-react`
 */

import { STORAGE_KEY } from "@/lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Connection,
  clusterApiUrl,
  type ConnectionConfig,
  Cluster,
} from "@solana/web3.js";
import React, {
  type FC,
  type ReactNode,
  useMemo,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// set the default settings to load for the user before they
const DEFAULT_SETTINGS: NetworkConnectionSettings = {
  cluster: "devnet",
  endpoint: clusterApiUrl("devnet"),
  config: { commitment: "confirmed" },
};

type NetworkConnectionSettings = {
  cluster: Cluster;
  endpoint: string;
  config: ConnectionConfig;
};

interface ConnectionContextState {
  connection: Connection;
  settings: NetworkConnectionSettings;
  setSettings: React.Dispatch<React.SetStateAction<NetworkConnectionSettings>>;
}

export const ConnectionProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  // track the user's connection settings, and allow updating them
  const [settings, setSettings] =
    useState<NetworkConnectionSettings>(DEFAULT_SETTINGS);

  // auto load the network connection configuration from local storage
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY.connection).then((data) => {
      if (!!data) setSettings(JSON.parse(data));
    });
  }, []);

  // auto save the settings when they are changed
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY.connection, JSON.stringify(settings));
  }, [settings]);

  // create a connection to the blockchain
  const connection = useMemo(
    () => new Connection(settings.endpoint, settings.config),
    [settings],
  );

  return (
    <ConnectionContext.Provider value={{ connection, settings, setSettings }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const ConnectionContext = createContext<ConnectionContextState>(
  {} as ConnectionContextState,
);

export function useConnection(): ConnectionContextState {
  return useContext(ConnectionContext);
}
