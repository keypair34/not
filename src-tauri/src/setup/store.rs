use log::{error, info};
use tauri::App;
use crate::constants::store::store;

/// We need to setup the debug store regardless so we
/// can switch environment during runtime.
pub fn setup_store(app: &App) -> Result<(), Box<dyn std::error::Error>> {
    match store(app.handle()) {
        Ok(_) => {
            info!("Store loaded successfully.");
        }
        Err(e) => {
            error!("Error setting up store: {:?}", e);
        }
    };
    Ok(())
}
