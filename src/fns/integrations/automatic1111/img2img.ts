import { Body, fetch, ResponseType } from '@tauri-apps/api/http';

export const img2img = async (ipAddress, options) => {
    let body = {
        init_images: [options.imageData],
        prompt: options.prompt,
        negative_prompt: options.negativePrompt,
        seed: options.seed,
        subseed: options.variationSeed,
        subseed_strength: options.variationSeedStrength,
        sampler_name: options.samplingMethod,
        batch_size: options.batchSize,
        n_iter: options.batchCount,
        steps: options.steps,
        width: options.width,
        height: options.height,
        cfg_scale: options.cfgScale,
        seed_resize_from_w: options.resizeSeedFromWidth,
        seed_resize_from_h: options.resizeSeedFromHeight,
    }

    let endpoint = '/sdapi/v1/img2img'

    /* @ts-ignore */
    const result = await fetch(`http://${ipAddress}${endpoint}`, {
        method: 'POST',
        body: Body.json(body),
        responseType: ResponseType.JSON,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    console.log({ result })

    return result?.data?.images
}