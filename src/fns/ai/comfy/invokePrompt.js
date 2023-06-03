import { invoke } from "@tauri-apps/api";
import { createPromptRequest } from "./createPromptRequest";

export const invokePrompt = async ({
    base64Image,
    ipAddress,
    positivePrompt,
    denoise
}) => {
    const image = JSON.parse(
        await invoke("send_image", {
            base64String: base64Image,
        })
    );

    const imageFilename = image.name;

    const prompt = createPromptRequest({
        imageFilename,
        positivePrompt,
        denoise,
    })

    const tauriResponse = await invoke("send_prompt", {
        ipAddress,
        promptEndpoint: `http://${ipAddress}/prompt`,
        comfyWsEndpoint: `ws://${ipAddress}/ws?clientId=1`,
        prompt: JSON.stringify(
            prompt
        ),
    })

    console.log({
        tauriResponse
    })

    const { generatedImage } = JSON.parse(
        tauriResponse
    );

    return {
        generatedImage,
        prompt
    }
}