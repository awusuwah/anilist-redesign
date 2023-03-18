<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
// Set the background color of the page to dark
useHead({
  bodyAttrs: {
    class: "bg-gray-900",
  },
});
</script>
