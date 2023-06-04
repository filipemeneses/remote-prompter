import sdwebui, { SamplingMethod } from 'node-sd-webui'
import { img2img } from './img2img'

export const invokePrompt = async ({
    ipAddress,

    base64Image,

    checkpoint,
    positivePrompt,
    negativePrompt,
    denoise
}) => {

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

    img2img(ipAddress, {
        imageData: `data:image/png;base64,${base64Image}`,
        prompt: positivePrompt,
        negativePrompt: negativePrompt,
        samplingMethod: "Euler a",
        width: 512,
        height: 512,
        steps: 20,
        batchSize: 1,
    }).then(images => {
        console.log(images)
        onceDoneCallback({
            generatedImage: images?.[0]
        })
    })
        .catch((err) => console.error(err))


    return {
        onProgress,
        onceDone
    }
}
