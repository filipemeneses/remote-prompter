// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;

mod comfy;
mod traits;

use reqwest::multipart;
use reqwest::Client;

#[derive(Serialize)]
struct ImageResponse {
    generatedImage: String,
}

// #TODO: implement polymorphis with trait without async-trait hack
// fn call_send_prompt(
//     p: &dyn StableDiffusionApi,
//     ip_address: &str,
//     prompt_payload: &str,
// ) -> Result<String, String> {
//     return p.send_prompt(ip_address, prompt_payload);
// }

#[tauri::command]
async fn send_image(base64_string: &str) -> Result<String, String> {
    // Convert base64 string to binary
    let decoded_bytes = base64::decode(base64_string).unwrap();

    // Create a multipart form data
    let form = multipart::Form::new().part(
        "image",
        multipart::Part::bytes(decoded_bytes).file_name("image.jpg"),
    );

    // Create a request builder and send the binary data
    let response = Client::new()
        .post("http://127.0.0.1:8188/upload/image")
        .multipart(form)
        .send()
        .await
        .unwrap();

    let result = response.text().await.unwrap();

    Ok(result)
}

#[tauri::command]
async fn send_prompt(ip_address: &str, prompt_payload: &str) -> Result<String, String> {
    return comfy::send_prompt(ip_address, prompt_payload).await;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![send_image, send_prompt])
        .plugin(tauri_plugin_clipboard::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
