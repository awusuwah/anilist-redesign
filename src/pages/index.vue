<template>
  <div class="container mx-auto text-white">
    <AnimeShowcase :anime="currentlyViewing" />
    <AnimeShowcaseCarousel :anime="allAnimes" />
  </div>
</template>

<script lang="ts">
import { useAnimeStore } from "~/store/anime";
import { type Anime } from "~/types/anilist";

export default {
  name: "IndexPage",
  computed: {
    /**
     * Get a list of all the anime that are stored locally.
     *
     * @returns { Anime[] } Returns a list of anime.
     */
    allAnimes(): Anime[] {
      return useAnimeStore().getAllAnime();
    },

    /**
     * Get the anime which is currently being viewed.
     *
     * @returns { Anime } Returns a single anime or null.
     */
    currentlyViewing(): Anime | null {
      return useAnimeStore().getViewing();
    },
  },
};
</script>
