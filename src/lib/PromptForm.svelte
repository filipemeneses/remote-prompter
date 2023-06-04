<script>
  import { persisted } from "svelte-local-storage-store";
  import ImageClipboard from "./ImageClipboard.svelte";
  import { get } from "svelte/store";
  import ImagePreview from "./ImagePreview.svelte";
  import { writeImage } from "tauri-plugin-clipboard-api";

  export let ipAddress;
  export let integration = {
    name: "fallback integration",
    invokePrompt(payload) {
      return {
        onProgress(cb) {},
        onceDone(cb) {},
      };
    },
  };

  let checkpoint = persisted("checkpoint", integration.checkpoints[0]);

  let denoise = persisted("denoise", "0.7");
  let positivePrompt = persisted(
    "positivePrompt",
    "landscape, tree, sun, grass, daylight, bloom, unreal engine"
  );
  let negativePrompt = persisted(
    integration.name + "_negativePrompt",
    integration?.defaults?.negativePrompt ?? ""
  );

  let isAutoGenerateEnabled = persisted("isAutoGenerateEnabled", false);

  let base64Image;
  let generatedImage;
  let generatingProgress;
  let isGenerating = false;
  let isExpectingGeneratedImageOnClipboard = false;

  let showMore = false;

  async function generateImage() {
    if (isGenerating) return;

    const payload = {
      checkpoint: get(checkpoint),
      ipAddress: get(ipAddress),
      base64Image,
      positivePrompt: get(positivePrompt),
      negativePrompt: get(negativePrompt),
      denoise: get(denoise),
    };

    isGenerating = true;
    generatingProgress = 0;

    try {
      const { onProgress, onceDone } = await integration.invokePrompt(payload);

      onProgress(({ progressPercentage }) => {
        generatingProgress = progressPercentage;
      });

      onceDone(async (payload) => {
        generatedImage = `data:image/png;base64,${payload.generatedImage}`;

        try {
          await writeImage(payload.generatedImage.replace(/=/g, ""));
        } catch (e) {
          console.error("failed to write clipboard:", e);
        }

        isGenerating = false;
        isExpectingGeneratedImageOnClipboard = true;
      });
    } catch (e) {
      console.error("failed to generate image:", e);

      isGenerating = false;
    }
  }

  function handleOnClipboardChange() {
    const isFeatureEnabled = get(isAutoGenerateEnabled);

    if (!isFeatureEnabled) return;

    if (isExpectingGeneratedImageOnClipboard) {
      isExpectingGeneratedImageOnClipboard = false;
      return;
    }

    generateImage();
  }
</script>

<div>
  <form on:submit|preventDefault={generateImage}>
    <div class="PromptForm__images">
      <ImageClipboard
        bind:currentImage={base64Image}
        onClipboardChange={handleOnClipboardChange}
      />
      <ImagePreview
        image={generatedImage}
        missingImageMessage="Generated image will show up here"
      />
    </div>
    {#if integration?.supports?.includes("checkpoint")}
      <fieldset>
        <label for="checkpoint">Checkpoint</label>
        <select id="checkpoint" bind:value={$checkpoint}>
          {#each integration.checkpoints as checkpoint}
            <option value={checkpoint.raw}>
              {checkpoint.getName()}
            </option>
          {/each}
        </select>
      </fieldset>
    {/if}
    <fieldset>
      <label for="positive_prompt">Positive prompt</label>
      <textarea id="positive_prompt" bind:value={$positivePrompt} />
    </fieldset>
    {#if showMore}
      <fieldset>
        <label for="negative_prompt">Negative prompt</label>
        <textarea id="negative_prompt" bind:value={$negativePrompt} />
      </fieldset>
    {/if}

    <fieldset>
      <label for="denoise">Denoise</label>
      <div class="PromptForm__range">
        <input
          id="denoise"
          class="PromptForm__range-label"
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
    {#if showMore}
      <fieldset>
        <label for="isAutoGenerateEnabled">Auto generate</label>
        <div class="PromptForm__range">
          <input
            id="isAutoGenerateEnabled"
            type="checkbox"
            bind:checked={$isAutoGenerateEnabled}
          />
        </div>
      </fieldset>
    {/if}
    <button
      type="submit"
      class="PromptForm__submit"
      class:isGenerating
      disabled={!base64Image || isGenerating}
    >
      {#if isGenerating}
        Generating ...
      {:else}
        Generate
      {/if}
    </button>
    {#if isGenerating}
      <div class="PromptForm__range">
        <div class="PromptForm__range-label">
          {Math.floor((generatingProgress ?? 0) * 100)}%
        </div>
        {#if !generatingProgress || generatingProgress === 1}
          <progress aria-busy> 100% </progress>
        {:else}
          <progress
            max="100"
            value={Math.floor((generatingProgress ?? 0) * 100)}
            aria-busy={Number(generatingProgress) === 1 ? "true" : "false"}
          >
            {generatingProgress ?? 0}%
          </progress>
        {/if}
      </div>
    {/if}
    <a href="#" on:click={() => (showMore = !showMore)}>
      {!showMore ? "Show more" : "Show less"}
    </a>
  </form>
</div>

<style>
  .PromptForm__submit[disabled] {
    cursor: no-drop;
  }
  .PromptForm__submit.isGenerating {
    cursor: progress;
  }
  .PromptForm__images {
    display: flex;
  }
  .PromptForm__range {
    display: flex;
    flex-direction: row;
  }
  .PromptForm__range-label {
    min-width: 80px;
    max-width: 80px;
  }
</style>
