import { invoke } from "@tauri-apps/api";
import { createPromptRequest } from "./createPromptRequest";

export const invokePrompt = async ({
    base64Image,
    ipAddress,
    positivePrompt
}) => {
    const image = JSON.parse(
        await invoke("send_image", {
            base64String: base64Image,
        })
    );

    const imageFilename = image.name;

    const generatedImage = JSON.parse(
        await invoke("send_prompt", {
            promptEndpoint: `${ipAddress}/prompt`,
            comfyWsEndpoint: ipAddress.replace('http', 'ws') + "/ws?clientId=97f3a147bab945af87d98d49ccd49722",
            prompt: JSON.stringify(
                createPromptRequest({
                    imageFilename,
                    positivePrompt,
                })
            ),
        })
    );

    const {
        filename,
        subfolder,
        type
    } = generatedImage

    const comfyUrl = `${ipAddress}/view?filename=${filename}&subfolder=${subfolder}&type=${type}`

    return {
        generatedImage: comfyUrl
    }
}