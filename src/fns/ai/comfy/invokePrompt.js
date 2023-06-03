import { invoke } from "@tauri-apps/api";
import { createPromptRequest } from "./createPromptRequest";

export const invokePrompt = async ({
    ipAddress,

    base64Image,

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
        promptPayload: JSON.stringify(
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