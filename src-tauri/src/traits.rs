pub trait StableDiffusionApi {
    fn send_prompt(&self, ip_address: &str, prompt_payload: &str) -> Result<String, String>;
}
