mod constants;
mod setup;
mod wallet;
mod network;

use crate::{
    setup::setup,
    wallet::{create_wallet::create_solana_wallet, import_wallet::import_solana_wallet, sign::sign_message},
};
use tauri_plugin_log::fern::colors::{Color, ColoredLevelConfig};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(
            tauri_plugin_log::Builder::default()
                .with_colors(
                    ColoredLevelConfig::default()
                        .debug(Color::Green)
                        .info(Color::Cyan),
                )
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .setup(|app| setup(app))
        .invoke_handler(tauri::generate_handler![
            create_solana_wallet,
            import_solana_wallet,
            sign_message,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
