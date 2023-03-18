<template>
  <div :class="wrapperClasses">
    <div class="w-14 flex items-center justify-center">
      <Icon icon="search" size="md" class="text-gray-700" />
    </div>

    <div class="flex-1">
      <input
        v-model="query"
        type="text"
        class="w-full h-14 bg-gray-800"
        :class="inputClasses"
        placeholder="Trigger commands or navigate to any page"
        @blur="focused = false"
        @focus="focused = true"
      />
    </div>

    <button :class="buttonClasses">Query</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "SearchInput",
  data() {
    return {
      query: "",
      focused: false,
    };
  },
  computed: {
    wrapperClasses() {
      return {
        "w-[900px] h-14 bg-gray-800 rounded-lg flex flex-row overflow-hidden": true,

        "ring-2 ring-offset-2 ring-offset-black/70 ring-blue-500": this.focused,
      };
    },

    inputClasses() {
      return {
        "text-white focus-within:outline-none": true,
      };
    },

    buttonClasses() {
      return {
        "px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all focus:outline-none": true,
      };
    },
  },
};
</script>
