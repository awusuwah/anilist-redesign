<template>
  <Carousel
    v-if="anime.length >= 3"
    :items-to-show="1.5"
    :wrap-around="true"
    :autoplay="5000"
    :transition="500"
    class="text-right w-[1000px] mx-auto"
    pause-autoplay-on-hover
  >
    <template #slides>
      <Slide v-for="a in anime" :key="a">
        <div class="text-left">
          <AnimeShowcase :anime="a" />
        </div>
      </Slide>
    </template>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script lang="ts">
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import AnimeShowcase from "@/animeShowcase/AnimeShowcase.vue";
import { type Anime } from "~/store/anime";

import "vue3-carousel/dist/carousel.css";

export default {
  name: "AnimeShowcaseCarousel",
  components: {
    AnimeShowcase,
    Carousel,
    Navigation,
    Pagination,
    Slide,
  },
  props: {
    /**
     * The list of all the animes that are being displayed in the carousel.
     */
    anime: {
      type: Array as () => Anime[],
      defaul: () => [],
    },
  },
};
</script>

<style scoped>
.carousel__slide--prev,
.carousel__slide--next {
  transform: scale(0.85);
}
</style>
