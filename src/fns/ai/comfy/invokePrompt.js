import { createPromptRequest } from "./createPromptRequest";
import { fetch, Body, ResponseType } from '@tauri-apps/api/http';
import WebSocket from "tauri-plugin-websocket-api";
import { base64ToArrayBuffer } from "../../b64/base64ToArrayBuffer";
import { arrayBufferToBase64 } from "../../b64/arrayBufferToBase64";

export const invokePrompt = async ({
    ipAddress,

    base64Image,

    positivePrompt,
    denoise
}) => {
    const promptEndpoint = `http://${ipAddress}/prompt`
    const imageUploadAddress = `http://${ipAddress}/upload/image`
    const websocketEndpoint = `ws://${ipAddress}/ws?clientId=1`

    const body = Body.form({
        image: {
            file: base64ToArrayBuffer(base64Image), // either a path or an array buffer of the file contents
            mime: 'image/png',
            fileName: "image.png"
        }
    });

    const image = await fetch(
        imageUploadAddress,
        {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
            },
            responseType: ResponseType.JSON,
            body
        }
    )

    const prompt = createPromptRequest({
        imageFilename: image.data.name,
        positivePrompt,
        denoise,
    })

    await fetch(promptEndpoint, {
        method: 'POST',
        body: Body.json(prompt),
        responseType: ResponseType.JSON,
        timeout: 30,
    });


    const comfyImageJsonToBase64 = async (imageJson) => {
        const {
            filename, subfolder, type
        } = imageJson

        const params = new URLSearchParams();
        params.append('filename', filename);
        params.append('subfolder', subfolder);
        params.append('type', type);

        const url = new URL(`http://${ipAddress}/view`);
        url.search = params.toString();

        const imageUrl = url.href

        const binaryImage = await fetch(imageUrl, {
            method: 'GET',
            responseType: ResponseType.Binary
        })

        const imageBase64 = arrayBufferToBase64(binaryImage.data)

        return imageBase64
    }


    let onProgressCallback = ({
        progressPercentage,
        currentValue,
        maxValue
    }) => { }
    let onceDoneCallback = ({
        generatedImage
    }) => { }

    const onProgress = (cb) => {
        onProgressCallback = cb
    }

    const onceDone = (cb) => {
        onceDoneCallback = cb
    }

    const handlers = {
        progress(event) {
            onProgressCallback({
                progressPercentage: event.data.value / event.data.max,
                currentValue: event.data.value,
                maxValue: event.data.max
            })
        },
        async executed(event) {
            if (!event?.data?.output?.images?.length) return;

            const generatedImage = await comfyImageJsonToBase64(event.data.output.images[0])
            onceDoneCallback({
                generatedImage
            })
            ws.disconnect()
        }
    }
    const ws = await WebSocket.connect(websocketEndpoint);
    ws.addListener(async ({ data: eventJson }) => {
        if (typeof eventJson !== 'string') return;

        const event = JSON.parse(eventJson)

        if (!handlers[event.type]) return;

        handlers[event.type](event)

    })

    return {
        onProgress,
        onceDone
    }

}