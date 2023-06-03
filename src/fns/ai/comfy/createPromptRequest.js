export const createPromptRequest = ({
    imageFilename,
    positivePrompt
}) => {
    const prompt = {
        client_id: "97f3a147bab945af87d98d49ccd49722",
        prompt: {
            "3": {
                inputs: {
                    seed: 123070706615572,
                    steps: 20,
                    cfg: 8,
                    sampler_name: "euler",
                    scheduler: "normal",
                    denoise: 0.5,
                    model: ["4", 0],
                    positive: ["6", 0],
                    negative: ["7", 0],
                    latent_image: ["11", 0],
                },
                class_type: "KSampler",
            },
            "4": {
                inputs: { ckpt_name: "CounterfeitV25_25.safetensors" },
                class_type: "CheckpointLoaderSimple",
            },
            "6": {
                inputs: {
                    text: positivePrompt,
                    clip: ["4", 1],
                },
                class_type: "CLIPTextEncode",
            },
            "7": {
                inputs: { text: "text, watermark", clip: ["4", 1] },
                class_type: "CLIPTextEncode",
            },
            "8": {
                inputs: { samples: ["3", 0], vae: ["4", 2] },
                class_type: "VAEDecode",
            },
            "9": {
                inputs: { filename_prefix: "ComfyUI", images: ["8", 0] },
                class_type: "SaveImage",
            },
            "10": {
                inputs: {
                    image: imageFilename,
                    "choose file to upload": "image",
                },
                class_type: "LoadImage",
            },
            "11": {
                inputs: { pixels: ["10", 0], vae: ["4", 2] },
                class_type: "VAEEncode",
            },
        },
        extra_data: {
            extra_pnginfo: {
                workflow: {
                    last_node_id: 13,
                    last_link_id: 15,
                    nodes: [
                        {
                            id: 7,
                            type: "CLIPTextEncode",
                            pos: [413, 389],
                            size: { "0": 425.27801513671875, "1": 180.6060791015625 },
                            flags: {},
                            order: 3,
                            mode: 0,
                            inputs: [{ name: "clip", type: "CLIP", link: 5 }],
                            outputs: [
                                {
                                    name: "CONDITIONING",
                                    type: "CONDITIONING",
                                    links: [6],
                                    slot_index: 0,
                                },
                            ],
                            properties: { "Node name for S&R": "CLIPTextEncode" },
                            widgets_values: ["text, watermark"],
                        },
                        {
                            id: 6,
                            type: "CLIPTextEncode",
                            pos: [415, 186],
                            size: { "0": 422.84503173828125, "1": 164.31304931640625 },
                            flags: {},
                            order: 2,
                            mode: 0,
                            inputs: [{ name: "clip", type: "CLIP", link: 3 }],
                            outputs: [
                                {
                                    name: "CONDITIONING",
                                    type: "CONDITIONING",
                                    links: [4],
                                    slot_index: 0,
                                },
                            ],
                            properties: { "Node name for S&R": "CLIPTextEncode" },
                            widgets_values: [
                                positivePrompt,
                            ],
                        },
                        {
                            id: 3,
                            type: "KSampler",
                            pos: [863, 186],
                            size: { "0": 315, "1": 262 },
                            flags: {},
                            order: 5,
                            mode: 0,
                            inputs: [
                                { name: "model", type: "MODEL", link: 1 },
                                { name: "positive", type: "CONDITIONING", link: 4 },
                                { name: "negative", type: "CONDITIONING", link: 6 },
                                { name: "latent_image", type: "LATENT", link: 15 },
                            ],
                            outputs: [
                                { name: "LATENT", type: "LATENT", links: [7], slot_index: 0 },
                            ],
                            properties: { "Node name for S&R": "KSampler" },
                            widgets_values: [
                                123070706615572,
                                "randomize",
                                20,
                                8,
                                "euler",
                                "normal",
                                1,
                            ],
                        },
                        {
                            id: 8,
                            type: "VAEDecode",
                            pos: [1209, 188],
                            size: { "0": 210, "1": 46 },
                            flags: {},
                            order: 6,
                            mode: 0,
                            inputs: [
                                { name: "samples", type: "LATENT", link: 7 },
                                { name: "vae", type: "VAE", link: 8 },
                            ],
                            outputs: [
                                { name: "IMAGE", type: "IMAGE", links: [9], slot_index: 0 },
                            ],
                            properties: { "Node name for S&R": "VAEDecode" },
                        },
                        {
                            id: 9,
                            type: "SaveImage",
                            pos: [1451, 189],
                            size: [210, 270],
                            flags: {},
                            order: 7,
                            mode: 0,
                            inputs: [{ name: "images", type: "IMAGE", link: 9 }],
                            properties: {},
                            widgets_values: ["ComfyUI"],
                        },
                        {
                            id: 4,
                            type: "CheckpointLoaderSimple",
                            pos: [26, 474],
                            size: { "0": 315, "1": 98 },
                            flags: {},
                            order: 0,
                            mode: 0,
                            outputs: [
                                { name: "MODEL", type: "MODEL", links: [1], slot_index: 0 },
                                { name: "CLIP", type: "CLIP", links: [3, 5], slot_index: 1 },
                                { name: "VAE", type: "VAE", links: [8, 11], slot_index: 2 },
                            ],
                            properties: { "Node name for S&R": "CheckpointLoaderSimple" },
                            widgets_values: ["CounterfeitV25_25.safetensors"],
                        },
                        {
                            id: 11,
                            type: "VAEEncode",
                            pos: [380, 620],
                            size: { "0": 210, "1": 46 },
                            flags: {},
                            order: 4,
                            mode: 0,
                            inputs: [
                                { name: "pixels", type: "IMAGE", link: 14 },
                                { name: "vae", type: "VAE", link: 11 },
                            ],
                            outputs: [
                                {
                                    name: "LATENT",
                                    type: "LATENT",
                                    links: [15],
                                    shape: 3,
                                    slot_index: 0,
                                },
                            ],
                            properties: { "Node name for S&R": "VAEEncode" },
                        },
                        {
                            id: 10,
                            type: "LoadImage",
                            pos: [40, 620],
                            size: [315, 314.0000114440918],
                            flags: {},
                            order: 1,
                            mode: 0,
                            outputs: [
                                {
                                    name: "IMAGE",
                                    type: "IMAGE",
                                    links: [14],
                                    shape: 3,
                                    slot_index: 0,
                                },
                                { name: "MASK", type: "MASK", links: null, shape: 3 },
                            ],
                            properties: { "Node name for S&R": "LoadImage" },
                            widgets_values: ["image_2023-06-01_224801786.png", "image"],
                        },
                    ],
                    links: [
                        [1, 4, 0, 3, 0, "MODEL"],
                        [3, 4, 1, 6, 0, "CLIP"],
                        [4, 6, 0, 3, 1, "CONDITIONING"],
                        [5, 4, 1, 7, 0, "CLIP"],
                        [6, 7, 0, 3, 2, "CONDITIONING"],
                        [7, 3, 0, 8, 0, "LATENT"],
                        [8, 4, 2, 8, 1, "VAE"],
                        [9, 8, 0, 9, 0, "IMAGE"],
                        [11, 4, 2, 11, 1, "VAE"],
                        [14, 10, 0, 11, 0, "IMAGE"],
                        [15, 11, 0, 3, 3, "LATENT"],
                    ],
                    groups: [],
                    config: {},
                    extra: {},
                    version: 0.4,
                },
            },
        },
    };

    return prompt;
};
