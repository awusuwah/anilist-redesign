<template>
  <div name="app">
    <AllIcons />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import AllIcons from "@/icon/AllIcons.vue";

import { syncLocalStorageWithStore } from "~/utils/localStorage";

export default {
  name: "App",
  components: {
    AllIcons,
  },
  beforeMount() {
    syncLocalStorageWithStore();
  },
};
</script>
