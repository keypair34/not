use crate::model::keypair::SolanaWallet;
use serde::{Deserialize, Serialize};
use tsync::tsync;

#[derive(Serialize, Deserialize)]
#[tsync]
pub(crate) struct OnboardingCreateWallet {
    pub seed: String,
    pub keypair: SolanaWallet,
}
