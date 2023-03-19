<template>
  <section class="bg-gray-800 w-1/2 rounded-lg px-2 py-3">
    <h1 class="text-2xl text-white font-bold mb-3">Local Data</h1>

    <div class="grid grid-cols-1 divide-y">
      <div v-for="anime in allAnimes" :key="anime.id" :class="itemClasses">
        <span>{{ anime.title.english || anime.title.romaji }}</span>
        <div class="flex flex-row gap-x-1">
          <Icon
            icon="check"
            size="md"
            :class="[checkIconClasses, { 'text-emerald-500': anime.id === currentlyViewing.id }]"
            @click="setViewing(anime.id)"
          />

          <Icon
            icon="delete"
            size="md"
            class="text-gray-400 hover:text-rose-800 transition-all cursor-pointer"
            @click="removeAnime(anime.id)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Icon from "@/icon/Icon.vue";

import { useAnimeStore } from "~/store/anime";
import { type Anime } from "~/types/anilist";

export default {
  name: "LocalData",
  components: {
    Icon,
  },
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

    /**
     * The classes which are applied to the single icons of the list.
     */
    itemClasses() {
      return {
        "flex items-center justify-between px-1 py-2 text-sm text-gray-400": true,
      };
    },

    /**
     * The classes which are applied to the `check` icons in the list items.
     */
    checkIconClasses() {
      return {
        "hover:text-green-500 transition-all cursor-pointer": true,
      };
    },
  },
  methods: {
    /**
     * Remove an anime from the local storage.
     *
     * @param { number } animeId - The ID of the anime to remove.
     */
    removeAnime(animeId: number) {
      useAnimeStore().removeAnime(animeId);
    },

    /**
     * Set an anime as the currently being viewed anime.
     *
     * @param { number } animeId - The ID of the anime to set as the currently being viewed anime.
     */
    setViewing(animeId: number) {
      useAnimeStore().setViewing(animeId);
    },
  },
};
</script>
