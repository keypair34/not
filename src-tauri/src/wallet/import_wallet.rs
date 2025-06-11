use crate::constants::store::store;
use crate::constants::store::STORE_KEYPAIRS;
use crate::constants::store::STORE_SEEDS;
use crate::model::keypair::SolanaWallet;
use crate::model::seed::Seed;
use crate::model::seed::SeedType;
use crate::wallet::derive_keypair::derive_keypair_default;
use chrono::Utc;
use serde_json::json;
use solana_sdk::signer::Signer;
use tauri::command;
use tauri::AppHandle;
use uuid::Uuid;

#[command]
pub fn import_solana_wallet(
    app: AppHandle,
    mnemonic_phrase: String,
) -> Result<SolanaWallet, String> {
    // Derive keypair using the helper function (default account 0, change 0)
    let keypair = derive_keypair_default(&mnemonic_phrase, 0)?;

    let pubkey = keypair.pubkey().to_string();
    let privkey = bs58::encode(keypair.to_bytes()).into_string();

    // Create a new Seed struct with a generated UUID and Imported type
    let seed_id = Uuid::new_v4();
    let seed_struct = Seed {
        id: seed_id,
        phrase: mnemonic_phrase.clone(),
        seed_type: SeedType::Imported {
            timestamp: Utc::now(),
        },
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
        account: 0,
        pubkey,
        privkey,
        seed: seed_id,
    };

    // Load existing keypairs, append, and save
    let mut keypairs: Vec<SolanaWallet> = match store.get(STORE_KEYPAIRS) {
        Some(value) => serde_json::from_value(value).unwrap_or_default(),
        None => Vec::new(),
    };
    keypairs.push(wallet.clone());
    store.set(STORE_KEYPAIRS, json!(keypairs));
    match store.save() {
        Ok(_) => Ok(wallet),
        Err(_) => Err("Error saving wallet".to_string()),
    }
}

// Add a tauri command to derive a new keypair from a stored seed UUID and account index
#[command]
pub fn derive_new_keypair(
    app: AppHandle,
    seed_uuid: Uuid,
    account: u32,
) -> Result<SolanaWallet, String> {
    // Load store and seeds
    let store = store(&app).map_err(|_| "Failed to load store".to_string())?;
    let seeds: Vec<Seed> = match store.get(STORE_SEEDS) {
        Some(value) => serde_json::from_value(value).unwrap_or_default(),
        None => Vec::new(),
    };
    // Find the seed by UUID
    let seed = seeds
        .iter()
        .find(|s| s.id == seed_uuid)
        .ok_or_else(|| "Seed not found".to_string())?;
    // Derive keypair using the mnemonic and account
    let keypair = derive_keypair_default(&seed.phrase, account)?;
    let pubkey = keypair.pubkey().to_string();
    let privkey = bs58::encode(keypair.to_bytes()).into_string();

    let wallet = SolanaWallet {
        account,
        pubkey,
        privkey,
        seed: seed_uuid,
    };

    // Optionally, you can save this new keypair to the store as well
    let mut keypairs: Vec<SolanaWallet> = match store.get(STORE_KEYPAIRS) {
        Some(value) => serde_json::from_value(value).unwrap_or_default(),
        None => Vec::new(),
    };
    keypairs.push(wallet.clone());
    store.set(STORE_KEYPAIRS, json!(keypairs));
    store.save().ok();

    Ok(wallet)
}
