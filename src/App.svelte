<script>
  import PromptForm from "./lib/PromptForm.svelte";
  import IpConnector from "./lib/IpConnector.svelte";
  import { persisted } from "svelte-local-storage-store";

  let integration = null;
  let ipAddress = persisted("ipAddress", "127.0.0.1:8188");
</script>

<main class="container">
  {#if !integration}
    <IpConnector bind:identifiedIntegration={integration} bind:ipAddress />
  {:else}
    <h4>
      {integration.name} on {$ipAddress}
      <a href="#disconnect" on:click={() => (integration = null)}
        >Disconnect
      </a>
    </h4>
    <PromptForm bind:integration {ipAddress} />
  {/if}
</main>

<style>
  h4 {
    margin: 0;
  }
</style>
