<script lang="ts">
  import { listen } from "@tauri-apps/api/event";
  import { IMAGE_CHANGED, listenImage } from "tauri-plugin-clipboard-api";
  import { onDestroy, onMount } from "svelte";
  import ImagePreview from "./ImagePreview.svelte";
  import { readBinaryFile } from "@tauri-apps/api/fs";
  import { arrayBufferToBase64 } from "../fns/b64/arrayBufferToBase64";

  export let currentImage = null;
  export let onClipboardChange = () => {};

  let tauriImageUnlisten;
  let imageUnlisten;

  listen("tauri://file-drop", async (event) => {
    const images = event.payload.filter((filepath) =>
      [".png", ".jpg", ".jpeg", ".gif"].some((ext) => filepath.endsWith(ext))
    );
    if (!images.length) return;
    const [image] = images;

    const binary = await readBinaryFile(image);
    currentImage = arrayBufferToBase64(binary);
  });

  export async function startListening() {
    tauriImageUnlisten = await listen(IMAGE_CHANGED, async (event) => {
      currentImage = (event.payload as { value: string })?.value;
      onClipboardChange();
    });
    imageUnlisten = listenImage();
  }

  function stopListening() {
    if (!tauriImageUnlisten) return;
    tauriImageUnlisten();
    imageUnlisten();
  }

  onMount(() => {
    startListening();
  });

  onDestroy(() => {
    stopListening();
  });
</script>

<ImagePreview
  image={currentImage ? `data:image/png;base64,${currentImage}` : ""}
  missingImageMessage="Copy a image to clipboard or drop an image file"
/>
