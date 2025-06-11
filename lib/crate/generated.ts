/* This file is generated and managed by tsync */

/**
 * Generate:
 * tsync -i src-tauri/src/ -o lib/crate/generated.ts
 */
export const STORE = ".notwallet.dat";

export const STORE_KEYPAIRS = "keypairs";

export const STORE_SEEDS = "seeds";

export const STORE_WALLET = "wallet.json";

export const WALET_0 = "wallet_0";

export interface SolanaWallet {
  account: number;
  pubkey: string;
  privkey: string;
  seed: string;
}

export interface Seed {
  id: string;
  phrase: string;
  seed_type: SeedType;
}

export type SeedType =
  | {
      "Created": {
        timestamp: Date;
      }
    }
  | {
      "Imported": {
        timestamp: Date;
      }
    };
