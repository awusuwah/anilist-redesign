<template>
  <svg :class="classes">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script lang="ts">
export default {
  name: "Icon",
  props: {
    /**
     * The icon to display.
     */
    icon: {
      type: String,
      required: true,
    },

    /**
     * The size of the icon.
     */
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["sm", "md", "lg"].includes(value),
    },
  },
  computed: {
    /**
     * The classes which are applied to the svg element.
     */
    classes() {
      return {
        "bg-transparent": true,

        "w-4 h-4": this.size === "sm",
        "w-6 h-6": this.size === "md",
        "w-8 h-8": this.size === "lg",
      };
    },
  },
};
</script>
