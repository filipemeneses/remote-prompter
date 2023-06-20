export const createPromptRequestDepthHed = ({
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
                "seed": 579891896479962,
                "steps": 20,
                "cfg": 8,
                "sampler_name": "euler",
                "scheduler": "karras",
                "denoise": denoise,
                "model": ["4", 0],
                "positive": ["28", 0],
                "negative": ["7", 0],
                "latent_image": ["11", 0]
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
                "clip": ["4", 1]
            },
            "class_type": "CLIPTextEncode"
        },
        "7": {
            "inputs": {
                "text": negativePrompt,
                "clip": ["4", 1]
            },
            "class_type": "CLIPTextEncode"
        },
        "8": {
            "inputs": {
                "samples": ["3", 0],
                "vae": ["4", 2]
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
                "vae": ["4", 2]
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
        }
    },
    "extra_data": {
        "extra_pnginfo": {
            "workflow": {
                "last_node_id": 32,
                "last_link_id": 33,
                "nodes": [{
                    "id": 4,
                    "type": "CheckpointLoaderSimple",
                    "pos": [26, 474],
                    "size": {
                        "0": 315,
                        "1": 98
                    },
                    "flags": {},
                    "order": 0,
                    "mode": 0,
                    "outputs": [{
                        "links": [1],
                        "name": "MODEL",
                        "slot_index": 0,
                        "type": "MODEL"
                    }, {
                        "links": [3, 5],
                        "name": "CLIP",
                        "slot_index": 1,
                        "type": "CLIP"
                    }, {
                        "links": [8, 11],
                        "name": "VAE",
                        "slot_index": 2,
                        "type": "VAE"
                    }],
                    "properties": {
                        "Node name for S&R": "CheckpointLoaderSimple"
                    },
                    "widgets_values": [checkpoint]
                }, {
                    "id": 7,
                    "type": "CLIPTextEncode",
                    "pos": [413, 389],
                    "size": {
                        "0": 425.27801513671875,
                        "1": 180.6060791015625
                    },
                    "flags": {},
                    "order": 5,
                    "mode": 0,
                    "inputs": [{
                        "link": 5,
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
                    "id": 11,
                    "type": "VAEEncode",
                    "pos": [380, 620],
                    "size": {
                        "0": 210,
                        "1": 46
                    },
                    "flags": {},
                    "order": 8,
                    "mode": 0,
                    "inputs": [{
                        "link": 17,
                        "name": "pixels",
                        "type": "IMAGE"
                    }, {
                        "link": 11,
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
                }, {
                    "id": 14,
                    "type": "Image Resize",
                    "pos": [20, 620],
                    "size": {
                        "0": 315,
                        "1": 178
                    },
                    "flags": {},
                    "order": 6,
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
                    "size": [300, 60],
                    "flags": {},
                    "order": 1,
                    "mode": 0,
                    "outputs": [{
                        "name": "CONTROL_NET",
                        "type": "CONTROL_NET",
                        "links": [20],
                        "shape": 3,
                        "slot_index": 0
                    }],
                    "properties": {
                        "Node name for S&R": "ControlNetLoader"
                    },
                    "widgets_values": ["control_sd15_depth.pth"]
                }, {
                    "id": 9,
                    "type": "SaveImage",
                    "pos": [1920, 190],
                    "size": {
                        "0": 329.4598083496094,
                        "1": 337.51904296875
                    },
                    "flags": {},
                    "order": 16,
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
                    "pos": [1670, 190],
                    "size": {
                        "0": 210,
                        "1": 46
                    },
                    "flags": {},
                    "order": 15,
                    "mode": 0,
                    "inputs": [{
                        "link": 7,
                        "name": "samples",
                        "type": "LATENT"
                    }, {
                        "link": 8,
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
                    "id": 3,
                    "type": "KSampler",
                    "pos": [1330, 190],
                    "size": {
                        "0": 315,
                        "1": 262
                    },
                    "flags": {},
                    "order": 14,
                    "mode": 0,
                    "inputs": [{
                        "link": 1,
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
                    "widgets_values": [579891896479962, "randomize", 20, 8, "euler", "karras", denoise]
                }, {
                    "id": 6,
                    "type": "CLIPTextEncode",
                    "pos": [415, 186],
                    "size": {
                        "0": 422.84503173828125,
                        "1": 164.31304931640625
                    },
                    "flags": {},
                    "order": 4,
                    "mode": 0,
                    "inputs": [{
                        "link": 3,
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
                    "size": [300, 100],
                    "flags": {},
                    "order": 12,
                    "mode": 0,
                    "inputs": [{
                        "name": "conditioning",
                        "type": "CONDITIONING",
                        "link": 25
                    }, {
                        "name": "control_net",
                        "type": "CONTROL_NET",
                        "link": 20
                    }, {
                        "name": "image",
                        "type": "IMAGE",
                        "link": 21
                    }],
                    "outputs": [{
                        "name": "CONDITIONING",
                        "type": "CONDITIONING",
                        "links": [28],
                        "shape": 3,
                        "slot_index": 0
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
                        "name": "",
                        "type": "*",
                        "link": 23
                    }],
                    "outputs": [{
                        "name": "",
                        "type": "IMAGE",
                        "links": [24, 29],
                        "slot_index": 0
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
                    "order": 7,
                    "mode": 0,
                    "inputs": [{
                        "name": "",
                        "type": "*",
                        "link": 22
                    }],
                    "outputs": [{
                        "name": "",
                        "type": "IMAGE",
                        "links": [23],
                        "slot_index": 0
                    }],
                    "properties": {
                        "showOutputText": false,
                        "horizontal": false
                    }
                }, {
                    "id": 24,
                    "type": "MiDaS-DepthMapPreprocessor",
                    "pos": [650, 1040],
                    "size": [300, 80],
                    "flags": {},
                    "order": 10,
                    "mode": 0,
                    "inputs": [{
                        "name": "image",
                        "type": "IMAGE",
                        "link": 24
                    }],
                    "outputs": [{
                        "name": "IMAGE",
                        "type": "IMAGE",
                        "links": [21],
                        "shape": 3,
                        "slot_index": 0
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
                    "order": 2,
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
                    "size": [300, 80],
                    "flags": {},
                    "order": 11,
                    "mode": 0,
                    "inputs": [{
                        "name": "image",
                        "type": "IMAGE",
                        "link": 29
                    }],
                    "outputs": [{
                        "name": "IMAGE",
                        "type": "IMAGE",
                        "links": [33],
                        "shape": 3,
                        "slot_index": 0
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
                    "order": 3,
                    "mode": 0,
                    "outputs": [{
                        "name": "CONTROL_NET",
                        "type": "CONTROL_NET",
                        "links": [26],
                        "shape": 3,
                        "slot_index": 0
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
                    "order": 13,
                    "mode": 0,
                    "inputs": [{
                        "name": "conditioning",
                        "type": "CONDITIONING",
                        "link": 28
                    }, {
                        "name": "control_net",
                        "type": "CONTROL_NET",
                        "link": 26
                    }, {
                        "name": "image",
                        "type": "IMAGE",
                        "link": 33
                    }],
                    "outputs": [{
                        "name": "CONDITIONING",
                        "type": "CONDITIONING",
                        "links": [32],
                        "shape": 3,
                        "slot_index": 0
                    }],
                    "properties": {
                        "Node name for S&R": "ControlNetApply"
                    },
                    "widgets_values": [HED_STRENGTH]
                }],
                "links": [
                    [1, 4, 0, 3, 0, "MODEL"],
                    [3, 4, 1, 6, 0, "CLIP"],
                    [5, 4, 1, 7, 0, "CLIP"],
                    [6, 7, 0, 3, 2, "CONDITIONING"],
                    [7, 3, 0, 8, 0, "LATENT"],
                    [8, 4, 2, 8, 1, "VAE"],
                    [9, 8, 0, 9, 0, "IMAGE"],
                    [11, 4, 2, 11, 1, "VAE"],
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
                    [33, 30, 0, 28, 2, "IMAGE"]
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
