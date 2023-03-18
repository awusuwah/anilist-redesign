<template>
  <article v-if="anime" class="flex flex-row w-[700px] h-[350px] mx-auto mt-12 bg-zinc-600 rounded-xl drop-shadow-xl overflow-hidden">
    <section class="w-[230px] h-full">
      <img class="h-full object-cover" :src="anime.coverImage.extraLarge" />
    </section>

    <section class="flex-1 px-4 py-5 text-xs text-gray-300 flex flex-col justify-between">
      <div>
        <h1 class="font-bold text-lg text-white drop-shadow-xl flex flex-row gap-x-3">
          {{ anime.title.english }}
          <StarRating :rating="anime.averageScore" />
        </h1>
        <p class="desc" v-html="anime.description" />
      </div>

      <!-- Information Grid -->
      <div class="grid grid-cols-4">
        <b class="col-span-1">Release Date</b>
        <div class="col-span-3">{{ anime.startDate.year }} - {{ anime.endDate.year }}</div>

        <b class="col-span-1">Studio</b>
        <div class="col-span-3">{{ anime.studios.nodes[0].name }}</div>

        <b class="col-span-1">Genres</b>
        <div class="col-span-3">{{ anime.genres.join(", ") }}</div>
      </div>

      <div>
        <!-- Rankings -->
        <div class="flex flex-row gap-x-5">
          <div class="flex flex-row gap-x-2">
            <Icon icon="star-filled" size="sm" class="text-amber-500 drop-shadow-lg" />
            <span>{{ `#${this.anime?.rankings[0].rank} ${this.anime?.rankings[0].context}` }}</span>
          </div>
          <div class="flex flex-row gap-x-2">
            <Icon icon="heart-filled" size="sm" class="text-red-700 drop-shadow-lg" />
            <span>{{ `#${this.anime?.rankings[1].rank} ${this.anime?.rankings[1].context}` }}</span>
          </div>
        </div>
        <!-- The characters from the anime -->
        <div class="flex flex-row gap-x-3 mt-2">
          <CharacterCard v-for="character in anime.characters.nodes" :key="character.id" :character="character" />
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import CharacterCard from "@/character/CharacterCard.vue";
import Icon from "@/icon/Icon.vue";
import StarRating from "@/starRating/StarRating.vue";

import { useAnimeStore, type Anime } from "~/store/anime";
import { fetchAnime } from "~/utils/fetchData";

// Static Variables
const ANIME_ID = 142329;

export default {
  name: "AnimeShowcase",
  components: {
    CharacterCard,
    Icon,
    StarRating,
  },
  async setup() {
    const currentlyViewing: any = useAnimeStore().getCurrentlyViewing();
    fetchAnime(currentlyViewing?.id);
  },
  computed: {
    anime() {
      const animeStore = useAnimeStore();
      return animeStore.getAnimeById(animeStore.getCurrentlyViewing()?.id);
    },
    ratedString() {
      return `#${this.anime?.rankings[0].rank} ${this.anime?.rankings[0].context}`;
    },
  },
};
</script>

<style scoped>
/* css class to cut off the text inside the element after the sixth line */
.desc {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
