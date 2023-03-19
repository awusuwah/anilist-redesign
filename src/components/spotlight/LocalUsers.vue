<template>
  <section class="bg-gray-800 w-1/2 rounded-lg px-2 py-3">
    <h1 class="text-2xl text-white font-bold mb-3">Local Users</h1>

    <div class="grid grid-cols-1 divide-y">
      <div v-for="user in allUsers" :key="user.id" :class="itemClasses">
        <span>{{ user.name }}</span>
        <div class="flex flex-row gap-x-1">
          <Icon
            icon="check"
            size="md"
            :class="[checkIconClasses, { 'text-emerald-500': user.id === currentlyViewing.id }]"
            @click="setViewing(user.id)"
          />

          <Icon
            icon="delete"
            size="md"
            class="text-gray-400 hover:text-rose-800 transition-all cursor-pointer"
            @click="removeUser(user.id)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Icon from "@/icon/Icon.vue";

import { useUserStore } from "~/store/user";
import { type User } from "~/types/anilist";

export default {
  name: "LocalUsers",
  components: {
    Icon,
  },
  computed: {
    /**
     * Get a list of all locally stored users.
     *
     * @returns { User[] } Returns a list of users.
     */
    allUsers(): User[] {
      return useUserStore().getAllUsers();
    },

    /**
     * Get the user which is currently being viewed.
     *
     * @returns { User } Returns a single user or null.
     */
    currentlyViewing(): User | null {
      return useUserStore().getViewing();
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
     * Remove a user from the local storage.
     *
     * @param { number } userId - The ID of the user to remove.
     */
    removeUser(userId: number) {
      useUserStore().removeUser(userId);
    },

    /**
     * Set a user as the currently being viewed user.
     *
     * @param { number } userId - The ID of the user to set as the currently being viewed user.
     */
    setViewing(userId: number) {
      useUserStore().setViewing(userId);
    },
  },
};
</script>
