use std::path::PathBuf;
use std::sync::Arc;
use tauri::{AppHandle, Wry};
use tauri_plugin_store::{Error, Store, StoreExt};
use tsync::tsync;

/// Generate:
/// tsync -i src-tauri/src/ -o lib/crate/generated.ts

#[tsync]
pub const STORE: &str = ".notwallet.dat";
#[tsync]
pub const STORE_KEYPAIRS: &str = "keypairs";
#[tsync]
pub const STORE_SEEDS: &str = "seeds";
#[allow(dead_code)]
#[tsync]
pub const STORE_WALLET: &str = "wallet.json"; // Legacy.

pub fn store(app: &AppHandle) -> Result<Arc<Store<Wry>>, Error> {
    let path = PathBuf::from(STORE);
    app.store(path.clone())
}
