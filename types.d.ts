/**
 * Global types for use throughout the repo
 */

type Option<T> = T | null;

/**
 * Define simple type definitions of the env variables
 */
declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * General variables and settings
     */
    // API_URL: string;

    /**
     * Solana specific variables
     */
    EXPO_PUBLIC_SOLANA_RPC_MONIKER?: string;
    EXPO_PUBLIC_SOLANA_RPC_URL?: string;

    /**
     * Assorted variables used for testing and debugging only
     */
    EXPO_PUBLIC_DEBUG_MODE?: string;
    EXPO_PUBLIC_DEBUG_SEED_PHRASE?: string;
    EXPO_PUBLIC_DEBUG_SEED_WORD?: string;
  }
}
