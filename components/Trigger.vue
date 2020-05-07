<template>
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    <line
      x1="50"
      :y1="50 - orbitRadius - lineLength / 2"
      x2="50"
      :y2="50 - orbitRadius + lineLength / 2"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="square"
    />
  </svg>
</template>

<script>
export default {
  props: {
    orbitRadius: {
      type: Number,
      default: 40
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: '#ccc'
    }
  },
  data() {
    return {
      lineLength: 2
    }
  }
}
</script>
