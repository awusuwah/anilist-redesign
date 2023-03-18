<template>
  <div>
    <!-- The activator element -->
    <div ref="activator" @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <slot />
    </div>

    <!-- The tooltip element -->
    <div v-bind="$attrs" v-show="tooltipShown" ref="tooltip" :class="tooltipClasses">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { computePosition, flip, offset, shift } from "@floating-ui/dom";

export default {
  name: "Tooltip",
  props: {
    /**
     * The offset of the tooltip.
     */
    offset: {
      type: Number,
      default: 8,
    },

    /**
     * The placement where the tooltip should be shown relative to the activator.
     */
    placement: {
      type: String,
      default: "top",
      validator: (value: string) => ["top", "right", "bottom", "left"].includes(value),
    },
  },
  data() {
    return {
      tooltipShown: false,
    };
  },
  computed: {
    /**
     * The classes which are applied to the tooltip.
     */
    tooltipClasses() {
      return "tooltip absolute top-0 left-0 px-3 py-2 bg-gray-200 text-gray-900 text-sm rounded";
    },
  },
  methods: {
    /**
     * Show the tooltip.
     */
    showTooltip() {
      this.tooltipShown = true;

      const activatorRef = this.$refs.activator as any;
      const tooltipRef = this.$refs.tooltip as any;
      const arrowRef = this.$refs.arrow as any;

      document.body.appendChild(tooltipRef);

      // Compute the position for the tooltip
      computePosition(activatorRef, tooltipRef, {
        placement: this.placement as any,
        middleware: [offset(this.offset), shift({ padding: 20 }), flip()],
      }).then(({ x, y }) => {
        Object.assign(tooltipRef.style, {
          top: `${y}px`,
          left: `${x}px`,
        });
      });
    },

    /**
     * Hide the tooltip.
     */
    hideTooltip() {
      this.tooltipShown = false;
      document.body.removeChild(this.$refs.tooltip as any);
    },
  },
};
</script>
