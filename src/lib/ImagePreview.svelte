<script>
  export let image = null;
  export let missingImageMessage = "";
</script>

<div class="ImagePreview__container">
  <div class="ImagePreview__image" style={`background-image: url(${image})`}>
    {#if !image}
      {missingImageMessage}
    {/if}
  </div>
</div>

<style>
  .ImagePreview__container {
    width: 100%;
    border: 1px solid rgb(82, 82, 82);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  .ImagePreview__image {
    display: flex;
    aspect-ratio: 1/1;
    max-width: 200px;
    width: 100%;

    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    text-align: center;
    align-items: center;
    justify-content: center;
  }
</style>
