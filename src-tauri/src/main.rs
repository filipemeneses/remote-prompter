// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64;
use base64::Config;
use reqwest::multipart;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;
use std::{thread, time::Duration};
use tungstenite::client::connect;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Yo!u've beevn greeted from Rust!", name)
}

async fn fetch_image_to_base64(image_url: &str) -> String {
    // Send a GET request to fetch the image
    let mut response = reqwest::get(image_url).await.unwrap();

    // Read the image data into a byte vector
    let image_data = response.bytes().await.unwrap();

    // Convert the image data to base64
    let base64_image = base64::encode(&image_data);

    return base64_image;
}

async fn comfy_ui_ws_watch_prompt(url: &str, prompt_endpoint: &str, prompt: &str) -> String {
    let mut first_image = String::new();
    let v: Value = serde_json::from_str(prompt).unwrap();
    let mut sent_prompt = false;

    if let Ok((mut socket, _)) = connect(url) {
        println!("Connected to WebSocket!");

        loop {
            if let Ok(message) = socket.read_message() {
                if !sent_prompt {
                    let response = Client::new().post(prompt_endpoint).json(&v).send().await;

                    match response {
                        Ok(resp) => {
                            if resp.status().is_success() {
                                let body = resp.text().await.unwrap();
                                println!("Response body: {}", body);
                            } else {
                                println!("{}", prompt);
                                println!("Request failed with status code: {}", resp.status());
                                break;
                            }
                            // Handle successful response here
                        }
                        Err(err) => {
                            println!("POST request failed: {}", err);
                            break;
                            // Handle the error or take necessary action
                        }
                    }
                    sent_prompt = true
                }
                if let Ok(json) = message.to_text() {
                    println!("Received message: {}", json);

                    // Parse the JSON message
                    if let Ok(parsed_json) = serde_json::from_str::<serde_json::Value>(json) {
                        // Check if the event type is "executed"
                        if let Some(event_type) = parsed_json.get("type").and_then(|t| t.as_str()) {
                            if event_type == "executed" {
                                println!("Received 'executed' event. Stopping...");

                                if let Some(images) =
                                    parsed_json["data"]["output"]["images"].as_array()
                                {
                                    if let Some(image) = images.first() {
                                        // Get the first item of the array

                                        // Serialize the first item back into a JSON string
                                        let first_item_json = serde_json::to_string(&image)
                                            .expect("Failed to serialize JSON");

                                        first_image = first_item_json;

                                        println!("First item JSON: {}", first_image);
                                    }
                                }

                                break;
                            }
                        }
                    }
                }
            }
        }

        // Close the WebSocket connection
        let _ = socket.close(None);

        return first_image;
    } else {
        println!("Failed to connect to WebSocket.");
        return String::new();
    }
}

#[derive(Debug, Deserialize)]
struct JsonData {
    filename: String,
    subfolder: String,
    r#type: String,
}

fn transform_json_to_url(json_str: &str, ip_address: &str) -> String {
    // Parse the JSON string into a JsonData struct
    let json_data: JsonData = serde_json::from_str(json_str).unwrap();

    // Build the URL string using the parsed data
    let mut url = format!("http://{}/view?", ip_address);

    let mut query_params = HashMap::new();
    query_params.insert("filename", json_data.filename);
    query_params.insert("subfolder", json_data.subfolder);
    query_params.insert("type", json_data.r#type);

    let mut first = true;
    for (key, value) in query_params {
        if first {
            url.push_str(&format!("{}={}", key, value));
            first = false;
        } else {
            url.push_str(&format!("&{}={}", key, value));
        }
    }

    url
}

#[derive(Serialize)]
struct ImageResponse {
    generatedImage: String,
}

#[tauri::command]
async fn send_prompt(
    ip_address: &str,
    prompt_endpoint: &str,
    prompt: &str,
    comfy_ws_endpoint: &str,
) -> Result<String, String> {
    print!("{}", comfy_ws_endpoint);
    let result: String = comfy_ui_ws_watch_prompt(comfy_ws_endpoint, prompt_endpoint, prompt).await;
    print!("{}", result);
    let image_url = transform_json_to_url(&result, ip_address);
    print!("image_url {}", image_url);
    let image_b64 = fetch_image_to_base64(&image_url).await;

    let image_response = ImageResponse {
        generatedImage: image_b64,
    };
    // Convert the response to a JSON string
    let json_string = serde_json::to_string(&image_response).unwrap();

    Ok(json_string)
}

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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![send_image, send_prompt, greet])
        .plugin(tauri_plugin_clipboard::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
