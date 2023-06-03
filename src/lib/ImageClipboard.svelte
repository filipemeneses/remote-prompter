<script>
  import { listen } from "@tauri-apps/api/event";
  import { IMAGE_CHANGED, listenImage } from "tauri-plugin-clipboard-api";
  import { onDestroy, onMount } from "svelte";
  import ImagePreview from "./ImagePreview.svelte";

  export let currentImage = null;
  export let onNewClipboard = () => {};

  let tauriImageUnlisten;
  let imageUnlisten;

  export async function startListening() {
    tauriImageUnlisten = await listen(IMAGE_CHANGED, async (event) => {
      currentImage = event.payload.value;
      onNewClipboard();
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
  image={`data:image/png;base64,${currentImage}`}
  missingImageMessage="Copy a image to clipboard"
/>
