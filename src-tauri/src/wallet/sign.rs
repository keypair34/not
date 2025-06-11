use crate::constants::{store::store, wallet_key::WALET_0};
use crate::model::keypair::SolanaWallet;
use crate::network::airdrop::airdrop;
use bs58;
use solana_sdk::signature::{Keypair, Signer};
use std::convert::TryFrom;
use tauri::{command, AppHandle};

#[command]
pub async fn sign_message(app: AppHandle, message: String) -> Result<String, String> {
    // Load wallet from store
    let store = store(&app).map_err(|_| "Failed to load store".to_string())?;
    let wallet_value = store.get(WALET_0).ok_or("No wallet found".to_string())?;
    let wallet: SolanaWallet =
        serde_json::from_value(wallet_value).map_err(|_| "Failed to parse wallet".to_string())?;

    // Decode private key from base58
    let privkey_bytes = bs58::decode(wallet.privkey)
        .into_vec()
        .map_err(|_| "Failed to decode private key".to_string())?;

    // Use Keypair::try_from instead of deprecated from_bytes
    let keypair = Keypair::try_from(privkey_bytes.as_slice())
        .map_err(|_| "Failed to create keypair from private key".to_string())?;

    // Sign the message
    let signature = keypair.sign_message(message.as_bytes());
    let signature_b58 = bs58::encode(signature).into_string();

    // Call the airdrop function with pubkey and signature
    let airdrop_result = airdrop(wallet.pubkey.clone(), signature_b58.clone()).await;

    match airdrop_result {
        Ok(resp) => Ok(resp),
        Err(e) => Err(e),
    }
}
