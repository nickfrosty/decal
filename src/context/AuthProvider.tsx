/**
 * NOTE: much of the boilerplate code her was taken from `@solana/wallet-adapter-react`
 */

import { STORAGE_KEY } from "@/lib/constants";
import { UserWalletDetails } from "@/lib/utils/wallet/details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PublicKey } from "@solana/web3.js";
import {
  type FC,
  type ReactNode,
  useMemo,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextState = {
  loaded: boolean;
  walletDetails: UserWalletDetails;
  setWalletDetails: React.Dispatch<React.SetStateAction<UserWalletDetails>>;
  walletAddress?: PublicKey;
};

export const AuthProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  // track the user's auth state
  const [loaded, setLoaded] = useState(false);
  const [walletDetails, setWalletDetails] = useState<UserWalletDetails>({
    address: "",
  });

  // auto load the desired data on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY.userWallet, (err, data) => {
      console.log("data:", data);

      if (!!data) setWalletDetails(JSON.parse(data));

      //
      setLoaded(true);
    });
  }, []);

  // auto save the settings when they are changed
  useEffect(() => {
    console.log("effect update trigger");
    if (!loaded) return;

    console.log("effect update", walletDetails);

    AsyncStorage.setItem(STORAGE_KEY.userWallet, JSON.stringify(walletDetails));
  }, [walletDetails]);

  // memoize the user's wallet address
  const walletAddress = useMemo(() => {
    console.log("derp");

    if (loaded && !!walletDetails && !!walletDetails?.address) {
      console.log("walletAddress set:", walletDetails?.address);
      return new PublicKey(walletDetails.address);
    } else return undefined;
  }, [walletDetails, loaded]);

  return (
    <AuthContext.Provider
      value={{
        // comment for better diffs
        loaded,
        walletDetails,
        setWalletDetails,
        walletAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState,
);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
