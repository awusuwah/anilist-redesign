<template>
  <Tooltip>
    <a :href="character.siteUrl">
      <img :src="character.image.large" class="card h-[90px] rounded-lg" />
    </a>

    <template #content>
      {{ character.name.full }}
    </template>
  </Tooltip>
</template>

<script lang="ts">
import Tooltip from "@/tooltip/Tooltip.vue";
import { type Character } from "~/types/anilist";

export default {
  name: "CharacterCard",
  components: {
    Tooltip,
  },
  props: {
    character: {
      type: Object as () => Character,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  -webkit-box-shadow: 0px 8px 16px -8px #000000;
  box-shadow: 0px 8px 16px -8px #000000;
}
</style>
