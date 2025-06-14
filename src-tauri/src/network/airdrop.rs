use serde::Serialize;

#[derive(Serialize)]
struct AirdropRequest<'a> {
    pubkey: &'a str,
    signature: &'a str,
}

pub async fn airdrop(pubkey: String, signature: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let req_body = AirdropRequest {
        pubkey: &pubkey,
        signature: &signature,
    };

    let resp = client
        .post("https://api.musik88.com/api/v1/airdrop")
        .json(&req_body)
        .send()
        .await
        .map_err(|e| format!("Network error: {:?}", e))?;

    let status = resp.status();
    let text = resp
        .text()
        .await
        .map_err(|e| format!("Read error: {:?}", e))?;

    if status.is_success() {
        Ok(text)
    } else {
        Err(format!("Airdrop failed: {} - {}", status, text))
    }
}
