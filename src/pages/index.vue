<template>
  <div class="container mx-auto text-white">
    <AnimeShowcase :anime="currentlyViewingAnime" />
    <AnimeShowcaseCarousel :anime="allAnimes" />
  </div>
</template>

<script lang="ts">
import { useAnimeStore } from "~/store/anime";

export default {
  name: "IndexPage",
  computed: {
    allAnimes() {
      return useAnimeStore().getAllAnimes();
    },

    /**
     * Get the anime which is currently being viewed.
     */
    currentlyViewingAnime() {
      return this.allAnimes.find((anime) => anime.id === useAnimeStore().getCurrentlyViewing()?.id);
    },
  },
};
</script>
