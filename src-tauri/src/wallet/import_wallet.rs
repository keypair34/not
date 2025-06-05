use bip39::Mnemonic;
use serde::Serialize;
use solana_sdk::derivation_path::DerivationPath;
use solana_sdk::signature::Signer;
use solana_sdk::signer::keypair::keypair_from_seed_and_derivation_path;
use tauri::command;

#[derive(Serialize)]
pub struct ImportedWallet {
    pub mnemonic: String,
    pub pubkey: String,
}

#[command]
pub fn import_solana_wallet(mnemonic_phrase: String) -> Result<ImportedWallet, String> {
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

    Ok(ImportedWallet {
        mnemonic: mnemonic_phrase,
        pubkey,
    })
}
