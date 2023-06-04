<p align="center">
  <img src="design/logo.png" align="center" height="128" width="128"/>
</p>
<h1 align="center">Remote Prompter</h1>

---

[![publish](https://github.com/filipemeneses/remote-prompter/actions/workflows/main.yml/badge.svg)](https://github.com/filipevmeneses/remote-prompter/actions/workflows/main.yml)

Remotely invoke prompts and get images from clipboard data, allows to use Stable Diffusion with any (almost) image editor. Supports AUTOMATIC1111 and ComfyUI (with [WAS Node Suite](https://github.com/WASasquatch/was-node-suite-comfyui))


# Usage

## Using copy & paste on Krita
https://github.com/filipemeneses/remote-prompter/assets/10226292/c4771059-a664-485d-b365-1e26fde5d48c

## Using screenshot on MSPaint
https://github.com/filipemeneses/remote-prompter/assets/10226292/7028e348-5978-46e8-84e4-d4111fc7b71d

# Contributing

This app is made with [Tauri](https://tauri.app)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

### Running locally

```sh
# without desktop app
pnpm run dev
# with desktop app
pnpm run tauri dev
```

### Building 

```sh
# without desktop app
pnpm run build
# with desktop app
pnpm run tauri build
```
