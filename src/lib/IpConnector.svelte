<script>
  import { integrations } from "../fns/integrations";
  import { get } from "svelte/store";

  import { persisted } from "svelte-local-storage-store";

  export let ipAddress;

  export let identifiedIntegration = null;
  export let isValidIp = null;
  export let isChecking = false;

  const now = () => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    return formattedDate;
  };

  let logs = [];

  const log = (str) => {
    logs = [`${now()}: ${str}`, ...logs];
  };

  const checkAvailableIntegration = async () => {
    const ipAddressStr = get(ipAddress);
    log(`checking for \`${ipAddressStr}\``);

    if (!ipAddressStr) {
      log(`missing IP address`);
      return;
    }
    isChecking = true;
    logs = [];

    for (let integration of integrations) {
      try {
        log(`attempting to identificate \`${integration.name}\` ...`);

        const isValid = await integration.identifyByIpAddress(ipAddressStr);

        if (isValid) {
          isValidIp = true;
          identifiedIntegration = integration;
          break;
        }
      } catch (e) {
        log(`integration \`${integration.name}\` failed with: \`${e}\``);
      }
    }

    log(`no integration found for IP \`${ipAddressStr}\``);

    isChecking = false;
  };
</script>

<div>
  <form on:submit|preventDefault={checkAvailableIntegration}>
    <fieldset>
      <label for="ipAddress">IP Address</label>
      <input id="ipAddress" type="text" bind:value={$ipAddress} />
    </fieldset>

    <button class="PromptForm__submit" type="submit" disabled={isChecking}>
      {#if isChecking}
        Identifing ...
      {:else}
        Identify service
      {/if}
    </button>
    {#if logs.length}
      <pre>{logs.join("\n")}</pre>
    {/if}
  </form>
</div>

<style>
  pre {
    overflow-x: scroll;
  }
</style>
