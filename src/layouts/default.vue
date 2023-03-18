<template>
  <div>
    <Spotlight v-if="spotlightOpen" @close="spotlightOpen = false" />

    <slot />
  </div>
</template>

<script lang="ts">
import Spotlight from "@/spotlight/Spotlight.vue";

export default {
  name: "DefaultLayout",
  components: {
    Spotlight,
  },
  setup() {
    useHead({
      bodyAttrs: {
        class: "bg-gray-900",
      },
    });
  },
  data() {
    return {
      spotlightOpen: false,
    };
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeyDown, true);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, true);
  },
  methods: {
    /**
     * Handle any global key events in the spotlight.
     *
     * @param { KeyboardEvent } event - The keyboard event.
     */
    handleKeyDown(event: KeyboardEvent) {
      if (event.key === "p" && event.ctrlKey) {
        event.preventDefault();
        this.spotlightOpen = true;
      }
    },
  },
};
</script>
