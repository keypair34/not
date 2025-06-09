use std::path::PathBuf;
use std::sync::Arc;
use tauri::{AppHandle, Wry};
use tauri_plugin_store::{Error, Store, StoreExt};
use tsync::tsync;

/// Generate: tsync -i src-tauri/src/constants/store.rs -o lib/store/generated.ts

#[tsync]
pub const STORE: &str = ".notwallet.dat";
#[tsync]
pub const STORE_KEYPAIRS: &str = "keypairs.dat";
#[tsync]
pub const STORE_SEEDS: &str = "seeds.dat";

pub fn store(app: &AppHandle) -> Result<Arc<Store<Wry>>, Error> {
    let path = PathBuf::from(STORE);
    app.store(path.clone())
}

pub fn store_wallet(app: &AppHandle) -> Result<Arc<Store<Wry>>, Error> {
    let path = PathBuf::from(STORE_KEYPAIRS);
    app.store(path.clone())
}


pub fn store_seeds(app: &AppHandle) -> Result<Arc<Store<Wry>>, Error> {
    let path = PathBuf::from(STORE_SEEDS);
    app.store(path.clone())
}