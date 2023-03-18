<template>
  <section class="bg-gray-800 w-1/2 rounded-lg px-2 py-3">
    <h1 class="text-2xl text-white font-bold mb-3">Local Data</h1>

    <div class="grid grid-cols-1 divide-y">
      <div v-for="anime in allAnimes" :key="anime.id" :class="itemClasses">
        <span>{{ anime.title.english }}</span>
        <div class="flex flex-row gap-x-1">
          <Icon
            icon="check"
            size="md"
            :class="[checkIconClasses, { 'text-emerald-500': anime.id === currentlyViewing.id }]"
            @click="displayAnime(anime.id)"
          />

          <Icon
            icon="delete"
            size="md"
            class="text-gray-400 hover:text-rose-800 transition-all cursor-pointer"
            @click="deleteAnime(anime.id)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Icon from "@/icon/Icon.vue";

import { useAnimeStore } from "~/store/anime";

export default {
  name: "LocalData",
  components: {
    Icon,
  },
  data() {
    return {
      hovering: null,
    };
  },
  computed: {
    allAnimes() {
      return useAnimeStore().getAllAnimes();
    },

    currentlyViewing() {
      return useAnimeStore().getCurrentlyViewing();
    },

    itemClasses() {
      return {
        "flex items-center justify-between px-1 py-2 text-sm text-gray-400": true,
      };
    },

    checkIconClasses() {
      return {
        "hover:text-green-500 transition-all cursor-pointer": true,
      };
    },
  },
  methods: {
    /**
     * Delete an anime from the local database. This is useful for when the data needs to be refetched.
     *
     * @param { number } animeId - The ID of the anime to delete.
     */
    deleteAnime(animeId: number) {
      useAnimeStore().deleteAnime(animeId);
    },

    /**
     * Display an on the page.
     *
     * @param { number } animeId - The ID of the anime to display.
     */
    displayAnime(animeId: number) {
      useAnimeStore().setCurrentlyViewing(animeId);
    },
  },
};
</script>
