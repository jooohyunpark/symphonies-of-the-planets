<template>
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    <line
      x1="50"
      :y1="50 - orbitRadius - lineLength / 2"
      x2="50"
      :y2="50 - orbitRadius + lineLength / 2"
      :stroke="color"
      :stroke-width="strokeWidth / 2"
      stroke-linecap="square"
    />
    <circle
      :r="orbitRadius"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="0.08"
      fill="none"
      cx="50"
      cy="50"
    />
  </svg>
</template>

<script setup>
// Props
defineProps({
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
})

// Reactive data
const lineLength = 2
</script>
