<script>
  import { persisted } from "svelte-local-storage-store";
  import ImageClipboard from "./ImageClipboard.svelte";
  import { get } from "svelte/store";
  import { invokePrompt } from "../fns/ai/comfy/invokePrompt";
  import ImagePreview from "./ImagePreview.svelte";
  import { writeImage } from "tauri-plugin-clipboard-api";

  let ipAddress = persisted("ipAddress", "127.0.0.1:8188");
  let denoise = persisted("denoise", "0.7");
  let positivePrompt = persisted("positivePrompt", "landscape");

  let base64Image;
  let generatedImage;
  let isGenerating = false;

  async function generateImage() {
    if (isGenerating) return;

    const payload = {
      ipAddress: get(ipAddress),
      base64Image,
      positivePrompt: get(positivePrompt),
      denoise: get(denoise),
    };

    isGenerating = true;

    try {
      const tauriResponse = await invokePrompt(payload);
      generatedImage = `data:image/png;base64,${tauriResponse.generatedImage}`;

      try {
        await writeImage(tauriResponse.generatedImage.replace(/=/g, ""));
      } catch (e) {
        console.error("failed to write clipboard 2", e);
      }
    } catch (e) {
      console.error("failed to generate image", e);
    }

    isGenerating = false;
  }
</script>

<div>
  <form on:submit|preventDefault={generateImage}>
    <div class="PromptForm__images">
      <ImageClipboard bind:currentImage={base64Image} />
      <ImagePreview
        image={generatedImage}
        missingImageMessage="Generated image will show up here"
      />
    </div>
    <fieldset>
      <label for="positive_prompt">Positive prompt</label>
      <textarea id="positive_prompt" bind:value={$positivePrompt} />
    </fieldset>
    <fieldset>
      <label for="ip_address">Stable Diffusion UI address </label>
      <input id="ip_address" bind:value={$ipAddress} />
    </fieldset>
    <fieldset>
      <label for="denoise">Denoise</label>
      <div class="PromptForm__range">
        <input
          id="denoise"
          type="number"
          min="0"
          max="1"
          step="0.01"
          bind:value={$denoise}
        />
        <input
          id="denoise"
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={$denoise}
        />
      </div>
    </fieldset>
    <button type="submit" disabled={!base64Image || isGenerating}>
      {#if isGenerating}
        Generating ...
      {:else}
        Generate
      {/if}
    </button>
  </form>
</div>

<style>
  .PromptForm__images {
    display: flex;
  }
  .PromptForm__range {
    display: flex;
    flex-direction: row;
  }
  .PromptForm__range [type="number"] {
    min-width: 80px;
    max-width: 80px;
  }
</style>
