use serde::{Deserialize, Serialize};
use tsync::tsync;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone)]
#[tsync]
pub(crate) struct SolanaWallet {
    pub account: u32,
    pub pubkey: String,
    pub privkey: String,
    pub seed: Uuid,
}
