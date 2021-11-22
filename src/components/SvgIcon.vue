<template>
  <svg aria-hidden="true" :class="classes">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  class: {
    type: String,
    default: "",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const classes = computed(() => {
  if (props.class) {
    return `d-icon ${props.class}`;
  }
  return `d-icon`;
});
</script>

<style>
.d-icon {
  width: 2em;
  height: 2em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
