<script>
  import { persisted } from "svelte-local-storage-store";
  import ImageClipboard from "./ImageClipboard.svelte";
  import { get } from "svelte/store";
  import { invokePrompt } from "../fns/ai/comfy/invokePrompt";
  import ImagePreview from "./ImagePreview.svelte";

  let ipAddress = persisted("ipAddress", "http://127.0.0.1:8188");

  let positivePrompt = persisted("positivePrompt", "landscape");
  let base64Image;
  let generatedImage;
  let isGenerating = false;

  async function greet() {
    if (isGenerating) return;

    const payload = {
      ipAddress: get(ipAddress),
      base64Image,
      positivePrompt: get(positivePrompt),
    };

    isGenerating = true;

    try {
      ({ generatedImage } = await invokePrompt(payload));
    } catch (e) {
      console.error(e);
    }

    isGenerating = false;
  }
</script>

<div>
  <form on:submit|preventDefault={greet}>
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
</style>
