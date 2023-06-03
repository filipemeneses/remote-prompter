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
    return comfy::send_image(base64_string).await;
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
