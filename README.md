# Remote prompter

[![publish](https://github.com/filipemeneses/remote-prompter/actions/workflows/main.yml/badge.svg)](https://github.com/filipemeneses/remote-prompter/actions/workflows/main.yml)

Remotely invoke prompts and get images from clipboard data, allows to use Stable Diffusion with any (almost) image editor. Supports AUTOMATIC1111 and ComfyUI (with [WAS Node Suite](https://github.com/WASasquatch/was-node-suite-comfyui))

Note: For AUTOMATIC1111, it must allow CORS. Allowing any domain is possible with the flag `--cors-allow-origins=domain1,domain2` or a generic but unsafe approach `--cors-allow-origins-regex=".*"`