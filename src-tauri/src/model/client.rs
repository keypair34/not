use serde::{Deserialize, Serialize};

/// Client information to be sent to the server
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ClientInfo {
    pub id: i32,
    pub uuid: String,
    pub os_name: String,
    pub os_version: String,
    pub app_version: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Clone)]
pub struct ClientInfoPayload {
    pub uuid: String,
    pub os_name: String,
    pub os_version: String,
    pub app_version: String,
}

/// Response from the server after registering client
#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct RegisterClientResponse {
    pub code: bool,
    pub message: Option<String>,
    pub client_info: Option<ClientInfo>,
}
