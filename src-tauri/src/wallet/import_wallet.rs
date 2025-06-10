use crate::constants::store::STORE_KEYPAIRS;
use crate::constants::store::STORE_SEEDS;
use crate::model::keypair::SolanaWallet;
use crate::model::seed::Seed;
use bip39::Mnemonic;
use chrono::Utc;
use crate::model::seed::SeedType;
use serde_json::json;
use solana_sdk::derivation_path::DerivationPath;
use solana_sdk::signature::Signer;
use solana_sdk::signer::keypair::keypair_from_seed_and_derivation_path;
use tauri::command;
use tauri::AppHandle;
use uuid::Uuid;
use crate::constants::store::store;

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
    let seed_bytes = bip39::Mnemonic::to_seed(&mnemonic, "");

    // Use Solana's default derivation path for browser wallets: m/44'/501'/0'/0'
    let derivation_path = DerivationPath::new_bip44(Some(0), Some(0));

    // Derive keypair
    let keypair = keypair_from_seed_and_derivation_path(&seed_bytes, Some(derivation_path))
        .map_err(|e| format!("Keypair derivation failed: {:?}", e))?;

    let pubkey = keypair.pubkey().to_string();
    let privkey = bs58::encode(keypair.to_bytes()).into_string();

    // Create a new Seed struct with a generated UUID and Imported type
    let seed_id = Uuid::new_v4();
    let seed_struct = Seed {
        id: seed_id,
        phrase: mnemonic_phrase.clone(),
        seed_type: SeedType::Imported { timestamp: Utc::now() },
    };

    // Save the seed struct to the store_seeds
    let store = match store(&app) {
        Ok(store) => store,
        Err(_) => {
            return Err("Failed to load store".to_string());
        }
    };
    // Load existing seeds, append, and save
    let mut seeds: Vec<Seed> = match store.get(STORE_SEEDS) {
        Some(value) => serde_json::from_value(value).unwrap_or_default(),
        None => Vec::new(),
    };
    seeds.push(seed_struct);
    store.set(STORE_SEEDS, json!(seeds));
    store.save().ok();

    let wallet = SolanaWallet {
        mnemonic: mnemonic_phrase,
        pubkey,
        privkey,
        seed: seed_id,
    };

    // Store the wallet using the same pattern as create_wallet.rs
    store.set(STORE_KEYPAIRS, json!(wallet));
    match store.save() {
        Ok(_) => Ok(wallet),
        Err(_) => Err("Error saving wallet".to_string()),
    }
}
