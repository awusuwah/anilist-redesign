<template>
  <Teleport to="body">
    <div>
      <transition name="fade" appear>
        <div class="absolute inset-0 bg-black bg-opacity-80" />
      </transition>

      <transition name="fade" appear>
        <div class="absolute inset-0 flex items-center justify-center">
          <section class="flex flex-col gap-3">
            <SearchInput />

            <div class="flex flex-row gap-x-3">
              <LocalAnime />
              <LocalUsers />
            </div>
          </section>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import Icon from "@/icon/Icon.vue";
import LocalAnime from "@/spotlight/LocalAnime.vue";
import LocalUsers from "@/spotlight/LocalUsers.vue";
import SearchInput from "@/spotlight/SearchInput.vue";

export default {
  name: "Spotlight",
  components: {
    Icon,
    LocalAnime,
    LocalUsers,
    SearchInput,
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "hidden";
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "auto";
  },
  methods: {
    /**
     * Handle any global key events in the spotlight.
     *
     * @param { KeyboardEvent } event - The keyboard event.
     */
    handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
