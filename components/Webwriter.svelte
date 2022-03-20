<script>
  import options from "@webwriter-options";
  import { marked } from "marked";

  let editing = false;
  let textarea;

  let isLoading = true;
  let raw = "";
  $: options.loadRaw(path).then((data) => {
    raw = data;
    isLoading = false;
  });

  function edit() {
    editing = true;
    textarea.focus();
  }

  async function complete() {
    editing = false;
    await options.save(path, raw);
  }

  export let path = "";
</script>

<div class="_slice" class:is-editing={editing} on:dblclick={edit}>
  <section>
    <p class="_empty">DEV!</p>
    {#if isLoading}
      <p class="_empty">Loading</p>
    {:else if raw.length <= 0}
      <p class="_empty">Empty</p>
    {:else}
      {@html path.endsWith(".md") ? marked.parse(raw) : raw}
    {/if}
  </section>

  <textarea bind:this={textarea} bind:value={raw} on:blur={complete} />
</div>

<style lang="scss">
  ._slice {
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: text;

    ._empty {
      opacity: 0.4;
    }

    section {
      pointer-events: none;
      user-select: none;
      transition: 150ms;
    }

    textarea {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      background: transparent;
      border: none;
      outline-color: black;

      opacity: 0;
      pointer-events: none;
      resize: none;
      transition: 150ms;
    }

    &:hover {
      section {
        opacity: 0.4;
      }
    }

    &.is-editing {
      section {
        opacity: 0;
      }

      textarea {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
</style>
