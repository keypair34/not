use crate::constants::store::store;
use crate::constants::wallet_key::WALET_0;
use crate::model::keypair::SolanaWallet;
use crate::model::seed::{Seed, SeedType};
use bip39::{Language, Mnemonic};
use chrono::Utc;
use log::{debug, error, info};
use solana_sdk::derivation_path::DerivationPath;
use solana_sdk::signature::Signer;
use solana_sdk::signer::keypair::keypair_from_seed_and_derivation_path;
use tauri::{command, AppHandle};
use uuid::Uuid;

fn generate_mnemonic_and_keypair(
    account: u32,
) -> Result<(String, solana_sdk::signer::keypair::Keypair), String> {
    // Generate a new 12-word mnemonic
    let mnemonic = Mnemonic::generate_in(Language::English, 12)
        .map_err(|e| format!("Mnemonic generation failed: {:?}", e))?;
    let mnemonic_phrase = mnemonic.to_string();

    // Derive seed from mnemonic (BIP39 spec: PBKDF2 with mnemonic and empty passphrase)
    let seed = bip39::Mnemonic::to_seed(&mnemonic, "");

    // Use Solana's default derivation path for browser wallets: m/44'/501'/account'/0'
    let derivation_path = DerivationPath::new_bip44(Some(account), Some(0));

    // Derive keypair
    let keypair = keypair_from_seed_and_derivation_path(&seed, Some(derivation_path))
        .map_err(|e| format!("Keypair derivation failed: {:?}", e))?;

    Ok((mnemonic_phrase, keypair))
}

#[command]
pub fn create_solana_wallet(app: AppHandle, account: u32) -> Result<SolanaWallet, String> {
    debug!("Starting Solana wallet creation");
    let (mnemonic_phrase, keypair) = match generate_mnemonic_and_keypair(account) {
        Ok(res) => res,
        Err(e) => {
            error!("{}", e);
            return Err(e);
        }
    };
    debug!("Mnemonic generated: {}", mnemonic_phrase);

    let pubkey = keypair.pubkey().to_string();
    let privkey = bs58::encode(keypair.to_bytes()).into_string();
    debug!("Wallet pubkey: {}", pubkey);
    debug!("Wallet privkey (bs58, truncated): {}...", &privkey[..8]);

    // Create Seed struct
    let seed_id = Uuid::new_v4();
    let seed_struct = Seed {
        id: seed_id,
        phrase: mnemonic_phrase.clone(),
        seed_type: SeedType::Created {
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
    let mut seeds: Vec<Seed> = match store.get("seedPhrases") {
        Some(value) => serde_json::from_value(value).unwrap_or_default(),
        None => Vec::new(),
    };
    seeds.push(seed_struct);
    store.set("seedPhrases", serde_json::json!(seeds));
    store.save().ok();

    let wallet = SolanaWallet {
        mnemonic: mnemonic_phrase,
        pubkey,
        privkey,
        seed: seed_id,
    };
    store.set(WALET_0, serde_json::json!(wallet));
    match store.save() {
        Ok(_) => {
            info!("Wallet stored successfully.");
            Ok(wallet)
        }
        Err(e) => {
            error!("Failed to save wallet: {:?}", e);
            Err("Error saving wallet".to_string())
        }
    }
}
