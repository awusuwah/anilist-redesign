<template>
  <Teleport to="body">
    <div>
      <transition name="fade" appear>
        <div class="absolute inset-0 bg-black bg-opacity-70" />
      </transition>

      <transition name="fade" appear>
        <div class="absolute inset-0 flex items-center justify-center">
          <section class="flex flex-col gap-3">
            <SearchInput />

            <div>
              <LocalData @close="$emit('close')" />
            </div>
          </section>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import Icon from "@/icon/Icon.vue";
import LocalData from "@/spotlight/LocalData.vue";
import SearchInput from "@/spotlight/SearchInput.vue";

export default {
  name: "Spotlight",
  components: {
    Icon,
    LocalData,
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
