<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let fileContent = writable("");

  let dropArea;
  let isOverDropArea = false;

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (!files?.[0]) return;

    previewFile(files[0]);
  };

  const previewFile = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let img = new Image();
      img.src = reader.result;
      dropArea.appendChild(img);
      fileContent.set(reader.result);
    };
  };

  onMount(() => {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(
        eventName,
        () => {
          isOverDropArea = true;
        },
        false
      );
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(
        eventName,
        () => {
          isOverDropArea = false;
        },
        false
      );
    });

    dropArea.addEventListener("drop", handleDrop, false);
  });
</script>

<div id="drop-area" bind:this={dropArea} class:isOverDropArea>
  Drag and drop a file here
</div>

<style>
  #drop-area {
    border: 2px dashed #f0f;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  #drop-area.isOverDropArea {
    border-color: yellow !important;
  }
  #drop-area img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
