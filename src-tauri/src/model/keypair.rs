use serde::{Deserialize, Serialize};
use tsync::tsync;
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
#[tsync]
pub(crate) struct SolanaWallet {
    pub mnemonic: String,
    pub pubkey: String,
    pub privkey: String,
    pub seed: Uuid,
}
