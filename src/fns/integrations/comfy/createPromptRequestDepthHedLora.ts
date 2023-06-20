export const createPromptRequestDepthHedLora = ({
    checkpoint,
    imageFilename,
    positivePrompt,
    negativePrompt,
    denoise
}) => {
    const DEPTH_STRENGTH = 0.8;
    const HED_STRENGTH = 0.3;

    const prompt = {
    "client_id": "1",
    "prompt": {
        "3": {
            "inputs": {
                "seed": 1073973887808972,
                "steps": 20,
                "cfg": 8,
                "sampler_name": "euler",
                "scheduler": "karras",
                "denoise": denoise,
                "model": ["33", 0],
                "positive": ["28", 0],
                "negative": ["7", 0],
                "latent_image": ["11", 0]
            },
            "class_type": "KSampler"
        },
        "6": {
            "inputs": {
                "text": positivePrompt,
                "clip": ["33", 1]
            },
            "class_type": "CLIPTextEncode"
        },
        "7": {
            "inputs": {
                "text": negativePrompt,
                "clip": ["33", 1]
            },
            "class_type": "CLIPTextEncode"
        },
        "8": {
            "inputs": {
                "samples": ["3", 0],
                "vae": ["34", 2]
            },
            "class_type": "VAEDecode"
        },
        "9": {
            "inputs": {
                "filename_prefix": "ComfyUI",
                "images": ["8", 0]
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
                "pixels": ["14", 0],
                "vae": ["34", 2]
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
                "image": ["10", 0]
            },
            "class_type": "Image Resize"
        },
        "17": {
            "inputs": {
                "control_net_name": "control_sd15_depth.pth"
            },
            "class_type": "ControlNetLoader"
        },
        "23": {
            "inputs": {
                "strength": DEPTH_STRENGTH,
                "conditioning": ["6", 0],
                "control_net": ["17", 0],
                "image": ["24", 0]
            },
            "class_type": "ControlNetApply"
        },
        "24": {
            "inputs": {
                "a": 6.283185307179586,
                "bg_threshold": 0.05,
                "image": ["10", 0]
            },
            "class_type": "MiDaS-DepthMapPreprocessor"
        },
        "27": {
            "inputs": {
                "control_net_name": "control_sd15_hed.pth"
            },
            "class_type": "ControlNetLoader"
        },
        "28": {
            "inputs": {
                "strength": HED_STRENGTH,
                "conditioning": ["23", 0],
                "control_net": ["27", 0],
                "image": ["30", 0]
            },
            "class_type": "ControlNetApply"
        },
        "30": {
            "inputs": {
                "version": "v1.1",
                "safe": "enable",
                "image": ["10", 0]
            },
            "class_type": "HEDPreprocessor"
        },
        "33": {
            "inputs": {
                "lora_name": "tennis4.safetensors",
                "strength_model": 0.599,
                "strength_clip": 0.599,
                "model": ["34", 0],
                "clip": ["34", 1]
            },
            "class_type": "LoraLoader"
        },
        "34": {
            "inputs": {
                "ckpt_name": checkpoint
            },
            "class_type": "CheckpointLoaderSimple"
        }
    },
    "extra_data": {
        "extra_pnginfo": {
            "workflow": {
                "last_node_id": 38,
                "last_link_id": 47,
                "nodes": [{
                    "id": 7,
                    "type": "CLIPTextEncode",
                    "pos": [413, 389],
                    "size": {
                        "0": 425.27801513671875,
                        "1": 180.6060791015625
                    },
                    "flags": {},
                    "order": 16,
                    "mode": 0,
                    "inputs": [{
                        "link": 38,
                        "name": "clip",
                        "type": "CLIP"
                    }],
                    "outputs": [{
                        "links": [6],
                        "name": "CONDITIONING",
                        "slot_index": 0,
                        "type": "CONDITIONING"
                    }],
                    "properties": {
                        "Node name for S&R": "CLIPTextEncode"
                    },
                    "widgets_values": [negativePrompt]
                }, {
                    "id": 14,
                    "type": "Image Resize",
                    "pos": [20, 620],
                    "size": {
                        "0": 315,
                        "1": 178
                    },
                    "flags": {},
                    "order": 5,
                    "mode": 0,
                    "inputs": [{
                        "link": 16,
                        "name": "image",
                        "type": "IMAGE"
                    }],
                    "outputs": [{
                        "links": [17],
                        "name": "IMAGE",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "IMAGE"
                    }],
                    "properties": {
                        "Node name for S&R": "Image Resize"
                    },
                    "widgets_values": ["resize", "true", "lanczos", 2, 512, 512]
                }, {
                    "id": 17,
                    "type": "ControlNetLoader",
                    "pos": [650, 950],
                    "size": {
                        "0": 300,
                        "1": 60
                    },
                    "flags": {},
                    "order": 0,
                    "mode": 0,
                    "outputs": [{
                        "links": [20],
                        "name": "CONTROL_NET",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "CONTROL_NET"
                    }],
                    "properties": {
                        "Node name for S&R": "ControlNetLoader"
                    },
                    "widgets_values": ["control_sd15_depth.pth"]
                }, {
                    "id": 9,
                    "type": "SaveImage",
                    "pos": [1990, 220],
                    "size": {
                        "0": 329.4598083496094,
                        "1": 337.51904296875
                    },
                    "flags": {},
                    "order": 21,
                    "mode": 0,
                    "inputs": [{
                        "link": 9,
                        "name": "images",
                        "type": "IMAGE"
                    }],
                    "properties": {},
                    "widgets_values": ["ComfyUI"]
                }, {
                    "id": 8,
                    "type": "VAEDecode",
                    "pos": [1740, 220],
                    "size": {
                        "0": 210,
                        "1": 46
                    },
                    "flags": {},
                    "order": 20,
                    "mode": 0,
                    "inputs": [{
                        "link": 7,
                        "name": "samples",
                        "type": "LATENT"
                    }, {
                        "link": 40,
                        "name": "vae",
                        "type": "VAE"
                    }],
                    "outputs": [{
                        "links": [9],
                        "name": "IMAGE",
                        "slot_index": 0,
                        "type": "IMAGE"
                    }],
                    "properties": {
                        "Node name for S&R": "VAEDecode"
                    }
                }, {
                    "id": 6,
                    "type": "CLIPTextEncode",
                    "pos": [415, 186],
                    "size": {
                        "0": 422.84503173828125,
                        "1": 164.31304931640625
                    },
                    "flags": {},
                    "order": 15,
                    "mode": 0,
                    "inputs": [{
                        "link": 36,
                        "name": "clip",
                        "type": "CLIP"
                    }],
                    "outputs": [{
                        "links": [25],
                        "name": "CONDITIONING",
                        "slot_index": 0,
                        "type": "CONDITIONING"
                    }],
                    "properties": {
                        "Node name for S&R": "CLIPTextEncode"
                    },
                    "widgets_values": [positivePrompt]
                }, {
                    "id": 23,
                    "type": "ControlNetApply",
                    "pos": [650, 820],
                    "size": {
                        "0": 300,
                        "1": 100
                    },
                    "flags": {},
                    "order": 17,
                    "mode": 0,
                    "inputs": [{
                        "link": 25,
                        "name": "conditioning",
                        "type": "CONDITIONING"
                    }, {
                        "link": 20,
                        "name": "control_net",
                        "type": "CONTROL_NET"
                    }, {
                        "link": 21,
                        "name": "image",
                        "type": "IMAGE"
                    }],
                    "outputs": [{
                        "links": [28],
                        "name": "CONDITIONING",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "CONDITIONING"
                    }],
                    "properties": {
                        "Node name for S&R": "ControlNetApply"
                    },
                    "widgets_values": [DEPTH_STRENGTH]
                }, {
                    "id": 26,
                    "type": "Reroute",
                    "pos": [530, 1040],
                    "size": [75, 26],
                    "flags": {},
                    "order": 9,
                    "mode": 0,
                    "inputs": [{
                        "link": 23,
                        "name": "",
                        "type": "*"
                    }],
                    "outputs": [{
                        "links": [24, 29],
                        "name": "",
                        "slot_index": 0,
                        "type": "IMAGE"
                    }],
                    "properties": {
                        "showOutputText": false,
                        "horizontal": false
                    }
                }, {
                    "id": 25,
                    "type": "Reroute",
                    "pos": [40, 1040],
                    "size": [75, 26],
                    "flags": {},
                    "order": 6,
                    "mode": 0,
                    "inputs": [{
                        "link": 22,
                        "name": "",
                        "type": "*"
                    }],
                    "outputs": [{
                        "links": [23],
                        "name": "",
                        "slot_index": 0,
                        "type": "IMAGE"
                    }],
                    "properties": {
                        "showOutputText": false,
                        "horizontal": false
                    }
                }, {
                    "id": 24,
                    "type": "MiDaS-DepthMapPreprocessor",
                    "pos": [650, 1040],
                    "size": {
                        "0": 300,
                        "1": 82
                    },
                    "flags": {},
                    "order": 13,
                    "mode": 0,
                    "inputs": [{
                        "link": 24,
                        "name": "image",
                        "type": "IMAGE"
                    }],
                    "outputs": [{
                        "links": [21],
                        "name": "IMAGE",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "IMAGE"
                    }],
                    "properties": {
                        "Node name for S&R": "MiDaS-DepthMapPreprocessor"
                    },
                    "widgets_values": [6.283185307179586, 0.05]
                }, {
                    "id": 10,
                    "type": "LoadImage",
                    "pos": [-324, 618],
                    "size": {
                        "0": 315,
                        "1": 314
                    },
                    "flags": {},
                    "order": 1,
                    "mode": 0,
                    "outputs": [{
                        "links": [16, 22],
                        "name": "IMAGE",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "IMAGE"
                    }, {
                        "links": null,
                        "name": "MASK",
                        "shape": 3,
                        "type": "MASK"
                    }],
                    "properties": {
                        "Node name for S&R": "LoadImage"
                    },
                    "widgets_values": [imageFilename, "image"]
                }, {
                    "id": 30,
                    "type": "HEDPreprocessor",
                    "pos": [980, 1040],
                    "size": {
                        "0": 300,
                        "1": 82
                    },
                    "flags": {},
                    "order": 14,
                    "mode": 0,
                    "inputs": [{
                        "link": 29,
                        "name": "image",
                        "type": "IMAGE"
                    }],
                    "outputs": [{
                        "links": [33],
                        "name": "IMAGE",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "IMAGE"
                    }],
                    "properties": {
                        "Node name for S&R": "HEDPreprocessor"
                    },
                    "widgets_values": ["v1.1", "enable"]
                }, {
                    "id": 27,
                    "type": "ControlNetLoader",
                    "pos": [980, 950],
                    "size": {
                        "0": 300,
                        "1": 60
                    },
                    "flags": {},
                    "order": 2,
                    "mode": 0,
                    "outputs": [{
                        "links": [26],
                        "name": "CONTROL_NET",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "CONTROL_NET"
                    }],
                    "properties": {
                        "Node name for S&R": "ControlNetLoader"
                    },
                    "widgets_values": ["control_sd15_hed.pth"]
                }, {
                    "id": 28,
                    "type": "ControlNetApply",
                    "pos": [980, 820],
                    "size": {
                        "0": 300,
                        "1": 100
                    },
                    "flags": {},
                    "order": 18,
                    "mode": 0,
                    "inputs": [{
                        "link": 28,
                        "name": "conditioning",
                        "type": "CONDITIONING"
                    }, {
                        "link": 26,
                        "name": "control_net",
                        "type": "CONTROL_NET"
                    }, {
                        "link": 33,
                        "name": "image",
                        "type": "IMAGE"
                    }],
                    "outputs": [{
                        "links": [32],
                        "name": "CONDITIONING",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "CONDITIONING"
                    }],
                    "properties": {
                        "Node name for S&R": "ControlNetApply"
                    },
                    "widgets_values": [HED_STRENGTH]
                }, {
                    "id": 3,
                    "type": "KSampler",
                    "pos": [1400, 220],
                    "size": {
                        "0": 315,
                        "1": 262
                    },
                    "flags": {},
                    "order": 19,
                    "mode": 0,
                    "inputs": [{
                        "link": 41,
                        "name": "model",
                        "type": "MODEL"
                    }, {
                        "link": 32,
                        "name": "positive",
                        "type": "CONDITIONING"
                    }, {
                        "link": 6,
                        "name": "negative",
                        "type": "CONDITIONING"
                    }, {
                        "link": 15,
                        "name": "latent_image",
                        "type": "LATENT"
                    }],
                    "outputs": [{
                        "links": [7],
                        "name": "LATENT",
                        "slot_index": 0,
                        "type": "LATENT"
                    }],
                    "properties": {
                        "Node name for S&R": "KSampler"
                    },
                    "widgets_values": [1073973887808972, "randomize", 20, 8, "euler", "karras", denoise]
                }, {
                    "id": 35,
                    "type": "Reroute",
                    "pos": [290, 390],
                    "size": [75, 26],
                    "flags": {},
                    "order": 12,
                    "mode": 0,
                    "inputs": [{
                        "name": "",
                        "type": "*",
                        "link": 44
                    }],
                    "outputs": [{
                        "name": "",
                        "type": "CLIP",
                        "links": [36, 38],
                        "slot_index": 0
                    }],
                    "properties": {
                        "showOutputText": false,
                        "horizontal": false
                    }
                }, {
                    "id": 36,
                    "type": "Reroute",
                    "pos": [290, 250],
                    "size": [75, 26],
                    "flags": {},
                    "order": 7,
                    "mode": 0,
                    "inputs": [{
                        "name": "",
                        "type": "*",
                        "link": 45
                    }],
                    "outputs": [{
                        "name": "",
                        "type": "VAE",
                        "links": [39, 40],
                        "slot_index": 0
                    }],
                    "properties": {
                        "showOutputText": false,
                        "horizontal": false
                    }
                }, {
                    "id": 37,
                    "type": "Reroute",
                    "pos": [290, 220],
                    "size": [75, 26],
                    "flags": {},
                    "order": 11,
                    "mode": 0,
                    "inputs": [{
                        "name": "",
                        "type": "*",
                        "link": 43,
                        "slot_index": 0
                    }],
                    "outputs": [{
                        "name": "",
                        "type": "MODEL",
                        "links": [41],
                        "slot_index": 0
                    }],
                    "properties": {
                        "showOutputText": false,
                        "horizontal": false
                    }
                }, {
                    "id": 34,
                    "type": "CheckpointLoaderSimple",
                    "pos": [-60, 440],
                    "size": [320, 100],
                    "flags": {},
                    "order": 3,
                    "mode": 0,
                    "outputs": [{
                        "links": [34],
                        "name": "MODEL",
                        "slot_index": 0,
                        "type": "MODEL"
                    }, {
                        "links": [35],
                        "name": "CLIP",
                        "slot_index": 1,
                        "type": "CLIP"
                    }, {
                        "links": [45],
                        "name": "VAE",
                        "slot_index": 2,
                        "type": "VAE"
                    }],
                    "properties": {
                        "Node name for S&R": "CheckpointLoaderSimple"
                    },
                    "widgets_values": [checkpoint]
                }, {
                    "id": 38,
                    "type": "PrimitiveNode",
                    "pos": [-60, 180],
                    "size": [320, 80],
                    "flags": {},
                    "order": 4,
                    "mode": 0,
                    "outputs": [{
                        "name": "FLOAT",
                        "type": "FLOAT",
                        "links": [46, 47],
                        "slot_index": 0,
                        "widget": {
                            "name": "strength_model",
                            "config": ["FLOAT", {
                                "default": 1,
                                "min": -10,
                                "max": 10,
                                "step": 0.01
                            }]
                        }
                    }],
                    "properties": {},
                    "widgets_values": [0.599, "fixed"]
                }, {
                    "id": 33,
                    "type": "LoraLoader",
                    "pos": [-60, 290],
                    "size": [320, 120],
                    "flags": {},
                    "order": 8,
                    "mode": 0,
                    "inputs": [{
                        "name": "model",
                        "type": "MODEL",
                        "link": 34
                    }, {
                        "name": "clip",
                        "type": "CLIP",
                        "link": 35
                    }, {
                        "name": "strength_model",
                        "type": "FLOAT",
                        "link": 46,
                        "widget": {
                            "name": "strength_model",
                            "config": ["FLOAT", {
                                "default": 1,
                                "min": -10,
                                "max": 10,
                                "step": 0.01
                            }]
                        }
                    }, {
                        "name": "strength_clip",
                        "type": "FLOAT",
                        "link": 47,
                        "widget": {
                            "name": "strength_clip",
                            "config": ["FLOAT", {
                                "default": 1,
                                "min": -10,
                                "max": 10,
                                "step": 0.01
                            }]
                        }
                    }],
                    "outputs": [{
                        "name": "MODEL",
                        "type": "MODEL",
                        "links": [43],
                        "shape": 3,
                        "slot_index": 0
                    }, {
                        "name": "CLIP",
                        "type": "CLIP",
                        "links": [44],
                        "shape": 3,
                        "slot_index": 1
                    }],
                    "properties": {
                        "Node name for S&R": "LoraLoader"
                    },
                    "widgets_values": ["tennis4.safetensors", 0.599, 0.599]
                }, {
                    "id": 11,
                    "type": "VAEEncode",
                    "pos": [410, 620],
                    "size": {
                        "0": 210,
                        "1": 46
                    },
                    "flags": {},
                    "order": 10,
                    "mode": 0,
                    "inputs": [{
                        "link": 17,
                        "name": "pixels",
                        "type": "IMAGE"
                    }, {
                        "link": 39,
                        "name": "vae",
                        "type": "VAE"
                    }],
                    "outputs": [{
                        "links": [15],
                        "name": "LATENT",
                        "shape": 3,
                        "slot_index": 0,
                        "type": "LATENT"
                    }],
                    "properties": {
                        "Node name for S&R": "VAEEncode"
                    }
                }],
                "links": [
                    [6, 7, 0, 3, 2, "CONDITIONING"],
                    [7, 3, 0, 8, 0, "LATENT"],
                    [9, 8, 0, 9, 0, "IMAGE"],
                    [15, 11, 0, 3, 3, "LATENT"],
                    [16, 10, 0, 14, 0, "IMAGE"],
                    [17, 14, 0, 11, 0, "IMAGE"],
                    [20, 17, 0, 23, 1, "CONTROL_NET"],
                    [21, 24, 0, 23, 2, "IMAGE"],
                    [22, 10, 0, 25, 0, "*"],
                    [23, 25, 0, 26, 0, "*"],
                    [24, 26, 0, 24, 0, "IMAGE"],
                    [25, 6, 0, 23, 0, "CONDITIONING"],
                    [26, 27, 0, 28, 1, "CONTROL_NET"],
                    [28, 23, 0, 28, 0, "CONDITIONING"],
                    [29, 26, 0, 30, 0, "IMAGE"],
                    [32, 28, 0, 3, 1, "CONDITIONING"],
                    [33, 30, 0, 28, 2, "IMAGE"],
                    [34, 34, 0, 33, 0, "MODEL"],
                    [35, 34, 1, 33, 1, "CLIP"],
                    [36, 35, 0, 6, 0, "CLIP"],
                    [38, 35, 0, 7, 0, "CLIP"],
                    [39, 36, 0, 11, 1, "VAE"],
                    [40, 36, 0, 8, 1, "VAE"],
                    [41, 37, 0, 3, 0, "MODEL"],
                    [43, 33, 0, 37, 0, "*"],
                    [44, 33, 1, 35, 0, "*"],
                    [45, 34, 2, 36, 0, "*"],
                    [46, 38, 0, 33, 2, "FLOAT"],
                    [47, 38, 0, 33, 3, "FLOAT"]
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
