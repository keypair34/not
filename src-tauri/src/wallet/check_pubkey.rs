use crate::network::check_pubkey::check_pubkey as network_check_pubkey;
use tauri::command;

#[command]
pub async fn check_pubkey(pubkey: String) -> Result<bool, String> {
    let resp = network_check_pubkey(&pubkey).await?;
    println!(
        "check_pubkey result for {}: {:?}, {:?}",
        pubkey, resp.exists, resp.user_id
    );
    Ok(resp.exists)
}
