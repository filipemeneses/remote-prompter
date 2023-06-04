export const createPromptRequest = ({
    checkpoint,
    imageFilename,
    positivePrompt,
    negativePrompt,
    denoise
}) => {
    const prompt = {
        "client_id": "1",
        "prompt": {
            "3": {
                "inputs": {
                    "seed": 922106330481696,
                    "steps": 20,
                    "cfg": 8,
                    "sampler_name": "euler",
                    "scheduler": "karras",
                    "denoise": denoise,
                    "model": [
                        "4",
                        0
                    ],
                    "positive": [
                        "6",
                        0
                    ],
                    "negative": [
                        "7",
                        0
                    ],
                    "latent_image": [
                        "11",
                        0
                    ]
                },
                "class_type": "KSampler"
            },
            "4": {
                "inputs": {
                    "ckpt_name": checkpoint
                },
                "class_type": "CheckpointLoaderSimple"
            },
            "6": {
                "inputs": {
                    "text": positivePrompt,
                    "clip": [
                        "4",
                        1
                    ]
                },
                "class_type": "CLIPTextEncode"
            },
            "7": {
                "inputs": {
                    "text": negativePrompt,
                    "clip": [
                        "4",
                        1
                    ]
                },
                "class_type": "CLIPTextEncode"
            },
            "8": {
                "inputs": {
                    "samples": [
                        "3",
                        0
                    ],
                    "vae": [
                        "4",
                        2
                    ]
                },
                "class_type": "VAEDecode"
            },
            "9": {
                "inputs": {
                    "filename_prefix": "ComfyUI",
                    "images": [
                        "8",
                        0
                    ]
                },
                "class_type": "SaveImage"
            },
            "10": {
                "inputs": {
                    "image": imageFilename,
                    "choose file to upload": "image"
                },
                "class_type": "LoadImage"
            },
            "11": {
                "inputs": {
                    "pixels": [
                        "14",
                        0
                    ],
                    "vae": [
                        "4",
                        2
                    ]
                },
                "class_type": "VAEEncode"
            },
            "14": {
                "inputs": {
                    "mode": "resize",
                    "supersample": "true",
                    "resampling": "lanczos",
                    "rescale_factor": 2,
                    "resize_width": 512,
                    "resize_height": 512,
                    "image": [
                        "10",
                        0
                    ]
                },
                "class_type": "Image Resize"
            }
        },
        "extra_data": {
            "extra_pnginfo": {
                "workflow": {
                    "last_node_id": 14,
                    "last_link_id": 17,
                    "nodes": [
                        {
                            "id": 6,
                            "type": "CLIPTextEncode",
                            "pos": [
                                415,
                                186
                            ],
                            "size": {
                                "0": 422.84503173828125,
                                "1": 164.31304931640625
                            },
                            "flags": {},
                            "order": 2,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "clip",
                                    "type": "CLIP",
                                    "link": 3
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "CONDITIONING",
                                    "type": "CONDITIONING",
                                    "links": [
                                        4
                                    ],
                                    "slot_index": 0
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "CLIPTextEncode"
                            },
                            "widgets_values": [
                                positivePrompt
                            ]
                        },
                        {
                            "id": 8,
                            "type": "VAEDecode",
                            "pos": [
                                1209,
                                188
                            ],
                            "size": {
                                "0": 210,
                                "1": 46
                            },
                            "flags": {},
                            "order": 7,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "samples",
                                    "type": "LATENT",
                                    "link": 7
                                },
                                {
                                    "name": "vae",
                                    "type": "VAE",
                                    "link": 8
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "IMAGE",
                                    "type": "IMAGE",
                                    "links": [
                                        9
                                    ],
                                    "slot_index": 0
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "VAEDecode"
                            }
                        },
                        {
                            "id": 4,
                            "type": "CheckpointLoaderSimple",
                            "pos": [
                                26,
                                474
                            ],
                            "size": {
                                "0": 315,
                                "1": 98
                            },
                            "flags": {},
                            "order": 0,
                            "mode": 0,
                            "outputs": [
                                {
                                    "name": "MODEL",
                                    "type": "MODEL",
                                    "links": [
                                        1
                                    ],
                                    "slot_index": 0
                                },
                                {
                                    "name": "CLIP",
                                    "type": "CLIP",
                                    "links": [
                                        3,
                                        5
                                    ],
                                    "slot_index": 1
                                },
                                {
                                    "name": "VAE",
                                    "type": "VAE",
                                    "links": [
                                        8,
                                        11
                                    ],
                                    "slot_index": 2
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "CheckpointLoaderSimple"
                            },
                            "widgets_values": [
                                checkpoint
                            ]
                        },
                        {
                            "id": 7,
                            "type": "CLIPTextEncode",
                            "pos": [
                                413,
                                389
                            ],
                            "size": {
                                "0": 425.27801513671875,
                                "1": 180.6060791015625
                            },
                            "flags": {},
                            "order": 3,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "clip",
                                    "type": "CLIP",
                                    "link": 5
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "CONDITIONING",
                                    "type": "CONDITIONING",
                                    "links": [
                                        6
                                    ],
                                    "slot_index": 0
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "CLIPTextEncode"
                            },
                            "widgets_values": [
                                negativePrompt
                            ]
                        },
                        {
                            "id": 11,
                            "type": "VAEEncode",
                            "pos": [
                                380,
                                620
                            ],
                            "size": {
                                "0": 210,
                                "1": 46
                            },
                            "flags": {},
                            "order": 5,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "pixels",
                                    "type": "IMAGE",
                                    "link": 17
                                },
                                {
                                    "name": "vae",
                                    "type": "VAE",
                                    "link": 11
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "LATENT",
                                    "type": "LATENT",
                                    "links": [
                                        15
                                    ],
                                    "shape": 3,
                                    "slot_index": 0
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "VAEEncode"
                            }
                        },
                        {
                            "id": 14,
                            "type": "Image Resize",
                            "pos": [
                                20,
                                620
                            ],
                            "size": {
                                "0": 315,
                                "1": 178
                            },
                            "flags": {},
                            "order": 4,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "image",
                                    "type": "IMAGE",
                                    "link": 16
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "IMAGE",
                                    "type": "IMAGE",
                                    "links": [
                                        17
                                    ],
                                    "shape": 3,
                                    "slot_index": 0
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "Image Resize"
                            },
                            "widgets_values": [
                                "resize",
                                "true",
                                "lanczos",
                                2,
                                512,
                                512
                            ]
                        },
                        {
                            "id": 10,
                            "type": "LoadImage",
                            "pos": [
                                -320,
                                620
                            ],
                            "size": {
                                "0": 315,
                                "1": 314
                            },
                            "flags": {},
                            "order": 1,
                            "mode": 0,
                            "outputs": [
                                {
                                    "name": "IMAGE",
                                    "type": "IMAGE",
                                    "links": [
                                        16
                                    ],
                                    "shape": 3,
                                    "slot_index": 0
                                },
                                {
                                    "name": "MASK",
                                    "type": "MASK",
                                    "links": null,
                                    "shape": 3
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "LoadImage"
                            },
                            "widgets_values": [
                                imageFilename,
                                "image"
                            ]
                        },
                        {
                            "id": 9,
                            "type": "SaveImage",
                            "pos": [
                                1451,
                                189
                            ],
                            "size": [
                                329.4598071289063,
                                337.5190563964843
                            ],
                            "flags": {},
                            "order": 8,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "images",
                                    "type": "IMAGE",
                                    "link": 9
                                }
                            ],
                            "properties": {},
                            "widgets_values": [
                                "ComfyUI"
                            ]
                        },
                        {
                            "id": 3,
                            "type": "KSampler",
                            "pos": [
                                863,
                                186
                            ],
                            "size": {
                                "0": 315,
                                "1": 262
                            },
                            "flags": {},
                            "order": 6,
                            "mode": 0,
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "MODEL",
                                    "link": 1
                                },
                                {
                                    "name": "positive",
                                    "type": "CONDITIONING",
                                    "link": 4
                                },
                                {
                                    "name": "negative",
                                    "type": "CONDITIONING",
                                    "link": 6
                                },
                                {
                                    "name": "latent_image",
                                    "type": "LATENT",
                                    "link": 15
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "LATENT",
                                    "type": "LATENT",
                                    "links": [
                                        7
                                    ],
                                    "slot_index": 0
                                }
                            ],
                            "properties": {
                                "Node name for S&R": "KSampler"
                            },
                            "widgets_values": [
                                922106330481696,
                                "randomize",
                                20,
                                8,
                                "euler",
                                "karras",
                                denoise
                            ]
                        }
                    ],
                    "links": [
                        [
                            1,
                            4,
                            0,
                            3,
                            0,
                            "MODEL"
                        ],
                        [
                            3,
                            4,
                            1,
                            6,
                            0,
                            "CLIP"
                        ],
                        [
                            4,
                            6,
                            0,
                            3,
                            1,
                            "CONDITIONING"
                        ],
                        [
                            5,
                            4,
                            1,
                            7,
                            0,
                            "CLIP"
                        ],
                        [
                            6,
                            7,
                            0,
                            3,
                            2,
                            "CONDITIONING"
                        ],
                        [
                            7,
                            3,
                            0,
                            8,
                            0,
                            "LATENT"
                        ],
                        [
                            8,
                            4,
                            2,
                            8,
                            1,
                            "VAE"
                        ],
                        [
                            9,
                            8,
                            0,
                            9,
                            0,
                            "IMAGE"
                        ],
                        [
                            11,
                            4,
                            2,
                            11,
                            1,
                            "VAE"
                        ],
                        [
                            15,
                            11,
                            0,
                            3,
                            3,
                            "LATENT"
                        ],
                        [
                            16,
                            10,
                            0,
                            14,
                            0,
                            "IMAGE"
                        ],
                        [
                            17,
                            14,
                            0,
                            11,
                            0,
                            "IMAGE"
                        ]
                    ],
                    "groups": [],
                    "config": {},
                    "extra": {},
                    "version": 0.4
                }
            }
        }
    }

    return prompt;
};
