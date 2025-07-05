<template>
  <svg ref="svg" width="100%" height="100%" viewBox="0 0 100 100">
    <circle
      ref="orbit"
      :r="orbitRadius"
      :stroke="color"
      :stroke-width="strokeWidth"
      fill="none"
      cx="50"
      cy="50"
    />

    <!-- on-play background -->
    <circle
      class="background"
      :r="orbitRadius - strokeWidth / 2"
      stroke="none"
      fill="#222"
      cx="50"
      cy="50"
    />
  </svg>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
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
  },
  progress: {
    type: Number,
    default: 0.1
  }
})

// Reactive data
const svg = ref(null)
const orbit = ref(null)
const circumference = computed(() => props.orbitRadius * 2 * Math.PI)

// Computed properties
const offset = computed(() => {
  return (1 - props.progress) * circumference.value
})

// Methods
const init_transform_offset = () => {
  if (svg.value) {
    svg.value.setAttribute(
      'style',
      `transform: rotate(${-1 * props.progress * 360}deg);
      -webkit-transform: rotate(${-1 * props.progress * 360}deg);
      -moz-transform: rotate(${-1 * props.progress * 360}deg);
        `
    )
  }
}

// Lifecycle
onMounted(() => {
  init_transform_offset()

  if (orbit.value) {
    orbit.value.style.strokeDasharray = `${circumference.value} ${circumference.value}`
    orbit.value.style.strokeDashoffset = offset.value
  }
})
</script>

<style lang="scss" scoped>
circle {
  transition: stroke-dashoffset 0.3s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.background {
  display: none;
}

.play .background {
  display: block;
}
</style>
