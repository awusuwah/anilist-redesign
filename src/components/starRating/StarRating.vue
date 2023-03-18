<template>
  <div class="flex flex-row gap-x-1 items-center">
    <Icon v-for="i in Math.floor(rating / 20)" :key="`${i}-filled`" icon="star-filled" size="sm" class="text-amber-500 drop-shadow-lg" />
    <Icon v-if="(rating / 20) % 1 !== 0" icon="star-half-filled" size="sm" class="text-amber-500 drop-shadow-lg" />
    <Icon v-for="i in 5 - Math.ceil(rating / 20)" :key="`${i}-empty`" icon="star-empty" size="sm" class="text-amber-500 drop-shadow-lg" />
  </div>
</template>

<script lang="ts">
import Icon from "@/icon/Icon.vue";
import Tooltip from "@/tooltip/Tooltip.vue";

export default {
  name: "StarRating",
  components: {
    Icon,
    Tooltip,
  },
  props: {
    /**
     * The rating to display. This can be any number between 0 and 5, in increments of 0.5.
     */
    // rating: {
    //   type: Number,
    //   required: true,
    //   validator: (value: number) =>
    //     value >= 0 && value <= 5 && value % 0.5 === 0,
    // },
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // create
  },
};
</script>
