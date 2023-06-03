//! ```cargo
//! [dependencies]
//! tungstenite = "0.12.0"
//! serde = "1.0"
//! serde_json = "1.0"
//! ```
use std::thread;
use tungstenite::client::connect;
use tungstenite::Message;

fn main() {
    let image = connect_to_websocket();
    println!("{}", image);

    // thread::spawn(|| {
    //     connect_to_websocket();
    // });

    // // Do other tasks while the WebSocket connection is active
    // // ...

    // // Wait for the user to exit the program
    // let mut input = String::new();
    // std::io::stdin().read_line(&mut input).unwrap();
}

fn connect_to_websocket() -> String {
    let url = "ws://127.0.0.1:8188/ws?clientId=1746687e56b94df98ecdaca282a9d04b";
    let mut first_image = String::new();

    if let Ok((mut socket, _)) = connect(url) {
        println!("Connected to WebSocket!");

        loop {
            if let Ok(message) = socket.read_message() {
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
