use crate::constants::{store::store_wallet, wallet_key::WALET_0};
use crate::wallet::create_wallet::SolanaWallet;
use bip39::Mnemonic;
use serde_json::json;
use solana_sdk::derivation_path::DerivationPath;
use solana_sdk::signature::Signer;
use solana_sdk::signer::keypair::keypair_from_seed_and_derivation_path;
use tauri::command;
use tauri::AppHandle;

#[command]
pub fn import_solana_wallet(
    app: AppHandle,
    mnemonic_phrase: String,
) -> Result<SolanaWallet, String> {
    // Parse mnemonic using FromStr
    let mnemonic = mnemonic_phrase
        .parse::<Mnemonic>()
        .map_err(|e| format!("Invalid mnemonic: {:?}", e))?;

    // Derive seed from mnemonic (BIP39 spec: PBKDF2 with mnemonic and empty passphrase)
    let seed = bip39::Mnemonic::to_seed(&mnemonic, "");

    // Use Solana's default derivation path for browser wallets: m/44'/501'/0'/0'
    let derivation_path = DerivationPath::new_bip44(Some(501), Some(0));

    // Derive keypair
    let keypair = keypair_from_seed_and_derivation_path(&seed, Some(derivation_path))
        .map_err(|e| format!("Keypair derivation failed: {:?}", e))?;

    let pubkey = keypair.pubkey().to_string();
    let privkey = bs58::encode(keypair.to_bytes()).into_string();

    let wallet = SolanaWallet {
        mnemonic: mnemonic_phrase,
        pubkey,
        privkey,
    };

    // Store the wallet using the same pattern as create_wallet.rs
    let store = match store_wallet(&app) {
        Ok(store) => store,
        Err(_) => {
            return Err("Failed to load store".to_string());
        }
    };
    store.set(WALET_0, json!(wallet));
    match store.save() {
        Ok(_) => Ok(wallet),
        Err(_) => Err("Error saving wallet".to_string()),
    }
}
