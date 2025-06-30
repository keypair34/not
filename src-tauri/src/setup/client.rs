use crate::constants::store::store;
use log::{error, info};
use reqwest::Client as HttpClient;
use serde::{Deserialize, Serialize};
use std::error::Error as StdError;
use tauri::{async_runtime, App};
use uuid::Uuid;

const INSTALLATION_ID_KEY: &str = "installation_id";

/// Client information to be sent to the server
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ClientInfo {
    pub uuid: String,
    pub os_name: String,
    pub os_version: String,
    pub app_version: String,
    pub device_model: Option<String>,
}

/// Response from the server after registering client
#[derive(Debug, Deserialize)]
pub struct RegisterClientResponse {
    pub success: bool,
    pub message: Option<String>,
    // Add more fields as needed based on the API response
}

/// Register the client with the server.
/// - Checks if we already have an installation_id in the store
/// - Only creates a new one if none exists
/// - Starts a task to send client information to the server
pub fn setup_client(app: &App) -> Result<(), Box<dyn std::error::Error>> {
    let store_result = store(app.handle());

    let store = match store_result {
        Ok(store) => store,
        Err(e) => {
            error!("Failed to get store: {:?}", e);
            return Err(Box::new(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Failed to get store: {:?}", e),
            )));
        }
    };

    // Check if installation_id exists
    let installation_id = if let Some(id) = store.get(INSTALLATION_ID_KEY) {
        info!("Found existing installation ID");
        id.as_str().unwrap_or_default().to_string()
    } else {
        // Generate a new UUID if none exists
        let new_id = Uuid::new_v4().to_string();
        info!("Generated new installation ID: {}", new_id);

        // Save the new installation ID
        store.set(INSTALLATION_ID_KEY, serde_json::json!(new_id.clone()));

        // Save the store and handle the result
        if let Err(e) = store.save() {
            error!("Failed to persist store: {:?}", e);
            return Err(Box::new(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Failed to persist store: {:?}", e),
            )));
        }
        info!("Installation ID saved successfully.");

        new_id
    };

    // Get OS information
    #[cfg(target_os = "windows")]
    let os_name = "Windows".to_string();
    #[cfg(target_os = "macos")]
    let os_name = "macOS".to_string();
    #[cfg(target_os = "linux")]
    let os_name = "Linux".to_string();
    #[cfg(target_os = "ios")]
    let os_name = "iOS".to_string();
    #[cfg(target_os = "android")]
    let os_name = "Android".to_string();
    #[cfg(not(any(
        target_os = "windows",
        target_os = "macos",
        target_os = "linux",
        target_os = "ios",
        target_os = "android"
    )))]
    let os_name = "Unknown".to_string();

    // Get OS version
    // Get OS version information
    #[cfg(target_os = "windows")]
    let os_version = std::env::consts::OS.to_string();
    #[cfg(target_os = "macos")]
    let os_version = std::env::consts::OS.to_string();
    #[cfg(target_os = "linux")]
    let os_version = std::env::consts::OS.to_string();
    #[cfg(target_os = "ios")]
    let os_version = "iOS".to_string();
    #[cfg(target_os = "android")]
    let os_version = "Android".to_string();
    #[cfg(not(any(
        target_os = "windows",
        target_os = "macos",
        target_os = "linux",
        target_os = "ios",
        target_os = "android"
    )))]
    let os_version = "Unknown".to_string();

    // Get device model information
    #[cfg(target_os = "ios")]
    let device_model = Some("iPhone/iPad".to_string());
    #[cfg(target_os = "android")]
    let device_model = Some("Android Device".to_string());
    #[cfg(not(any(target_os = "ios", target_os = "android")))]
    let device_model = None;

    // Simple device information with straightforward platform detection
    // For a production app, you might want to implement more sophisticated
    // device detection using platform-specific APIs

    // Create client info with simple fields as requested
    let client_info = ClientInfo {
        uuid: installation_id,
        os_name,
        os_version,
        app_version: app.handle().package_info().version.to_string(),
        device_model,
    };

    // Log client registration
    info!(
        "Registering client: os={}, version={}, app_version={}, uuid={}",
        client_info.os_name, client_info.os_version, client_info.app_version, client_info.uuid
    );

    // Register with the server in a separate task
    let client_info_clone = client_info.clone();
    async_runtime::spawn(async move {
        match send_client_info(&client_info_clone).await {
            Ok(response) => {
                info!("Client registered successfully: {:?}", response);
            }
            Err(e) => {
                error!("Failed to register client: {}", e);
            }
        }
    });

    // Return success immediately, as the registration happens in the background
    Ok(())
}

/// Send client information to the server
async fn send_client_info(
    client_info: &ClientInfo,
) -> Result<RegisterClientResponse, Box<dyn StdError>> {
    let client = HttpClient::new();

    // API endpoint
    let url = "https://0.0.0.0:3001/api/v1/not-wallet";

    let response = client
        .post(url)
        .json(client_info)
        .send()
        .await
        .map_err(|e| {
            Box::<dyn StdError>::from(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Request error: {}", e),
            ))
        })?;

    if response.status().is_success() {
        response
            .json::<RegisterClientResponse>()
            .await
            .map_err(|e| {
                Box::<dyn StdError>::from(std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("Failed to parse response: {}", e),
                ))
            })
    } else {
        let status = response.status();
        let error_text = response
            .text()
            .await
            .unwrap_or_else(|_| "Failed to get error text".to_string());

        Err(Box::new(std::io::Error::new(
            std::io::ErrorKind::Other,
            format!("Server error: {} - {}", status, error_text),
        )))
    }
}
